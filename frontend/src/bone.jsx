import React from "react";
import { Stage, Layer, Rect, Circle, Image } from 'react-konva';
// import useImage from 'use-image';
// import domino from './assests/img/dominos_pieces_vector_svg/dominos_bone_0_1.svg';
import domino from './assests/img/dominos_pieces_vector_svg/dominos_bone_0_1.svg';


// /frontend/src/assests/img/dominos_pieces_vector_svg/dominos bone 0:0.svg

class Testbone extends React.Component{
    state = {
        image: null
    };

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

    loadImage(){
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener("load", this.handleLoad);
    }

    handleLoad = () =>{
        this.setState({
            image: this.image
        });
    };

    test(e) {
        if(e.target.attrs.y > 150 && e.target.attrs.x > 150){
            e.target.attrs.draggable = false;
        }
        
        console.log(e.target.attrs.y)

        console.log(e.target.attrs.x)
        // console.log(e.target)
    }

    render() {
        return (
          <Image
            onDragEnd={this.test}
            // onClick={this.test}
            // onMouseDown={this.test}
            x={this.props.x}
            y={this.props.y}
            draggable={true}
            width={25}
            height={45}
            image={this.state.image}
            ref={node => {
              this.imageNode = node;
            }}
          />
        );
      }
}




class Bone extends React.Component {


    render() {


        return (
            <div >
                <Stage className="boardgamecontainer" width={500} height={500} >
                    <Layer>
                        
                        <Rect x={140} y={450} width={180} height={50} fill="brown" draggable="true" />
                        <Testbone className="domino-size" src={domino} draggable="true" x={150}  />
                        <Testbone className="domino-size" src={domino} draggable="true" x={190}  />
                        <Circle x={200} y={200} stroke="black" radius={50} draggable="true" />
                            
                    </Layer>
                </Stage>
            </div>
        );
    }

}
export default Bone;





