class Bone {
    constructor(boneVal){
        [this.topNumber, this.bottomNumber] = boneVal
        this.boneVal = boneVal
    }

    isDouble() {
        return this.topNumber === this.bottomNumber;
    }

    boneReverse(){
        let topTemp = this.topNumber;
        let botTemp = this.bottomNumber;
        this.boneVal = this.boneVal.reverse();
        this.topNumber = botTemp;
        this.bottomNumber = topTemp;
    }
}







module.exports = Bone;