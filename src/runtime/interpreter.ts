import { NumberVal, ValueType, RuntimeVal, NullVal } from './values.ts'
import { NodeType, NumericLiteral, Stmt } from '../frontend/ast.ts'

export function evaluate(astNode: Stmt): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value as number).toString(),
                type: "number",
            } as NumberVal;
        default:
            return { value: "null", type: "null" } as NullVal;
    }
}