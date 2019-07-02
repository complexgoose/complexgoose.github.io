import React from "react"
import { Link } from "gatsby"

class Preview extends React.Component
{   
    render()
    {
        return(
            <Link style={{maxWidth:"30%",border:".3vmin solid black",borderRadius:"1vmin",margin:"3vmin",backgroundColor:"#F0F0F0"}} to={"post?id="+this.props.data.sys.id}>
                <div style={{margin:"3vmin"}}>
                    <img style={{width:"100%"}}src={this.props.data.fields.image.fields.file.url} alt={this.props.data.fields.image.fields.file.title}/>
                    <h2 style={{fontSize:"5vmin"}}>{this.props.data.fields.title}</h2>
                    <p>{this.props.data.fields.tagline}</p>
                </div>
            </Link>
        );
    }
}

export default Preview;