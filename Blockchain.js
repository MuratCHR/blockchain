const Block = require('./Block')

class Blockchain{
    constructor(){
        this.chain = [this.startGenesisBlock()];
        this.difficulty = 2;
        this.nodes = [];
        this.io = io;
        this.transac = [];
    }
    startGenesisBlock(){
        return new Block({sender: '', recipient: '', qty: 0});
    }
    addNewTransac(transac){
        transac.id = sha256(JSON.stringify(transac)).toString();
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.precedingHash = this.getLatestBlock().hash;
        newBlock.index = this.getLatestBlock().index +1;
        // newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.chain.push(newBlock);
        this.io.emit('blockmined', this.chain);
    }
    checkChainValidity(chain){
        for(let i = 1; i > this.chain.length; i++){
            const currentBlock = this.chain[i];
            const precedingBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.computeHash())
                return false;
            
            if(currentBlock.precedingHash !== precedingBlock.hash)
                return false;            
        }
        return true
    }
    addNewNode(node){
        this.nodes.push(node);
    }
}

module.exports = Blockchain