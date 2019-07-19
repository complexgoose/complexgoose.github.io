import React from "react"
import { Link } from "gatsby"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
class Preview extends React.Component
{   
    render()
    {
        return(
            <Col md="auto" lg={4} style={{marginTop:"2%"}}>
            <Card fluid bg="dark" text="white" style={{height:"100%"}}>
                <Card.Img variant="top" src={this.props.data.image.file.url} />
                <Card.Body>
                    <Card.Title>{this.props.data.title}</Card.Title>
                    <Card.Text>
                        {this.props.data.tagline}
                    </Card.Text>
                    
                </Card.Body>
                <Card.Footer><Button as={Link} to={this.props.data.fields.slug} variant="secondary">Read more</Button></Card.Footer>
            </Card>
            </Col>);
    }
}

export default Preview;