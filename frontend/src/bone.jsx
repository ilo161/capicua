import React from "react";
import { Stage, Layer, Rect, Circle, Image } from 'react-konva';
// import useImage from 'use-image';
// import domino from './assests/img/dominos_pieces_vector_svg/dominos_bone_0_1.svg';
// import domino from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:1.svg';


import domino00 from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:0.svg';
import domino01 from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:1.svg';
import domino02 from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:2.svg';
import domino03 from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:3.svg';
import domino04 from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:4.svg';
import domino05 from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:5.svg';
import domino06 from './assests/img/dominos_pieces_vector_svg/dominos_bone_0:6.svg';
import domino11 from './assests/img/dominos_pieces_vector_svg/dominos_bone_1:1.svg';
import domino12 from './assests/img/dominos_pieces_vector_svg/dominos_bone_1:2.svg';
import domino13 from './assests/img/dominos_pieces_vector_svg/dominos_bone_1:3.svg';
import domino14 from './assests/img/dominos_pieces_vector_svg/dominos_bone_1:4.svg';
import domino15 from './assests/img/dominos_pieces_vector_svg/dominos_bone_1:5.svg';
import domino16 from './assests/img/dominos_pieces_vector_svg/dominos_bone_1:6.svg';
import domino22 from './assests/img/dominos_pieces_vector_svg/dominos_bone_2:2.svg';
import domino23 from './assests/img/dominos_pieces_vector_svg/dominos_bone_2:3.svg';
import domino24 from './assests/img/dominos_pieces_vector_svg/dominos_bone_2:4.svg';
import domino25 from './assests/img/dominos_pieces_vector_svg/dominos_bone_2:5.svg';
import domino26 from './assests/img/dominos_pieces_vector_svg/dominos_bone_2:6.svg';
import domino33 from './assests/img/dominos_pieces_vector_svg/dominos_bone_3:3.svg';
import domino34 from './assests/img/dominos_pieces_vector_svg/dominos_bone_3:4.svg';
import domino35 from './assests/img/dominos_pieces_vector_svg/dominos_bone_3:5.svg';
import domino36 from './assests/img/dominos_pieces_vector_svg/dominos_bone_3:6.svg';
import domino44 from './assests/img/dominos_pieces_vector_svg/dominos_bone_4:4.svg';
import domino45 from './assests/img/dominos_pieces_vector_svg/dominos_bone_4:5.svg';
import domino46 from './assests/img/dominos_pieces_vector_svg/dominos_bone_4:6.svg';
import domino55 from './assests/img/dominos_pieces_vector_svg/dominos_bone_5:5.svg';
import domino56 from './assests/img/dominos_pieces_vector_svg/dominos_bone_5:6.svg';
import domino66 from './assests/img/dominos_pieces_vector_svg/dominos_bone_6:6.svg';


// /frontend/src/assests/img/dominos_pieces_vector_svg/dominos bone 0:0.svg

class Testbone extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            angle: 0
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

    loadImage(){
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener("load", this.handleLoad);
    }

    handleLoad = () =>{
        console.log(this.state)
        this.setState({
            image: this.image
        });
    };

    rotateLeft = (e) => {
        // if(e.target.attrs.y > 250 && e.target.attrs.x > 250){
        if ((e.target.attrs.x < 300 && e.target.attrs.x > 140) && e.target.attrs.y > 420) {
            this.setState({angle: 0})
        }
            else if(e.target.attrs.x < 250 ){
                // e.target.attrs.draggable = false;
                    // set State....
                    this.setState({angle: 270})
            } else if ( e.target.attrs.x > 250)  {
                    this.setState({angle: 90})
            }
            
            console.log(this.state)
        
            console.log(`X:  + ${e.target.attrs.x}`)
        console.log(e.target.attrs.y)
    
        }

        // console.log(e.target)
    


    // valueHandleClick(e){
    //     console.log(e.target.attrs.x)
    //     console.log(e.target.attrs.dValue)
    //     console.log(e.target)
    // }

    render() {
        return (
          <Image
            // onDragEnd={this.test}
            onClick={this.rotateLeft}
            // onClick={this.handleLoad}      
            // onMouseDown={this.test}
            x={144}
            y={452}
            rotation={this.state.angle}
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
//setate
constructor(props){
    super(props)
    // this.state{
    // x: this.props.attrs.x,
    // y: this.props.attrs.y
    // }
}


    render() {

        const twoPlayers = [<Testbone src={domino00} x={144} y={453} />, <Testbone src={domino01} x={150} y={452} />, <Testbone src={domino02} x={173} y={452} />,
            <Testbone src={domino03} x={200} y={452} />, <Testbone src={domino04} x={228} y={452} />, <Testbone src={domino05} x={255} y={452} />, <Testbone src={domino06} x={284} y={452}/>,
            <Testbone src={domino66} x={313} y={452} />, <Testbone src={domino56} />, <Testbone src={domino55} />, <Testbone src={domino46} />,
        <Testbone src={domino45} />, <Testbone src={domino44} />, <Testbone src={domino36} />]
            
        // const {src, x, y} = this.props

        return (
            <div >
                <Stage className="boardgamecontainer" width={500} height={500} >
                    <Layer>
                        
                        <Rect x={140} y={450} width={200} height={50} fill="brown" draggable="false" />
                        {/* <Testbone className="domino-size" src={src}  draggable="true" x={100} y={100}  /> */}
                        {/* <Testbone src={domino00} x={144} y={453} />

                        <Testbone src={domino01} x={150} y={452} />
                        <Testbone src={domino02} x={173} y={452} /> */}
                        {twoPlayers ? twoPlayers : null}
                        {/* <Testbone className="domino-size" src={src}  draggable="true" x={this.state.x} y={100}  /> */}

                            
                    </Layer>
                </Stage>
            </div>
        );
    }

}
export default Bone;





