import { NumberVal, ValueType, RuntimeVal, NullVal } from './values.ts'
import { BinaryExpr, Identifier, NodeType, NumericLiteral, Program, Stmt } from '../frontend/ast.ts'
import Environment from './environtment.ts';
// what happened on Dec 3rd 
function evaluate_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal = { type: "null", value: "null" } as NullVal;

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }

    return lastEvaluated;
}

function evaluate_numeric_binary_expr(leftHandSide: NumberVal, rightHandSide: NumberVal, operator: string): NumberVal {
    let result: number = 0;
    switch (operator) {
        case "+":
            result = Number(leftHandSide.value) + Number(rightHandSide.value);
            break;
        case "-":
            result = Number(leftHandSide.value) - Number(rightHandSide.value);
            break;
        case "*":
            result = Number(leftHandSide.value) * Number(rightHandSide.value);
            break;
        case "/":
            // TODO: handle divide by zero
            result = Number(leftHandSide.value) / Number(rightHandSide.value);
            break;
        default:
            console.error("Unknown operator: ", operator);
            process.exit();
    }

    return {
        type: "number",
        value: result.toString(),
    } as NumberVal;
}

function evaluate_binary_expr(binop: BinaryExpr, env: Environment): RuntimeVal {

    const leftHandSide = evaluate(binop.left, env);
    const rightHandSide = evaluate(binop.right, env);

    if (leftHandSide.type !== rightHandSide.type) {
        console.error("Type mismatch");
        process.exit();
    }
    if (leftHandSide.type === "number" && rightHandSide.type === "number") {
        return evaluate_numeric_binary_expr(leftHandSide as NumberVal, rightHandSide as NumberVal, binop.operator);
    }

    return { type: "null", value: "null" } as NullVal;
}   

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value as number).toString(),
                type: "number",
            } as NumberVal;
            
        case "NullLiteral":
            return { value: "null", type: "null" } as NullVal;

        case "BinaryExpr":
            return evaluate_binary_expr(astNode as BinaryExpr, env);

        case "Program":
            return evaluate_program(astNode as Program, env);
            
        case "Identifier":
            return evaluate_identifier(astNode as Identifier, env);

        default:
            console.error("Unknown AST node kind: ", astNode);
            process.exit();
    }
}

function evaluate_identifier(ident: Identifier, env: Environment): RuntimeVal {
    const value = env.lookupVar(ident.symbol);
    return value;
}
