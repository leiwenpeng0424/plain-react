import {ConfigAPI, PluginObj, Visitor, types as t, NodePath} from "@babel/core";

const visitor: Visitor = {};

const METHODS = {
    jsx: "jsx"
};

const plugin = (api: ConfigAPI): PluginObj => {
    api.assertVersion(7);
    visitor.JSXElement = (path): void => {
        buildJsxCallExpression(path);
    };

    return {
        name: "vvs-jsx",
        visitor
    };
};

const buildJsxCallExpression = (
    path: NodePath<t.JSXElement>
): t.CallExpression => {
    return t.callExpression();
};

const convertJsxElementIdentify = () => {};

export default plugin;
