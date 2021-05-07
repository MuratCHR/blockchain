const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, precedingHash = ""){
     this.index = index;
     this.timestamp = timestamp;
     this.data = data;
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();
     this.nonce = 0;
    }
    computeHash(){
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }   
    proofOfWork(difficulty){
        return new Promise((resolve) => {
            setImmediate(async () => {
                let hash = this.computeHash();
                this.nonce;
                const dontMine = process.env.BREAK;
                if(dontMine == 'true'){
                    console.log('Mining stopped');
                    resolve(null);
                }else if(hash.substring(0, difficulty) == Array(difficulty + 1).join("0")){
                    resolve(hash);
                }else{
                    resolve(await this.proofOfWork());
                }
            })
        })

        // while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
        //     this.nonce++;
        //     this.hash = this.computeHash();
        // }
    }
}

module.exports = Block