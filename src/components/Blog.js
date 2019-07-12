import React from "react";
import * as contentful from 'contentful'
import ReactMarkdown from 'react-markdown'

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
            <div style={{maxWidth:"50vmax"}}>
            <h1 style={{fontSize:"5vh",fontWeight:"bold"}}>{this.state.data.fields.title}</h1>
            <div style={{flexBasis:"100%"}}/>
            <div style={{fontSize:"3vh",lineHeight:"5vh"}}> 
            <ReactMarkdown source={this.state.data.fields.content}/>
            </div>
            </div>
        </div>);
    }
}

export default Blog;