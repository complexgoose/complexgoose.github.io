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
                <iframe title="Swirling Colors Animation" src="https://editor.p5js.org/jackstrosahl/embed/rk7YeaDjQ" style={{position:"fixed",width:"100%",height:"100%", zIndex:"-100"}}></iframe></div>
                <div className="vc hc full">
                  <Card bg="primary" text="white" className="text-center" style={{width:"30vw"}}>
                    <Card.Header>Stop Right There!</Card.Header>
                    <Card.Body>
                      <Card.Body>
                        I bet you're itchin' to give me clout.  Well, click that button then!
                      </Card.Body>
                      <Button variant="warning" href="https://www.youtube.com/channel/UC_30B5_Jc9i5UIrG596Lqdg?sub_confirmation=1">Boost Ego</Button>
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