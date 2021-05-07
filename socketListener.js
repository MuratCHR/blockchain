const Block = require('./Block');

const socketListener = (socket, blockchain) => {

    socket.on('mine', (sender, receiver, qty) => {
        let block = new Block({sender, receiver, qty});
        blockchain.addNewBlock(block);
        console.info(`Block number ${block.index} just mined`);
    })

    socket.on('blockmind', (newChain) => {
        console.log(newChain);
        blockchain.chain = newChain;
        console.info(`Blockchain synchronized`);
    })

    return socket;
}

module.exports = socketListener