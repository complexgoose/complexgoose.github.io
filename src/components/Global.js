import React from'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from "gatsby"
import Head from '../components/Head.js';

class Global extends React.Component
{
    links =
    [
        {to:"posts",title:"Posts"},
    ]
    render()
    {
        return(
            <div>
                <Head/>
                <Navbar sticky="top" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="">{"{js}"}</Navbar.Brand>
                    <Nav variant="pills">
                        <Nav.Link as={Link} to="posts">Posts</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Global;