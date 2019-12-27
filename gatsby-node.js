const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

// build spreadsheet data
const fs = require("fs")
const cron = require("node-cron")

// get google sheet data, build markdown filess
var GoogleSpreadsheet = require("google-spreadsheet")
var creds = require("./client_secret.json")

cron.schedule("*/100 * * * * *", function () {
  var doc = new GoogleSpreadsheet(creds["spreadsheet_id"])
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(1, function (err, rows) {
      // remove unused rows


      for (var i = 0; i < rows.length; i++) {
        delete rows[i]._xml
        delete rows[i].id
        delete rows[i]._links
      }

      for (var i = 0; i < rows.length; i++) {
        if (rows[i]["blog-post-title"].trim().length > 0) {
          if (rows[i]["blog-post-date"].trim().length > 0) {
            var postObj = {}

            // title
            postObj.title = rows[i]["blog-post-title"]

            // file name
            postObj.file_name = rows[i]["blog-post-title"]
            postObj.file_name = postObj.file_name
              .replace(/\s+/g, "-")
              .toLowerCase()
              .concat(".md")

            postObj.date = rows[i]["blog-post-date"].replace('test', '')

            var pageContent = []
            // date + title markdown header
            var mdheader = `---\ntitle: ${postObj.title}\ndate: ${postObj.date}\n---\n`
            pageContent.push(mdheader)

            // content
            // to do - parse html string and convert to markdown

            // links

            // bold

            // underline

            // bullet points

            postObj.content = rows[i].blogpostbody1

            pageContent.push(postObj.content)

            pageContent.join("")

            if (postObj.file_name !== '.md') {
              fs.writeFile(
                "./src/pages/blog/" + postObj.file_name,
                pageContent,
                function (err) {
                  if (err) throw err
                  console.log("successfully created: " + postObj.file_name)
                }
              )
            }
          }
        }
      }
    })
  })
})

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
