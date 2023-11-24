import { tokenize } from './src/lexer';


const path = './test.vpp'
const file = Bun.file(path);
const src = await file.text()

for (let token of tokenize(src)) {
    console.log(token);
}