import React from "react";
import * as contentful from 'contentful'
import ReactMarkdown from 'react-markdown'
import Image from 'react-bootstrap/Image'
class Blog extends React.Component
{
    state={data:{}}
    client = contentful.createClient({
        space: "rr1q828c6t3j",
        accessToken: "3vdbeP6c08cgcRxyR7tscyvMm-DnOJ4Wzmz-IYwWMPg"
    });
    componentDidMount()
    {
        this.client
        .getEntry(this.props.id)
        .then(entry =>
                {this.setState({data:entry})})
        .catch(err => {this.setState({data:{}})});
    }

    render()
    {
        if(!this.state.data.fields) return null;
        return(
            
        <div className="hc" style={{width:"100%",marginTop:"3%",flexWrap:"wrap"}}>
            <div style={{maxWidth:"40vmax"}}>
                    <h1 style={{fontWeight:"bold"}}>{this.state.data.fields.title}</h1>
                    <p style={{paddingBottom:"30"}}>{this.state.data.fields.tagline}</p>
                    <Image fluid src={this.state.data.fields.image.fields.file.url}/>
                    <div style={{flexBasis:"100%",height:"2%"}}/>
                <div style={{fontSize:"21px",lineHeight:"1.2em",fontFamily: "'DM Serif Text', serif"}}> 
                    <ReactMarkdown source={this.state.data.fields.content}/>
                </div>
            </div>
        </div>);
    }
}

export default Blog;