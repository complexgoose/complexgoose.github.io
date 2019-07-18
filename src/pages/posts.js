import React from "react"
import Preview from '../components/Preview.js'
import Global from '../components/Global'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
const PostsPage = ({ data }) => {
  const { edges: posts } = data.allContentfulPost;
    return(
    <div>
      <Global/>
      <Container style={{width:"100%",marginBottom:"2%"}}>
        <Row>
        {posts.map(({ node: post }) => (<Preview data={post}/>))}
        </Row>
      </Container>
    </div>);
}

export default PostsPage

export const pageQuery  = graphql`{
  allContentfulPost {
    edges {
      node {
        tagline
        image {
          file {
            url
          }
        }
        fields {
          slug
        }
        title
      }
    }
  }
}`
