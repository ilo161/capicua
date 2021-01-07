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


            //  isBent: idx > 7 ? bonexny() : bent(),
                    // isBentAgain: idx > 15 ? bonexny() : bent(),
                    
            const boneXnY = (
                bone.isDouble() ? {
                    isDouble: true,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx === 7 ? {y: 90} : idx > 7 ? {y: 30} : false,
                    isBentAgain: idx === 19 ? {x: 75} : idx > 19 ? {x: 30} : false,
                    x: boneWidth,
                    y: 0} :
                (bone.isReversed ? {
                    isDouble: false,
                    isReversed: true,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx === 7 ? {y: 75} : idx > 7 ? {y: 60} : false,
                    isBentAgain: idx === 19 ? {x: 60} : idx > 19 ? {x: 60} : false,
                    x: boneHeight,
                    y: boneIsRevYPos } : 
                    {
                    isDouble: false,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal, 
                    isBent: idx === 7 ? {y: 75} : idx > 7 ? {y: 60} : false,
                    isBentAgain: idx === 19 ? {x: 60} : idx > 19 ? {x: 60} : false,
                    x: boneHeight, 
                    y: boneNotRevYPos
                    })
                );

            boneDimenArr.push(boneXnY);

            const lastBoneData = boneDimenArr[idx - 1];
            

            // These if statements are to capture specific Distance Data for
            // the arena and are used for bending directions of the domino...
            // like a snake.
            let totalYPos = null;
            let topRowTotalPos = null;
            let bottomRowTotalPos = null;
                
            // record Y length of all dominos on right side going down
            if (idx >= 8){
                if (idx <= 20){
                    totalYPos = yLengthAllBones(boneDimenArr, idx);
                } else {
                    totalYPos = yLengthAllBones(boneDimenArr, 20);
                }
            }

            // if (idx >= 8 && idx <= 19){
            if (idx >= 8){
                topRowTotalPos = xLengthAllBones(boneDimenArr, 8);
            }

            if (idx >= 20){
                bottomRowTotalPos = xLengthAllBones(boneDimenArr, 
                    idx,
                    19,
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
            else if (idx >= 8 && idx <= 19){
                // const topRowTotalPos = xLengthAllBones(boneDimenArr, 8);
                // const totalYPos = yLengthAllBones(boneDimenArr, idx);
                console.log(`totalYPos: ${totalYPos}`)

                // grab last bone
                
                const shiftDown45 = 45;

                switch(lastBoneData.isDouble){
                    case true:
                        if(allDominosArr.includes(boneStrArr[0])){
                            // bone is NOT reversed
                            //rotate once -90 degrees
                            // const totalXPos = xLengthAllBones(boneDimenArr, idx);
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
                            // const totalXPos = xLengthAllBones(boneDimenArr, idx);
                            
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
                            // const totalXPos = xLengthAllBones(boneDimenArr, idx);
                            // console.log(`totalXPOS: ${totalXPos}`)

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
                        // const totalXPos = xLengthAllBones(boneDimenArr, idx);
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
                        // const totalXPos = xLengthAllBones(boneDimenArr, idx);
                        
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
            // above ends idx up to 19
            else if(idx >= 20){

                console.log(`IDX is 20 or +`)
                console.log(`totalYPos: ${totalYPos}`)
                console.log(`totalBottRowPos: ${bottomRowTotalPos}`)

                switch(lastBoneData.isDouble){
                    case true:

                        if(allDominosArr.includes(boneStrArr[0])){
                            // bone is NOT reversed
                            //rotate once +90 degrees

                            debugger
                            return <Bone key={reactKeyVal} 
                            draggable={true}
                            x={topRowTotalPos - bottomRowTotalPos}
                            // not checked yet
                            y={totalYPos - 45}
                            width={boneWidth}
                            height={boneHeight}
                            offsetX={boneWidth / 2}
                            offsetY={boneHeight / 2}
                            src={allDominos[boneStrArr[0]]}
                            rotation={90}
                            inArena={true} />
                    } else {
                            //boneVal has been reversed. Rotate NEG 90 Degrees
                            
                         
                            debugger
                            return <Bone key={reactKeyVal}
                            draggable={true}
                            //og
                            // x={topRowTotalPos - boneWidth / 2}
                            //works
                            // x={topRowTotalPos - boneHeight - 15}
                            //new
                            x={topRowTotalPos - bottomRowTotalPos}
                            //NOt yet dynamic
                            y={totalYPos - 45}
                            width={boneWidth}
                            height={boneHeight}
                            offsetX={boneWidth / 2}
                            offsetY={boneHeight / 2}
                            src={allDominos[boneStrArr[1]]}
                            rotation={-90}
                            inArena={true} />
                    }
                    case false:

                        if (bone.isDouble()){
                            debugger
                            // const totalXPos = xLengthAllBones(boneDimenArr, idx);
                            // console.log(`totalXPOS: ${totalXPos}`)


                            return <Bone key={reactKeyVal}
                            draggable={true}
                            // x={topRowTotalPos - boneWidth / 2}
                            //laymans
                            // x={topRowTotalPos - boneWidth - 15}
                            //old and off
                            // x={topRowTotalPos - boneWidth - ( boneWidth / 2)}
                            // x={topRowTotalPos - bottomRowTotalPos - 15}

                            //CHECK!
                            x={topRowTotalPos - bottomRowTotalPos + 15}
                            // y={totalYPos - 15}
                            y={totalYPos - 45}
                            width={boneWidth}
                            height={boneHeight}
                            offsetX={boneWidth / 2}
                            offsetY={boneHeight / 2}
                            src={allDominos[boneStrArr[0]]}
                            rotation={0}
                            inArena={true} />
                        }
                        else if(allDominosArr.includes(boneStrArr[0])){
                            debugger
                        // bone is NOT reversed
                        // rotate once  +90 degrees
                        
                        return <Bone key={reactKeyVal} 
                        draggable={true}
                        //old no work
                        // x={topRowTotalPos - boneWidth / 2}
                        //new style - works
                        x={topRowTotalPos - bottomRowTotalPos}
                        // works
                        y={totalYPos - 45}
                        width={boneWidth}
                        height={boneHeight}
                        offsetX={boneWidth / 2}
                        offsetY={boneHeight / 2}
                        src={allDominos[boneStrArr[0]]}
                        rotation={90}
                        inArena={true} />
                    } else {
                        //boneVal has been reversed. Rotate 90 Degrees
                        // const totalXPos = xLengthAllBones(boneDimenArr, idx);
                        debugger
                        

                        return <Bone key={reactKeyVal}
                        draggable={true}
                        // x={topRowTotalPos - boneWidth / 2}
                        x={topRowTotalPos - bottomRowTotalPos}
                       
                        y={totalYPos - 45}
                        width={boneWidth}
                        height={boneHeight}
                        offsetX={boneWidth / 2}
                        offsetY={boneHeight / 2}
                        src={allDominos[boneStrArr[1]]}
                        rotation={-90}
                        inArena={true} />
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