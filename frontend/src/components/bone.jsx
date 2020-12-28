import React from "react";
import {Image} from 'react-konva';

class Bone extends React.Component {
    constructor(props){
        super(props)

        this.state = {
             image: null,
             draggable: null,
             offSetCenter: null,
             updateGame: null,
             boneIdx: null,
             rotation: null
        };


    }
    
  componentDidMount() {
    this.loadImage();

  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
      draggable: this.props.draggable,
      offSetCenter: this.props.offSetCenter,
      updateGame: this.props.updateGame,
      boneIdx: this.props.boneIdx,
      rotation: this.props.rotation
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

  // 40 * i
  mouseDownStartCoord(e){

    console.log(`MDX: ${e.target.attrs.x}`)
    // console.log(`MDY: ${e.target.attrs.y}`)
    console.log("------")
  }

  // decides where the player wants to play
  mouseUpCoord(e, updateGame) {
        // if(e.target.attrs.y > 150 && e.target.attrs.x > 150){
        //     e.target.attrs.draggable = false;
        // }  
        // 
        const xPosPlay = e.target.attrs.x 
        const center = e.target.attrs.offSetCenter
        //orig below
        // const boneIdx = e.target.attrs.boneIdx
        const boneIdx = e.target.index
        
        console.log(`BoneIdxIs: ${e.target.attrs.boneIdx}`)

        console.log(`Center: ${e.target.attrs.offSetCenter}`)
        console.log(`X: ${e.target.attrs.x}`)
        console.log(`Y: ${e.target.attrs.y}`)
        //works below
        // this.state.updateGame(xPosPlay, center, boneIdx)
        
        updateGame(xPosPlay, center, boneIdx)
        // console.log(e.target)
    }


  render() {


    //old width=25 and height = 45
    
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        offSetCenter={this.state.offSetCenter}
        image={this.state.image}
        width={30}
        height={60}
        boneIdx={this.state.boneIdx}
        draggable={this.state.draggable}
        updateGame={this.state.updateGame}
        onMouseDown={this.mouseDownStartCoord}
        onDragEnd={(e) => this.mouseUpCoord(e, this.state.updateGame)}
        rotation={this.state.rotation}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}





//         return (
//             <div >
//                 <Stage className="board-game-container" width={500} height={500} >
//                     <Layer>
                        
//                         {arr}
//                         {/* <Image image={domino05} x={100} y={100} width={25} height={45}  /> */}
//                         {/* <Text>HELLO</Text> */}
//                         {/* <Rect x={140} y={450} width={200} height={50} fill="brown" draggable="false" /> */}
                            
//                     </Layer>
//                 </Stage>
//             </div>
//         );
//     }

// }
export default Bone;





