import {ConfigAPI, PluginObj, Visitor, types as t} from "@babel/core";

const visitor: Visitor = {};

const METHODS = {
    jsx: "jsx"
};

const plugin = (api: ConfigAPI): PluginObj => {
    api.assertVersion(7);
    visitor.JSXElement = (path): void => {

        const openingElement = path.get("openingElement");

        const args = [
            getJSXTagName(openingElement.node.name)
        ];

    };

    return {
        name: "vvs-jsx",
        visitor
    };
};

const getJSXTagName = <T extends (t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName)>(node: T): T => {
    if(t.isJSXMemberExpression(node)) {

    } else if(t.isJSXIdentifier(node)) {

    } else if(t.isJSXNamespacedName(node)) {

    }
    return node;
};

export default plugin;
