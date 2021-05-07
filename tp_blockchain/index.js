const Block = require("./Block");
const Blockchain = require("./Blockchain");

let b3Chain = new Blockchain();
b3Chain.addNewBlock(new Block(1, Date.now(), {sender: "Alice", recipient: "Bob", qty: 2}));
b3Chain.addNewBlock(new Block(2, Date.now(), {sender: "Bob", recipient: "Alice", qty: 4}) );
console.log(JSON.stringify(b3Chain , null, 4));