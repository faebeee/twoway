const unit = require("unit.js");

const TwoWay = require('../');
console.log(TwoWay);;

describe("Store", function() {
    describe("Create Store", function() {
        it("with nul values", function() {
             let store = new TwoWay('#app', {
                 name: null
             });

             unit.value(store.name).isNull()
        });
    });
});
