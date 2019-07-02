import React from "react"
import * as contentful from 'contentful'
import '../styles/index.css'
import Preview from '../components/Preview.js'
import Global from '../components/Global'

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
    .then((response) => this.setState({posts:response.items}))
    .catch();
  }
  render()
  {
    return(
    <div>
      <Global/>
      <div className="hc" style={{width:"100%"}}>
        {this.state.posts.map(post =><Preview data={post}/>)}
      </div>
    </div>);
  }
}

export default PostPage
