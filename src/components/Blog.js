import React from "react";
import ReactMarkdown from 'react-markdown'
import Image from 'react-bootstrap/Image'
import Global from '../components/Global.js'
export default function PageTemplate({data:{contentfulPost}})
{
    return(
    <div>
        <Global/>
        <div className="hc" style={{width:"100%",flexWrap:"wrap"}}>
            <div style={{maxWidth:"728px",margin:"5%"}}>
                    <h1 style={{fontWeight:"bold"}}>{contentfulPost.title}</h1>
                    <p style={{paddingBottom:"30"}}>{contentfulPost.tagline}</p>
                    <Image fluid src={contentfulPost.image.file.url}/>
                    <div style={{flexBasis:"100%",height:"1%"}}/>
                <div style={{fontSize:"18px",lineHeight:"2em",fontWeight:"300"}}> 
                    <ReactMarkdown source={contentfulPost.content.content}/>
                </div>
            </div>
        </div>
    </div>);
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    contentfulPost(contentful_id: { eq: $id }) {
        title
        tagline
        contentful_id
        image {
          file {
            url
          }
        }
        content {
          content
        }
        fields {
          slug
        }
    }
  }
`