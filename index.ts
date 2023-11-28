import Parser from './src/parser.ts';

async function repl() {
    const parser = new Parser();

    while (true) {
        const input = prompt("> nói gì đi ní: ");
        if (!input || input.includes("exit")) {
            process.exit();
        }
        const program = parser.produceAST(input);
        // console.log(JSON.stringify(program));
        for (let [key, value] of Object.entries(program)) {
            console.log(key, value);
        }
    }

}

repl();