import React from'react'
import Global from '../components/Global.js'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'gatsby'

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
                <div style={{position:"relative",overflow:"visible",height:"0px",width:"0px"}}>
                    <iframe title="Swirling Colors Animation" src="https://editor.p5js.org/jackstrosahl/embed/G_-1c39p2"
                        style={{position:"fixed",width:"100%",height:"100%", zIndex:"-100"}}/>
                </div>
                <div className="vc hc full">
                  <Card bg="primary" text="white" className="text-center">
                    <Card.Body>
                      <Card.Body>
                        Check me out on YouTube!
                      </Card.Body>
                      <Button variant="danger" href="https://www.youtube.com/channel/UC_30B5_Jc9i5UIrG596Lqdg?sub_confirmation=1">Subscribe</Button>
                    </Card.Body>
                  </Card>
                </div>
                {/*
                <BackgroundImage fluid={this.data.hanging.childImageSharp.fluid}className="vc hc" style={{flex:"1",overflow:"hidden"}}>
                <Button variant="danger" style={{display:"flex",fontSize:"3vh",maxHeight:"5vh",lineHeight:"1"}} onClick={()=>(this.forceUpdate())}>
                        jstro.io
                </Button>
                </BackgroundImage>*/}
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