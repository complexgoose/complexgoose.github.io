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
            <div>
                <Head/>
                
                <Navbar sticky="top" bg="dark" variant="dark" style={{height:"7vh",fontSize:"2vmin"}}>
                    <Navbar.Brand as={Link} style={{marginLeft:"20%"}} to="">{"{js}"}</Navbar.Brand>
                    <Nav variant="pills" activeKey={this.getActiveKey()}>
                        <HeaderLink to="posts" name="Posts"/>
                        <HeaderLink to="map" name="Map"/>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Global;