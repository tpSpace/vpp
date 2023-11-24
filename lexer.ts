// let x  = 45 
// let's make a lexer

export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    Let,
    BinaryOperator,
    EOF
}

const KEYWORDS: Record<string, TokenType> = {
    "bien" : TokenType.Let,
} 

export interface Token {
    value: string;
    type: TokenType;
}

function isAlpha(src: string): boolean {
    return src.toUpperCase() !== src.toLowerCase();
}

function isSkippable(str: string) {
    return str == ' ' || str == '\n' || '\t';
}

function isInt (src: string): boolean {
    return !isNaN(parseInt(src));
}

function token (value: string,type: TokenType): Token {
    return {value, type};
}

export function tokenize (source: string): Token[] {
    const tokens = new Array<Token>();
    const src = source.split('');
    
    // Build each token until eof
    while (src.length > 0) {
        if (src[0] === '(') {
            tokens.push(token(src.shift()!, TokenType.OpenParen));
        } else if (src[0] === ')') {
            tokens.push(token(src.shift()!, TokenType.CloseParen));
        } else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/') {
            tokens.push(token(src.shift()!, TokenType.BinaryOperator));
        } else if (src[0] === '=') {
            tokens.push(token(src.shift()!, TokenType.Equals));
        } else {
            // Handle multi character tokens
            if (isInt(src[0])) {
                let num = '';
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            } else if (isAlpha(src[0])) {
                let ident = '';
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                }
                // Check for resersed keywords
                const reserved = KEYWORDS[ident];
                if (reserved === undefined ) {
                    tokens.push(token(ident, TokenType.Identifier));
                } else {
                    tokens.push(token(ident, reserved)); // TokenType.Let 
                }
            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                console.log("Hong tìm thấy từ này ní ơi: ", src[0]);
                // Deno.exit(1);
            }
        }
    }

    return tokens;
}