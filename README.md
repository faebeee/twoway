# twoway
`twoway` is a very lightweight zerodependency two way databinding library. Specially designed for people wo don't want to have a framework like react, vue or angular.


# Setup
## CDN
To add `twoway` to your website you simply include the library via CDN

    https://cdn.jsdelivr.net/npm/twoway

and when the page is ready run 

    let store = twoway("#app", {
            number: null,
            color: null,
            size: null,
            name: "Fabs",
        }
    );

## NPM

Install it via NPM

    npm i twoway --save

and include and initialize it in you main file

    const twoway = require('twoway');
    let store = twoway("#app", {
            number: null,
            color: null,
            size: null,
            name: "Fabs",
        }
    );

# Playground
- [Simple Input](https://jsfiddle.net/faebeeee/qttdboyq/)

# Usage

## Create a new store
After loading the library in your project it is very simple to setup.
First we create a new `TwoWay` object. The constructor required a root
DOM node for your app and an initial state/store.

    let store = twoway("#app", {
        name: "Fabs",
    })

## Manipulate store
After creating the store you can easily manupulate the values by
calling `store.name = 'Foo';` and the DOM updates automatically

    let store = twoway("#app", {
        name: "Fabs",
    })

    store.name = "Foo Bar";

## Elements
### Select

    <div data-property="size"></div>
    <select data-model="size">
        <option value='xs'>XS</option>
        <option value='s'>S</option>
        <option value='m'>M</option>
        <option value='l'>L</option>
    </select>

### Radiobox
Comming soon

### Checkbox

    <div data-property="color"></div>
    <label>
        <input name="color" type="radio" value="red" data-model="color"> red
    </label>
    <label>
        <input name="color" type="radio" value="blue" data-model="color"> blue
    </label>


### Textarea
    
    <div>
        <h2>Textarea</h2>        
        <div data-property="message"></div>
        <textarea data-model="message">
        </textarea>
    </div>


### Input

    <div id=app>
        <div data-property="number"></div>
        <input data-model="number" type="number">
    </div>