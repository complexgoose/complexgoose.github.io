import React from "react"
import { Link } from "gatsby"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Preview extends React.Component
{   
    render()
    {
        return(
            <Card bg="primary" text="white" style={{width:"20%",height:"30%",margin:"1%"}}>
                <Card.Img variant="top" style={{height:"30%"}} src={this.props.data.fields.image.fields.file.url} />
                <Card.Body>
                    <Card.Title>{this.props.data.fields.title}</Card.Title>
                    <Card.Text>
                        {this.props.data.fields.tagline}
                    </Card.Text>
                    <Button as={Link} to={"post?id="+this.props.data.sys.id} variant="secondary">Read more</Button>
                </Card.Body>
            </Card>);
    }
}

export default Preview;