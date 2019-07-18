/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "ContentfulPost") {

    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix. We
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `/posts/${node.contentful_id}`,
    })
  }
}

exports.createPages = async function({ actions, graphql }) {
    const { data } = await graphql(`
      query {
        allContentfulPost {
          edges {
            node {
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
        }
      }
    `)
    // highlight-start
    data.allContentfulPost.edges.forEach(edge => {
      const slug = edge.node.fields.slug
      actions.createPage({
        path: slug,
        component: require.resolve(`./src/components/Blog.js`),
        context: {id:edge.node.contentful_id},
      })
    })
    // highlight-end
  }