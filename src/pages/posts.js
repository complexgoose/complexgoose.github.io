import React from "react"
import * as contentful from 'contentful'
import Preview from '../components/Preview.js'
import Global from '../components/Global'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
class PostPage extends React.Component
{
  client = contentful.createClient({
    space: "rr1q828c6t3j",
    accessToken: "3vdbeP6c08cgcRxyR7tscyvMm-DnOJ4Wzmz-IYwWMPg"
  });
  state ={posts:[]}
  componentDidMount()
  {
    this.client.getEntries()
    .then((response) => this.setState({posts:response.items.reverse()}))
    .catch();
  }
  render()
  {
    return(
    <div>
      <Global/>
      <Container style={{width:"100%",marginBottom:"2%"}}>
        <Row>
        {this.state.posts.map(post =><Preview data={post}/>)}
        </Row>
      </Container>
    </div>);
  }
}

export default PostPage
