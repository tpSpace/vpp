import { NumberVal, ValueType, RuntimeVal, NullVal } from './values.ts'
import { BinaryExpr, NodeType, NumericLiteral, Program, Stmt } from '../frontend/ast.ts'

function evaluate_program(program: Program): RuntimeVal {
    let lastEvaluated: RuntimeVal = { type: "null", value: "null" } as NullVal;

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
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

function evaluate_binary_expr(binop: BinaryExpr): RuntimeVal {

    const leftHandSide = evaluate(binop.left);
    const rightHandSide = evaluate(binop.right);

    if (leftHandSide.type !== rightHandSide.type) {
        console.error("Type mismatch");
        process.exit();
    }
    if (leftHandSide.type === "number" && rightHandSide.type === "number") {
        return evaluate_numeric_binary_expr(leftHandSide as NumberVal, rightHandSide as NumberVal, binop.operator);
    }

    return { type: "null", value: "null" } as NullVal;
}   

export function evaluate(astNode: Stmt): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value as number).toString(),
                type: "number",
            } as NumberVal;
            
        case "NullLiteral":
            return { value: "null", type: "null" } as NullVal;

        case "BinaryExpr":
            return evaluate_binary_expr(astNode as BinaryExpr);

        case "Program":
            return evaluate_program(astNode as Program);

        default:
            console.error("Unknown AST node kind: ", astNode);
            process.exit();
    }
}