import Parser from './src/frontend/parser.ts';
import { evaluate } from './src/runtime/interpreter.ts';

async function repl() {
    const parser = new Parser();

    while (true) {
        const input = prompt("> nói gì đi ní:");
        if (!input || input.includes("exit")) {
            process.exit();
        }
        const program = parser.produceAST(input);
        // console.log(JSON.stringify(program));
        // for (let [key, value] of Object.entries(program)) {
        //     console.log(key, value);
        // }
        const result = evaluate(program);
        console.log(result);
        console.log("------------\n\n");
    }

}

repl();