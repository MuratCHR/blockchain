const Block = require("./Block");
const Blockchain = require("./Blockchain");
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const socketListener = require('./socketListener');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const client = require('socket.io-client');

const PORT = process.env.PORT || 3001;
app.use(express.json());

const blockchain = new Blockchain(io);

app.get('./blocks', (req,res) => {
    const {sender, receiver, qty} = req.body;
    io.emit('mine', sender, receiver, qty);
    res.redirect('./blocks');
})

app.post('./nodes', (req,res) => {
    const {host,port} = req.body;
    const {callback} = req.query;
    const node = `http://${host}:${port}`;
    const socketNode = socketListener(client(node), blockchain);
    blockchain.addNewNode(socketNode);

    if(callback === 'true'){
        console.info(`Node ${node} added via callback`);
        res.json({status: 'Added node', node: node, callback: true});
    }else{
        fetch(`${node}/nodes?callback=true`, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({host: req.hostname, port: PORT})
        });
        console.info(`Node ${node} added via callback`);
        res.json({status: 'Added node', node: node, calback: false});
    }
})

app.get('/nodes', (req, res) => {
    res.json({count: blockchain.nodes.length});
    console.log(blockchain.nodes);
})

io.on('connection', (socket) => {
    console.info(`Socket connected ${socket.id}`);
    socket.on('disconnect', () => {
        console.info(`Socket disconnected ${socket.id}`);
    })
})

blockchain.addNewNode(socketListener(client(`http://localhost:${POST}`), blockchain));

http.listen(PORT, () => {
    console.log('listening on port', PORT);
});

app.post('/transac', (req, res) => {
    const {sender, receiver, qty} = req.body;
    if(blockchain.transac.length +1 > 2){
        blockchain.addNewTransac({sender, receiver, qty, timestamp: Date.now()});
        io.emit('mine', blockchain.transac);
    }else{
        io.emit('transaction', {sender, receiver, qty, timestamp: Date.now()});
    }
    res.json({status: 'Transaction added'});
})

// let b3Chain = new Blockchain();
// b3Chain.addNewBlock(new Block(1, Date.now(), {sender: "Alice", recipient: "Bob", qty: 2}));
// b3Chain.addNewBlock(new Block(2, Date.now(), {sender: "Bob", recipient: "Alice", qty: 4}) );
// console.log(JSON.stringify(b3Chain , null, 4));