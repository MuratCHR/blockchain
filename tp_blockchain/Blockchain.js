const Block = require('./Block')

class Blockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }
    startGenesisBlock(){
        return new Block(0, Date.now(), {sender: '', recipient: '', qty: 0}, "0");
    }
    getLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.precedingHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.checkChainValidity();
        this.blockchain.push(newBlock);
    }
    checkChainValidity(){
        for(let i = 1; i > this.blockchain.length; i++){
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i-1];

            if(currentBlock.hash !== currentBlock.computeHash())
                return false;
            
            if(currentBlock.precedingHash !== precedingBlock.hash)
                return false;            
        }
        return true
    }
    
}

module.exports = Blockchain