import {types as t, PluginObj, Visitor, NodePath} from "@babel/core";
import {JSXElement, JSXOpeningElement, JSXIdentifier, JSXAttribute} from "@babel/types";
// import * as helper from '@babel/helper-builder-react-jsx';

const handleAttributes = (element: JSXOpeningElement) => {
    const {
        name, attributes
    } = element;

    const attrs: Record<string, any> = attributes.map((attr) => {
        const {
            // name, value
        } = attr;
    });
};

const declare = (): PluginObj => {
    const visitor: Visitor = {};
    visitor.JSXElement = (path: NodePath<t.JSXElement>): void => {
        const {node} = path;

        const {
            closingElement,
            openingElement,
            selfClosing
        } = node;

        if(selfClosing) {

        } else {
            if((closingElement && !openingElement) || (!closingElement && openingElement)) {
                throw new Error("JSX element is not closing");
            }
        }

        const {attributes, name} = openingElement;

        const attrs = attributes.reduce((assemble, attr) => {

            let attrName = "";
            let attrValue = "";

            if(t.isJSXAttribute(attr)) {
                if(t.isIdentifier(attr.name)) {
                    attrName = attr.name;
                } else {
                    attrName = attr.name.name as string;
                }
                if(t.isJSXExpressionContainer(attr.value)) {
                    if(t.isIdentifier(attr.value.expression)) {
                        attrValue = attr.value.expression.name;
                    }
                } else if (t.isStringLiteral(attr.value)) {
                    attrValue = attr.value.value;
                }
            }

            return Object.assign(assemble, {
                [attrName]: attrValue
            });

        }, {});

        console.log("-->", attrs);

        // const raw = `createElement(${name}, ${attrs})`;

    };
    return {
        name: "transfer-vvs-jsx",
        visitor
    };
};

export default declare;
