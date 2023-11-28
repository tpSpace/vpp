// let x  = 45 
// let's make a lexer
// lexer is a program that take a string of code as an input and tokenize the string.

export enum TokenType {
    Null,
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Let,
    SEMICOLON,
    EOF
}

const KEYWORDS: Record<string, TokenType> = {
    "bien" : TokenType.Let,
    "rong" : TokenType.Null
} 

export interface Token {
    value: string;
    type: TokenType;
}

// check whether the given string belongs to alphabet.
function isAlpha(src: string): boolean {
    return src.toUpperCase() !== src.toLowerCase();
}

// skip space or newline or tabs
function isSkippable(str: string) {
    return str == " " || str == "\n" || str == "\t"; 
}

// check if the given string is a number or not
function isInt (str: string): boolean {
    const c = str.charCodeAt(0);
	const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
	return c >= bounds[0] && c <= bounds[1];
}

function token (value: string,type: TokenType): Token {
    return {value, type};
}
// tokenize the string of code
export function tokenize (source: string): Token[] {
    const tokens = new Array<Token>();
    const src = source.split('');
    
    // Build each token until eof
    while (src.length > 0) {
        if (src[0] === '(') {
            tokens.push(token(src.shift()!, TokenType.OpenParen));
        } else if (src[0] === ')') {
            tokens.push(token(src.shift()!, TokenType.CloseParen));
        } else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/' || src[0] === '%') {
            tokens.push(token(src.shift()!, TokenType.BinaryOperator));
        } else if (src[0] === '=') {
            tokens.push(token(src.shift()!, TokenType.Equals));
        } else if (src[0] === ';') {
            tokens.push(token(src.shift()!, TokenType.SEMICOLON));
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
                if (typeof reserved === "number" ) {
                    tokens.push(token(ident, TokenType.Identifier));
                } else {
                    tokens.push(token(ident, reserved)); // TokenType.Let 
                }
            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                console.log("Hong tìm thấy từ này ní ơi: ", src[0]);
                process.exit();
            }
        } 
    }// :( where have you been? 
    tokens.push({type: TokenType.EOF, value: "EndOfFile"})
    return tokens;
}