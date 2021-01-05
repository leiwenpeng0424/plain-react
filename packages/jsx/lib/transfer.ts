/**
 *  @public jsx transform
 **/

import {types as t, transform} from '@babel/core';
// import * as helper from '@babel/helper-builder-react-jsx';

const declare = () => {
    const visitor = {};

    transform(
        'let A = <div className="sample">aaa</div>',
        {
        },
        (err, result) => {
            if(err) {
                throw err;
            } else {
                console.log(result?.ast);

            }
        }
    );
};

export default declare;
