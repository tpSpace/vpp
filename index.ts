import Parser from './src/frontend/parser.ts';
import Environment from './src/runtime/environtment.ts';
import { evaluate } from './src/runtime/interpreter.ts';
import { NumberVal } from './src/runtime/values.ts';

async function repl() {
    const parser = new Parser();
    const env = new Environment();
    env.declareVar("x", { value: 312, type: "number" } as unknown as NumberVal);

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
        const result = evaluate(program, env);
        console.log(result);
    }

}

repl();