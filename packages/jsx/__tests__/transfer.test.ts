//@ts-ignore
import declare from "../src"
import { transform } from "@babel/core";

test("testing", () => {
    transform(
        `
            const text = "123";
            let A = <div id={text} name="123456789">
                        <h1 className="aaa">1</h1>
                        <h2>2</h2>
                    </div>
        `,
        {
            plugins: [declare(), "@babel/plugin-syntax-jsx"]
        },
        (err, result) => {
            if(err){
                throw err;
            } else {
                console.log("解析结束");
            }
        }
    )
});
