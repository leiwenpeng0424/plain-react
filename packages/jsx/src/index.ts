import {NodePath, PluginObj, Visitor} from "@babel/core";
import * as t from "@babel/types";

const visitor: Visitor = {};

visitor.JSXElement = (path: NodePath<t.JSXElement>): void => {
    // if (t.isJSXElement(path.node)) {
    //     console.log(path.node);
    // } else {
    //     throw new Error("Expect a JSXElement");
    // }

    var a = 1;
};

type A = {
    name: string
}

const plugin = (): PluginObj => {
    return {
        name: "vvs-jsx",
        visitor
    };
};

export default plugin;
