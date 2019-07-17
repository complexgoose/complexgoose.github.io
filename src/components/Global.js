import React from'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from "gatsby"
import Head from '../components/Head.js'
import Container from 'react-bootstrap/Container'

class HeaderLink extends React.Component
{
    render()
    {
        return(
            <Nav.Link eventKey={this.props.to} as={Link} to={this.props.to}>{this.props.name}</Nav.Link>
        )
    }
}

class Global extends React.Component
{
    mounted = false;
    componentDidMount()
    {
        this.mounted=true;
        this.forceUpdate();
    }
    getActiveKey()
    {
        if(!this.mounted) return "";
        let path = window.location.pathname.slice(1).replace("/","");
        console.log(path);
        if(path.startsWith("post")) return "posts";
        return path;
    }
    render()
    {
        return(
            <div style={{width:"100%"}}>
                <Head/>
                <Navbar bg="dark" variant="dark" style={{height:"100%",fontSize:"2vh",width:"100%"}}>
                <Navbar.Brand as={Link} style={{fontSize:"5vh",position:"absolute",left:"0",top:"0",lineHeight:".75"}} to="">{"{js}"}</Navbar.Brand>

                    <Container fluid style={{alignContent:"center",justifyContent:"center"}}>
                        <Nav variant="pills" activeKey={this.getActiveKey()} style={{alignContent:"center"}}>
                            <HeaderLink to="posts" name="Posts"/>
                            <HeaderLink to="map" name="Map"/>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Global;