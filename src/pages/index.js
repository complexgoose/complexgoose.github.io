import React from'react'
import Global from '../components/Global.js'
import nouns from "../files/nouns.json"
import adjectives from "../files/adjectives.json"
import Button from 'react-bootstrap/Button'
import BackgroundImage from 'gatsby-background-image'

/*
class Word extends React.Component
{
    constructor()
    {
        super();
        this.state={index:0,color:"black"};
    }
    componentDidMount()
    {
        this.nextWord();
        if(this.props.initColor) this.setState({color:this.props.initColor});
    }
    delay = 1;
    randomIndex = ()=>
    {
        return Math.floor(Math.random()*this.props.array.length);
    }
    nextWord = ()=>
    {
        this.setState({index:this.randomIndex()});
        if(this.delay<500)
        {
            setTimeout(this.nextWord,this.delay);
            this.delay*=1.3;
        }
        else
        {
            let color = "red";
            if(this.props.finishColor) color = this.props.finishColor;
            this.setState({index:this.props.index,color:color});
        }
    }
    render()
    {
        return <p style={{color:this.state.color}}>{this.props.array[this.state.index]}</p>
    }
}*/

class IndexPage extends React.Component
{
    data = null;
    constructor({data})
    {
        super();
        this.data=data;
    }
    randItem(arr)
    {
        return arr[Math.floor(Math.random()*arr.length)];
    }
    render =()=>
    {
        return(
            <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
                <Global/>
                <BackgroundImage fluid={this.data.hanging.childImageSharp.fluid}className="vc hc" style={{flex:"1",overflow:"hidden"}}>
                <Button variant="danger" style={{display:"flex",fontSize:"3vh",maxHeight:"5vh",lineHeight:"1"}} onClick={()=>(this.forceUpdate())}>
                        <span style={{color:"black"}}>jack&nbsp;</span>
                        <span style={{color:"black"}}>.&nbsp;</span>
                        <span className="firstLetter">{this.randItem(adjectives)}&nbsp;</span>
                        <span className="firstLetter">{this.randItem(nouns)}</span>
                </Button>
                </BackgroundImage>
            </div>
        );
    }
}
export default IndexPage;

export const query = graphql`
  query
  {
    hanging: file(relativePath: {eq: "hanging.jpg"}) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 4160) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }
`