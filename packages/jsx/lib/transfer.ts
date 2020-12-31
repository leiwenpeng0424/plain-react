import traverse from '@babel/traverse';
import * as parser from '@babel/parser';
import * as babel from '@babel/core';

export default function () {
    babel.transform(`<div><h1></h1></div>`, {
        ast: true,
        plugins: ["@babel/plugin-syntax-jsx"]
    },(err, result) => {
        if (err) {
            console.error(err.message);
            return;
        }

        traverse(result?.ast, {
            JSXElement() {}
        });
    });
}
