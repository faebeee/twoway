# twoway

# Setup
## Install
To add `twoway` to your website you simply include the library via CDN

    https://cdn.jsdelivr.net/npm/twoway@0.0.1

or you can install it via NPM

    npm i twoway --save

and include and initialize it in you main file

    const TwoWay = require('twoway');
    new TwoWay('#myApp');

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