const TwoWay = require('../');

const app = new TwoWay("#app", {
    number2: 0
});

 setInterval(function() {
     app.setValue('number2', Math.random());
 }, 1000);