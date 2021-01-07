import Bone from "./bone"


// reactKey, draggable?, x, y, width, height, source, rotation, inArena?
export const constructBone = (reactKeyVal, draggable, x, y, width, height,
    source, rotation, inArena, offsetX = 0, offsetY = 0) => {
    return <Bone key={reactKeyVal} 
    dragabble={draggable}
    x={x}
    y={y}
    width={width}
    height={height}
    src={source}
    rotation={rotation}
    inArena={inArena}
    offsetX={offsetX}
    offsetY={offsetY}
    />
}

