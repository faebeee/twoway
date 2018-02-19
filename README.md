# twoway
`twoway` is a very lightweight zerodependency two way databinding library. Specially designed for people wo don't want to have a framework like react, vue or angular.


# Setup
## CDN
To add `twoway` to your website you simply include the library via CDN

    https://cdn.jsdelivr.net/npm/twoway

and when the page is ready run 

    let store = new TwoWay("#app", {
            number: null,
            color: null,
            size: null,
            name: "Fabs",
        }
    ).init();

## NPM

Install it via NPM

    npm i twoway --save

and include and initialize it in you main file

    const TwoWay = require('twoway');
    let store = new TwoWay("#app", {
            number: null,
            color: null,
            size: null,
            name: "Fabs",
        }
    ).init();

# Usage
## Select

    <div data-property="size"></div>
    <select data-model="size">
        <option value='xs'>XS</option>
        <option value='s'>S</option>
        <option value='m'>M</option>
        <option value='l'>L</option>
    </select>

## Checkbox

    <div data-property="color"></div>
    <label>
        <input name="color" type="radio" value="red" data-model="color"> red
    </label>
    <label>
        <input name="color" type="radio" value="blue" data-model="color"> blue
    </label>


## Radiobox

## Input

    <div id=app>
        <div data-property="number"></div>
        <input data-model="number" type="number">
    </div>