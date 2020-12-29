class Bone {
    constructor(boneVal){
        [this.topNumber, this.bottomNumber] = boneVal
        this.boneVal = boneVal;
        this.isRotated = false;
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
        this.isRotated = true;
    }
}






export default Bone;
// module.exports = Bone;