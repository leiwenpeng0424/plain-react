import { createElement } from "../src/Elements";

describe('Testing Create Element', () => {

    const tree = createElement(
        'div', {}, [
            createElement('div')
        ]
    );

    test('Create Element', () => {
        expect(tree.type).toEqual("div");
        expect((tree.children?.[0])?.type).toEqual("div");
    });
});
