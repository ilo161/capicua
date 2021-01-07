import React from "react";
import Konva from "konva";
import {constructBone} from "./allBones"
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

                return constructBone(reactKeyVal, true,
                0, 0, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                0, true)

                // return <Bone key={reactKeyVal}
                // draggable={true}
                // x={0}
                // width={boneWidth}
                // height={boneHeight}
                // src={allDominos[boneStrArr[0]]}
                // rotation={0}
                // inArena={true} />
            } else if (isReversed){
                // boneVal has been reversed. Rotate 90 Degrees
                // prop x is shifted 60 pixels to the right because rotation
                // auto-shifts it 60 pixels to the left??? (due to Konva)

                return constructBone(reactKeyVal, true,
                boneHeight, boneIsRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                90, true)

                // return <Bone key={reactKeyVal} 
                //     draggable={true}
                //     x={boneHeight}
                //     y={boneIsRevYPos}
                //     width={boneWidth}
                //     height={boneHeight}
                //     src={allDominos[boneStrArr[1]]} 
                //     rotation={90}
                //     inArena={true} /> 
            } else {
                //boneVal is NOT reversed. Rotate -90 Degrees

                return constructBone(reactKeyVal, true,
                0, boneNotRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                -90, true)

                //  return <Bone key={reactKeyVal}
                //     draggable={true}
                //     x={0}
                //     y={boneNotRevYPos}
                //     width={boneWidth}
                //     height={boneHeight}
                //     src={allDominos[boneStrArr[0]]}
                //     rotation={-90}
                //     inArena={true} />
            }
        }

        const xLengthAllBones = (boneDimenArr, currIdx, bentBoneIdx = 0, isBentAgain = false) => {
            let totalXPos = 0;

            if (!isBentAgain){
                for(let i = bentBoneIdx; i < currIdx; i++){
                    totalXPos += boneDimenArr[i].x;
                }
            } else {
                for(let i = bentBoneIdx; i < currIdx; i++){
                    totalXPos += boneDimenArr[i].isBentAgain.x;
                }
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
                    // isBentAgain: idx === 19 ? {x: 75} : idx > 19 ? {x: 30} : false,
                    //  isBentAgain: idx === 19 ? {x: 60} : idx > 19 ? {x: 60} : false,
                    // isBentAgain: idx === 19 ? {x: 60} : idx > 19 ? {x: 60} : false,
            const boneXnY = (
                bone.isDouble() ? {
                    isDouble: true,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx === 7 ? {y: 90} : idx > 7 ? {y: 30} : false,
                    isBentAgain: idx === 18 ? {x: 75} : idx > 18 ? {x: 30} : 0,
                    x: boneWidth,
                    y: 0} :
                (bone.isReversed ? {
                    isDouble: false,
                    isReversed: true,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx === 7 ? {y: 75} : idx > 7 ? {y: 60} : 0,
                    isBentAgain: idx >= 18 ? {x: 60} : 0,
                    x: boneHeight,
                    y: boneIsRevYPos } : 
                    {
                    isDouble: false,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal, 
                    isBent: idx === 7 ? {y: 75} : idx > 7 ? {y: 60} : 0,
                    isBentAgain: idx >= 18 ? {x: 60} : 0,
                    x: boneHeight, 
                    y: boneNotRevYPos
                    })
                );

            boneDimenArr.push(boneXnY);

            const lastBoneData = boneDimenArr[idx - 1];
            

            // These if statements and variables are to capture specific Distance Data for
            // the arena and are used for bending directions of the domino...
            // like a snake.
            let totalYPos = null;
            let topRowTotalPos = null;
            let bottomRowTotalPos = null;
            let totalXPos = null;
            let adjustedX = null;
            let adjustedY = null;
            let offsetX = (boneWidth / 2);
            let offsetY = (boneHeight / 2);
                
            //record running X length for top row to allow the next piece
            //to align correctly
            if (idx < 8){
                totalXPos = xLengthAllBones(boneDimenArr, idx);
            }

            // record Y length of all dominos on right side going down
            if (idx >= 8){
                if (idx <= 19){
                    totalYPos = yLengthAllBones(boneDimenArr, idx);
                } else {
                    totalYPos = yLengthAllBones(boneDimenArr, 19);
                }
            }

            // total X pos value for the top row of the arena
            // 8 because 8 idx is after it bends and sums up all xPos before 8 idx
            if (idx >= 8){
                topRowTotalPos = xLengthAllBones(boneDimenArr, 8);
            }

            // total X pos value for the bottom row of the arena
            if (idx >= 19){
                bottomRowTotalPos = xLengthAllBones(boneDimenArr, 
                    idx,
                    18,
                    true)
            }

            /*
            End of Distance Forumulas for Sides of Arena
            ********************************************
            ********************************************
            ********************************************
            */
        
            if (idx === 0){
                // debugger
                return isFirstBone(
                     boneDimenArr[0].isDouble,
                     boneDimenArr[0].isReversed,
                     boneDimenArr[0].boneStrArr,
                     boneDimenArr[0].reactKeyVal)
            } else if(idx < 8) {

                if (bone.isDouble()){
                    // const totalXPos = xLengthAllBones(boneDimenArr, idx);
                    console.log(`totalXPOS: ${totalXPos}`)

                    return constructBone(reactKeyVal, true,
                    totalXPos, 0, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                    0, true)
                    // debugger
                    // return <Bone key={reactKeyVal}
                    // draggable={true}
                    // x={totalXPos}
                    // y={0}
                    // width={boneWidth}
                    // height={boneHeight}
                    // src={allDominos[boneStrArr[0]]}
                    // rotation={0}
                    // inArena={true} />
                }
                else if(allDominosArr.includes(boneStrArr[0])){
                    // bone is NOT reversed
                    //rotate once -90 degrees

                    // debugger
                    return constructBone(reactKeyVal, true,
                    totalXPos, boneNotRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                    -90, true)

                    // return <Bone key={reactKeyVal} 
                    // draggable={true}
                    // x={totalXPos}
                    // y={boneNotRevYPos}
                    // width={boneWidth}
                    // height={boneHeight}
                    // src={allDominos[boneStrArr[0]]}
                    // rotation={-90}
                    // inArena={true} />
                } else {
                    //boneVal has been reversed. Rotate 90 Degrees

                    // totalXPos + 60 because of rotation without offset
                    totalXPos += boneHeight;
                    
                    //"top", "isReversed"
                    return constructBone(reactKeyVal, true,
                    totalXPos, boneIsRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                    90, true)
                    // debugger
                    // return <Bone key={reactKeyVal}
                    // draggable={true}
                    // x={totalXPos}
                    // y={boneIsRevYPos}
                    // width={boneWidth}
                    // height={boneHeight}
                    // src={allDominos[boneStrArr[1]]}
                    // rotation={90}
                    // inArena={true} />
                }
            } 
            
            // this is where the bones make a turn down
            else if (idx >= 8 && idx <= 18){
                // const topRowTotalPos = xLengthAllBones(boneDimenArr, 8);
                // const totalYPos = yLengthAllBones(boneDimenArr, idx);
                console.log(`totalYPos: ${totalYPos}`)
            
                switch(lastBoneData.isDouble){
                    case true:
                        if(allDominosArr.includes(boneStrArr[0])){
                            // bone is NOT reversed
                            //rotate once 0 degrees

                            // debugger
                            topRowTotalPos = topRowTotalPos - (boneWidth / 2);
                            
                            
                            //"right", "notReversed"
                            return constructBone(reactKeyVal, true,
                            topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            0, true , offsetX, offsetY)

                            // return <Bone key={reactKeyVal} 
                            // draggable={true}
                            // x={topRowTotalPos - boneWidth / 2}
                            // // not checked yet
                            // y={totalYPos}
                            // width={boneWidth}
                            // height={boneHeight}
                            // src={allDominos[boneStrArr[0]]}
                            // rotation={0}
                            // inArena={true} 
                            // offsetX={boneWidth / 2}
                            // offsetY={boneHeight / 2}
                            // />
                    } else {
                            //boneVal has been reversed. Rotate 180 Degrees
                            // const totalXPos = xLengthAllBones(boneDimenArr, idx) + 60;

                            topRowTotalPos = (topRowTotalPos - (boneWidth / 2));
                          
                            // "rightSide", "reversed"
                            return constructBone(reactKeyVal, true,
                            topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                            180, true , offsetX, offsetY)

                            // return <Bone key={reactKeyVal}
                            // draggable={true}
                            // x={topRowTotalPos - boneWidth / 2}
                            // // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                            // y={totalYPos}
                            // width={boneWidth}
                            // height={boneHeight}
                            // src={allDominos[boneStrArr[1]]}
                            // rotation={180}
                            // inArena={true} 
                            // offsetX={boneWidth / 2}
                            // offsetY={boneHeight / 2}
                            // />
                    }
                    case false:

                        if (bone.isDouble()){
                           
                            // debugger
                            topRowTotalPos = (topRowTotalPos - (boneWidth / 2));
                            totalYPos = (totalYPos - (boneWidth / 2));

                            // "rightSide", "isdouble"
                            return constructBone(reactKeyVal, true,
                            topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            90, true , offsetX, offsetY)


                            // return <Bone key={reactKeyVal}
                            // draggable={true}
                            // x={topRowTotalPos - boneWidth / 2}
                            // // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                            // // y={totalYPos}
                            // y={totalYPos - 15}
                            // width={boneWidth}
                            // height={boneHeight}
                            // src={allDominos[boneStrArr[0]]}
                            // rotation={90}
                            // inArena={true} 
                            // offsetX={boneWidth / 2}
                            // offsetY={boneHeight / 2}
                            // />
                        }
                        else if(allDominosArr.includes(boneStrArr[0])){
                        // bone is NOT reversed
                        //rotate once 0 degrees
                        // const totalXPos = xLengthAllBones(boneDimenArr, idx);
                        // debugger
                        
                        topRowTotalPos = (topRowTotalPos - (boneWidth / 2));
                        // offsetX = (boneWidth / 2);
                        // offsetY = (boneHeight / 2);
                        // totalYPos = (totalYPos - (boneWidth / 2));
                        // "rightSide", "notReversed"
                        return constructBone(reactKeyVal, true,
                        topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                        0, true , offsetX, offsetY)

                        // return <Bone key={reactKeyVal} 
                        // draggable={true}
                        // x={topRowTotalPos - boneWidth / 2}
                        // // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                        // y={totalYPos}
                        // width={boneWidth}
                        // height={boneHeight}
                        // src={allDominos[boneStrArr[0]]}
                        // rotation={0}
                        // inArena={true} 
                        // offsetX={boneWidth / 2}
                        // offsetY={boneHeight / 2}
                        // />
                    } else {
                        //boneVal has been reversed. Rotate 180 Degrees

                        
                        topRowTotalPos = (topRowTotalPos - (boneWidth / 2));
                        


                        // "rightSide", "isReversed"
                        return constructBone(reactKeyVal, true,
                        topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                        180, true , offsetX, offsetY)

                        
                        // debugger
                        // return <Bone key={reactKeyVal}
                        // draggable={true}
                        // x={topRowTotalPos - boneWidth / 2}
                        // // y={(shiftDown45 * (idx-6))}
                        // // y={shiftDown45}
                        // // y={(boneHeight + (boneWidth / 2)) * (idx - 7)}
                        // y={totalYPos}
                        // width={boneWidth}
                        // height={boneHeight}
                        // src={allDominos[boneStrArr[1]]}
                        // rotation={180}
                        // inArena={true}
                        // offsetX={boneWidth / 2}
                        // offsetY={boneHeight / 2}
                        //  />
                    }
                    default:
                        return
                }
            }
            // above ends idx up to 19
            else if(idx >= 19){

                console.log(`IDX is 19 or +`)
                console.log(`totalYPos: ${totalYPos}`)
                console.log(`totalBottRowPos: ${bottomRowTotalPos}`)

                switch(lastBoneData.isDouble){
                    case true:

                        if(allDominosArr.includes(boneStrArr[0])){
                            // bone is NOT reversed
                            //rotate once +90 degrees

                            adjustedX = topRowTotalPos - bottomRowTotalPos;

                            //                      minus 45 on right side
                            adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                            // "bottom", "notReversed"
                            return constructBone(reactKeyVal, true,
                            adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            90, true , offsetX, offsetY)

                            // debugger
                            // return <Bone key={reactKeyVal} 
                            // draggable={true}
                            // x={topRowTotalPos - bottomRowTotalPos}
                            // // not checked yet
                            // y={totalYPos - 45}
                            // width={boneWidth}
                            // height={boneHeight}
                            // src={allDominos[boneStrArr[0]]}
                            // rotation={90}
                            // inArena={true}
                            // offsetX={boneWidth / 2}
                            // offsetY={boneHeight / 2}
                            //  />
                    } else {
                            //boneVal has been reversed. Rotate NEG 90 Degrees
                            
                         
                            adjustedX = topRowTotalPos - bottomRowTotalPos;

                            //                      minus 45 on right side
                            adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                            // "bottom", "notReversed"
                            return constructBone(reactKeyVal, true,
                            adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                            -90, true , offsetX, offsetY)

                            // debugger
                            // return <Bone key={reactKeyVal}
                            // draggable={true}
                            // //og
                            // // x={topRowTotalPos - boneWidth / 2}
                            // //works
                            // // x={topRowTotalPos - boneHeight - 15}
                            // //new
                            // x={topRowTotalPos - bottomRowTotalPos}
                            // //NOt yet dynamic
                            // y={totalYPos - 45}
                            // width={boneWidth}
                            // height={boneHeight}
                            // src={allDominos[boneStrArr[1]]}
                            // rotation={-90}
                            // inArena={true} 
                            // offsetX={boneWidth / 2}
                            // offsetY={boneHeight / 2}
                            // />
                    }
                    case false:

                        if (bone.isDouble()){
                            debugger


                            adjustedX = topRowTotalPos - bottomRowTotalPos + (boneWidth / 2);

                            //                      minus 45 on right side
                            adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                            // "bottom", "isDouble"
                            return constructBone(reactKeyVal, true,
                            adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            0, true , offsetX, offsetY)

                            // return <Bone key={reactKeyVal}
                            // draggable={true}
                            // // x={topRowTotalPos - boneWidth / 2}
                            // //laymans
                            // // x={topRowTotalPos - boneWidth - 15}
                            // //old and off
                            // // x={topRowTotalPos - boneWidth - ( boneWidth / 2)}
                            // // x={topRowTotalPos - bottomRowTotalPos - 15}

                            // //CHECK!
                            // x={topRowTotalPos - bottomRowTotalPos + 15}
                            // // y={totalYPos - 15}
                            // y={totalYPos - 45}
                            // width={boneWidth}
                            // height={boneHeight}
                            // src={allDominos[boneStrArr[0]]}
                            // rotation={0}
                            // inArena={true} 
                            // offsetX={boneWidth / 2}
                            // offsetY={boneHeight / 2}
                            // />
                        }
                        else if(allDominosArr.includes(boneStrArr[0])){
                            debugger
                        // bone is NOT reversed
                        // rotate once  +90 degrees
                        
                        adjustedX = topRowTotalPos - bottomRowTotalPos;

                        //                      minus 45 on right side
                        adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                        // "bottom", "notReversed"
                        return constructBone(reactKeyVal, true,
                        adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                        90, true , offsetX, offsetY)


                        // return <Bone key={reactKeyVal} 
                        // draggable={true}
                        // //old no work
                        // // x={topRowTotalPos - boneWidth / 2}
                        // //new style - works
                        // x={topRowTotalPos - bottomRowTotalPos}
                        // // works
                        // y={totalYPos - 45}
                        // width={boneWidth}
                        // height={boneHeight}
                        // src={allDominos[boneStrArr[0]]}
                        // rotation={90}
                        // inArena={true}
                        // offsetX={boneWidth / 2}
                        // offsetY={boneHeight / 2}
                        //  />
                    } else {
                        //boneVal has been reversed. Rotate -90 Degrees

                        debugger
                        
                        adjustedX = topRowTotalPos - bottomRowTotalPos;

                        //                      minus 45 on right side
                        adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                        // "bottom", "isReversed"
                        return constructBone(reactKeyVal, true,
                        adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                        -90, true , offsetX, offsetY)

                        // return <Bone key={reactKeyVal}
                        // draggable={true}
                        // x={topRowTotalPos - bottomRowTotalPos}
                        // y={totalYPos - 45}
                        // width={boneWidth}
                        // height={boneHeight}
                        // src={allDominos[boneStrArr[1]]}
                        // rotation={-90}
                        // inArena={true}
                        // offsetX={boneWidth / 2}
                        // offsetY={boneHeight / 2}
                        //  />
                    }
                }
            }

        })


        return (
            <>
            {arena}
            </>
        )
    }
}

export default Arena;