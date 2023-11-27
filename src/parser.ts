import { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier } from './ast.ts';
import { tokenize, Token, TokenType } from './lexer.ts';

export default class Parser {
    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0].type != TokenType.EOF ;
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
        return this.parse_primary_expr();
    }

    private parse_primary_expr(): Expr {
        const tk = this.at();

        switch (tk.type) {
            case TokenType.Identifier :
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.Number:
                return { kind: "NumericLiteral", value : parseFloat(this.eat().value) } as NumericLiteral;
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
