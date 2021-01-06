import React from "react";
import Konva from "konva";
import Bone from "./bone";









class Arena extends React.Component {

    render(){
        const {board, boneValToString, allDominos, boardDimen,
        boneWidth, boneHeight, boneIsRevYPos, boneNotRevYPos } = this.props;


        // we need the keys of all possible dominos to be rendered
        // allDominosArr is then keyed into with boneValToString to retrieve
        // The appropriate Domino Image
        const allDominosArr = Object.keys(allDominos);

        //this function returns a bone with the x position always at zero
        //unless the bone is Reversed. then X is +60 because Konva
        //offsets +90 degree rotation in the negative x-axis.
        const isFirstBone = (isDouble, isReversed, boneStrArr, reactKeyVal) => {
            if (isDouble){
                return <Bone key={reactKeyVal}
                draggable={true}
                x={0}
                width={boneWidth}
                height={boneHeight}
                src={allDominos[boneStrArr[0]]}
                rotation={0}
                inArena={true} />
            } else if (isReversed){
                //boneVal has been reversed. Rotate 90 Degrees
                // prop x is shifted 60 pixels to the right because rotation
                // auto-shifts it 60 pixels to the left??? (due to Konva)
                return <Bone key={reactKeyVal} 
                    draggable={true}
                    x={boneHeight}
                    y={boneIsRevYPos}
                    width={boneWidth}
                    height={boneHeight}
                    src={allDominos[boneStrArr[1]]} 
                    rotation={90}
                    inArena={true} /> 
            } else {
                //boneVal is NOT reversed. Rotate -90 Degrees
                 return <Bone key={reactKeyVal}
                    draggable={true}
                    x={0}
                    y={boneNotRevYPos}
                    width={boneWidth}
                    height={boneHeight}
                    src={allDominos[boneStrArr[0]]}
                    rotation={-90}
                    inArena={true} />
            }
        }

        const xLengthAllBones = (boneDimenArr, currIdx) => {
            let totalXPos = 0;

            for(let i = 0; i < currIdx; i++){
                totalXPos += boneDimenArr[i].x;
            }

            return totalXPos;
        }

        const yLengthAllBones = (boneDimenArr, currIdx) => {
            let totalYPos = 0;

            for(let i = 7; i < currIdx; i++){
                totalYPos += boneDimenArr[i].isBent.y;
            }

            return totalYPos;
        }

        const boneDimenArr = [];

        const arena = board.arena.map((bone, idx) => {
            const boneStrArr = boneValToString(bone.boneVal);

            const singleBoneVal =  boneStrArr[0];
            const reactKeyVal = parseInt(singleBoneVal);


            //  isBent: idx > 7 ? bonexny() : bent(),
                    // isBentAgain: idx > 15 ? bonexny() : bent(),
                    
            const boneXnY = (
                bone.isDouble() ? {
                    isDouble: true,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx == 7 ? {y: 90} : idx > 7 ? {y: 30} : false,
                    x: boneWidth,
                    y: 0} :
                (bone.isReversed ? {
                    isDouble: false,
                    isReversed: true,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx == 7 ? {y: 75} : idx > 7 ? {y: 60} : false,
                    x: boneHeight,
                    y: boneIsRevYPos } : 
                    {
                    isDouble: false,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal, 
                    isBent: idx == 7 ? {y: 75} : idx > 7 ? {y: 60} : false,
                    x: boneHeight, 
                    y: boneNotRevYPos
                    })
                );

            boneDimenArr.push(boneXnY);

        
            if (idx === 0){
                // debugger
                return isFirstBone(
                     boneDimenArr[0].isDouble,
                     boneDimenArr[0].isReversed,
                     boneDimenArr[0].boneStrArr,
                     boneDimenArr[0].reactKeyVal)
            } else if(idx < 8) {

                if (bone.isDouble()){
                    const totalXPos = xLengthAllBones(boneDimenArr, idx);
                    console.log(`totalXPOS: ${totalXPos}`)

                    // debugger
                    return <Bone key={reactKeyVal}
                    draggable={true}
                    x={totalXPos}
                    width={boneWidth}
                    height={boneHeight}
                    src={allDominos[boneStrArr[0]]}
                    rotation={0}
                    inArena={true} />
                }
                else if(allDominosArr.includes(boneStrArr[0])){
                    // bone is NOT reversed
                    //rotate once -90 degrees
                    const totalXPos = xLengthAllBones(boneDimenArr, idx);
                    // debugger
                    return <Bone key={reactKeyVal} 
                    draggable={true}
                    x={totalXPos}
                    y={boneNotRevYPos}
                    width={boneWidth}
                    height={boneHeight}
                    src={allDominos[boneStrArr[0]]}
                    rotation={-90}
                    inArena={true} />
                } else {
                    //boneVal has been reversed. Rotate 90 Degrees
                    const totalXPos = xLengthAllBones(boneDimenArr, idx) + 60;
                    
                    // debugger
                    return <Bone key={reactKeyVal}
                    draggable={true}
                    x={totalXPos}
                    y={boneIsRevYPos}
                    width={boneWidth}
                    height={boneHeight}
                    src={allDominos[boneStrArr[1]]}
                    rotation={90}
                    inArena={true} />
                }
            } 
            // this is where the bones make a turn down
            else if (idx >= 8 && idx < 20){
                const topRowTotalPos = xLengthAllBones(boneDimenArr, 8);
                const totalYPos = yLengthAllBones(boneDimenArr, idx);
                console.log(`totalYPos: ${totalYPos}`)
                debugger
                // grab last bone
                const lastBoneData = boneDimenArr[idx - 1];
                const shiftDown45 = 45;

                switch(lastBoneData.isDouble){
                    case true:
                        if(allDominosArr.includes(boneStrArr[0])){
                            // bone is NOT reversed
                            //rotate once -90 degrees
                            const totalXPos = xLengthAllBones(boneDimenArr, idx);
                            // debugger
                            return <Bone key={reactKeyVal} 
                            draggable={true}
                            x={topRowTotalPos - boneWidth / 2}
                            // not checked yet
                            y={totalYPos}
                            width={boneWidth}
                            height={boneHeight}
                            offsetX={boneWidth / 2}
                            offsetY={boneHeight / 2}
                            src={allDominos[boneStrArr[0]]}
                            rotation={0}
                            inArena={true} />
                    } else {
                            //boneVal has been reversed. Rotate 90 Degrees
                            // const totalXPos = xLengthAllBones(boneDimenArr, idx) + 60;
                            const totalXPos = xLengthAllBones(boneDimenArr, idx);
                            
                            // debugger
                            return <Bone key={reactKeyVal}
                            draggable={true}
                            x={topRowTotalPos - boneWidth / 2}
                            // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                            y={totalYPos}
                            width={boneWidth}
                            height={boneHeight}
                            offsetX={boneWidth / 2}
                            offsetY={boneHeight / 2}
                            src={allDominos[boneStrArr[1]]}
                            rotation={180}
                            inArena={true} />
                    }
                    case false:

                        if (bone.isDouble()){
                            const totalXPos = xLengthAllBones(boneDimenArr, idx);
                            console.log(`totalXPOS: ${totalXPos}`)

                            // debugger
                            return <Bone key={reactKeyVal}
                            draggable={true}
                            x={topRowTotalPos - boneWidth / 2}
                            // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                            // y={totalYPos}
                            y={totalYPos - 15}
                            width={boneWidth}
                            height={boneHeight}
                            offsetX={boneWidth / 2}
                            offsetY={boneHeight / 2}
                            src={allDominos[boneStrArr[0]]}
                            rotation={90}
                            inArena={true} />
                        }
                        else if(allDominosArr.includes(boneStrArr[0])){
                        // bone is NOT reversed
                        //rotate once -90 degrees
                        const totalXPos = xLengthAllBones(boneDimenArr, idx);
                        // debugger
                        return <Bone key={reactKeyVal} 
                        draggable={true}
                        x={topRowTotalPos - boneWidth / 2}
                        // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                        y={totalYPos}
                        width={boneWidth}
                        height={boneHeight}
                        offsetX={boneWidth / 2}
                        offsetY={boneHeight / 2}
                        src={allDominos[boneStrArr[0]]}
                        rotation={0}
                        inArena={true} />
                    } else {
                        //boneVal has been reversed. Rotate 90 Degrees
                        const totalXPos = xLengthAllBones(boneDimenArr, idx);
                        
                        // debugger
                        return <Bone key={reactKeyVal}
                        draggable={true}
                        x={topRowTotalPos - boneWidth / 2}
                        // y={(shiftDown45 * (idx-6))}
                        // y={shiftDown45}
                        // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                        y={totalYPos}
                        width={boneWidth}
                        height={boneHeight}
                        offsetX={boneWidth / 2}
                        offsetY={boneHeight / 2}
                        src={allDominos[boneStrArr[1]]}
                        rotation={180}
                        inArena={true} />
                    }
                    default:
                        return
                }

                
                
            }
            // above ends idx up to 20

        })


        return (
            <>
            {arena}
            </>
        )
    }
}

export default Arena;