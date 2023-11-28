import { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier } from './ast.ts';
import { tokenize, Token, TokenType } from './lexer.ts';

export default class Parser {
    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0].type != TokenType.EOF ;
    }

    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type !== type) {
            console.error(err);
        }
    }

    private eat() {
        const prev = this.tokens.shift() as Token; 
        return prev;
    }

    private at(): Token {
        return this.tokens[0];
    }

    private parse_stmt(): Stmt{
        return this.parse_expr();
    }

    private parse_expr(): Expr {
        return this.parse_additive_expr();
    }

    private parse_additive_expr(): Expr {
        let left = this.parse_multiplicative_expr();

        while (this.at().value === "+" || this.at().value === "-") {
            const operator = this.eat().value;
            const right = this.parse_multiplicative_expr();
            left = {
                kind: "BinaryExpr",
                left, 
                right,
                operator,
            } as BinaryExpr;
            // console.log(left, "\n===================");
        }
        return left;
    }

    private parse_multiplicative_expr(): Expr {
        let left = this.parse_primary_expr();

        while (this.at().value === "*" || this.at().value === "/" || this.at().value === "%") {
            const operator = this.eat().value;
            const right = this.parse_primary_expr();
            left = {
                kind: "BinaryExpr",
                left, 
                right,
                operator,
            } as BinaryExpr;
            // console.log(left, "\n===================");
        }
        return left;
    }

    private parse_primary_expr(): Expr {
        const tk = this.at();

        switch (tk.type) {
            case TokenType.Identifier :
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.Number:
                return { kind: "NumericLiteral", value : parseFloat(this.eat().value) } as NumericLiteral;
            case TokenType.OpenParen: {
                this.eat();
                const value = this.parse_expr();
                this.expect(TokenType.CloseParen, "Hong tìm thấy ngoặc đóng");
                return value;
            }
            default: 
                console.error("Từ gì lạ zậy, compiler hong hiểu", this.at().value);
                process.exit();
        }

    }

    public produceAST (sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        
        const program: Program = {
            kind: "Program",
            body: []
        }
        // Parse until the eof :<
        while (this.not_eof()) {
            program.body.push(this.parse_stmt())
        }

        return program;
    }
}
