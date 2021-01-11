import {ConfigAPI, PluginObj, NodePath, types as t, PluginPass} from "@babel/core";

function plugin(api: ConfigAPI): PluginObj {

    return {
        name: "transfer-arrow",
        visitor: {
            VariableDeclaration: {
                exit: (path :NodePath<t.VariableDeclaration>, file: PluginPass) => {
                    const parent = path.parent as t.Program;

                    const declarations = path.get("declarations");
                    for (let i = 0; i < declarations.length; i++) {
                        const declarator = declarations[i];
                        const identify = declarator.get("id");
                        const init = declarator.get("init");
                        if(t.isArrowFunctionExpression(init.node)) {
                            const callExpr = t.functionDeclaration(
                                identify.node as t.Identifier,
                                [],
                                init.node.body as t.BlockStatement
                            );
                            parent.body.splice(0);
                            parent.body.push(callExpr);
                        }
                    }
                }
            }
        }
    };
}

export default plugin;
