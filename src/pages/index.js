import React from'react'
import Global from '../components/Global.js'
import verbs from "../files/verbs.json"
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
class Word extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={y:0};
    }
    componentDidUpdate()
    {
        if(this.state.y==0) this.setState((state, props) =>({y:state.y-200}));
    }
    render()
    {
        return(<p style={{position:"absolute",transform:"translateY("+this.state.y+"px)"}}className="scroll">{this.props.word}</p>);
    }
}

class IndexPage extends React.Component
{
    radius = 5;
    constructor()
    {
        super();
        this.state={index:0};
    }
    scrolling;
    componentDidMount()
    {
        //setInterval(this.nextWord,1);
        this.scrolling = document.getElementsByClassName("scroll")[0];
        this.scrolling.addEventListener("animationiteration",this.handleIteration);
    }
    handleIteration= () =>
    {
        let index = verbs.slice(this.state.index,this.state.index+this.radius).indexOf("intrudes");
        if(index)
        {
            this.scrolling.style.animationPlayState = "paused";
            this.setState((state)=>({index:Math.min(verbs.indexOf("intrudes"),verbs.length-this.radius)}));
        }
        else this.setState((state)=>({index:Math.min(state.index+this.radius,verbs.length-this.radius)}));
    }
    nextWord = ()=>
    {
        this.setState((state)=>({index:Math.min(state.index+1,verbs.length-this.radius)}));
    }
    render()
    {
        return(
            <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
                <Global/>
                <div className="vc hc" style={{flex:"1",overflow:"hidden"}}>
                    <div style={{width:"10%",maxHeight:"20%",overflow:"hidden"}}>
                <ListGroup className="scroll">
                        {verbs.slice(this.state.index,this.state.index+this.radius).map((verb)=>(<ListGroup.Item>{verb}</ListGroup.Item>))}
                </ListGroup>
                </div>
                </div>
            </div>
        );
    }
}
//.slice(this.state.index-(this.radius-1),this.state.index+this.radius)
export default IndexPage;