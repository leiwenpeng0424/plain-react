import declare from "../src";
import plugin from "../src/transfer-arrow-function";
import {transform} from "@babel/core";

// const text = "123";
// let A = <div id={text} name="123456789">
//             <h1 className="aaa">1</h1>
//             <h2>2</h2>
//         </div>

test("testing", () => {
    const ast = transform(
        `
            const a = () => {
                console.log('123');
            }
        `,
        {
            plugins: [declare, plugin, "@babel/plugin-syntax-jsx"]
        }
    );
    console.log(ast?.code);
});
