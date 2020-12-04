class Bone {
    constructor(boneVal){
        [this.topNumber, this.bottomNumber] = boneVal
        this.boneVal = boneVal
    }

    isDouble() {
        return this.topNumber == this.bottomNumber;
    }

    boneReverse(){
        let topTemp = this.topNumber;
        let botTemp = this.bottomNumber;
        this.boneVal = this.boneVal.reverse();
        this.topNumber = botTemp;
        this.bottomNumber = topTemp;
    }
}

let bone = new Bone([3,4])
console.log(bone)
console.log(bone.isDouble())
bone.boneReverse()
console.log(bone)



module.exports = Bone;
// if(typeof module != typeof undefined) {
    // module.exports = Bone;
// }

// export default Bone;