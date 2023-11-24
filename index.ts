import { tokenize } from './lexer';

const src = "bien a = 10"
for (let token of tokenize(src)) {
    console.log(token);
}