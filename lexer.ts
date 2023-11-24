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
}

export interface Token {
    value: string;
    type: TokenType;
}

function isAlpha(src: string): boolean {
    return src.toUpperCase() !== src.toLowerCase();
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
                
            }
        }
    }

    return tokens;
}