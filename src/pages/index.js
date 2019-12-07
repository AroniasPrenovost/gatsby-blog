import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <div
        css={css`
          smargin-top: ${rhythm(4)};
          color: #dfe4ea;
        `}
      >
        <h1
          css={css`
            display: inline-block;
            // border-bottom: 1px solid #dfe4ea;
            text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
            color: white;
          `}
        >
          Ancient history
        </h1>
        {data.allMarkdownRemark.edges.slice(0, 3).map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: #dfe4ea;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 2)};
                  color: #dfe4ea;
                `}
              >
                <span
                  css={css`
                    color: #dfe4ea;
                    display: block;
                    font-size: 16px;
                    margin-bottom: 5px;
                  `}
                >
                  {node.frontmatter.date}
                </span>
                {node.frontmatter.title}{" "}
              </h3>
              {/* <p>{node.excerpt}</p> */}
            </Link>
          </div>
        ))}
        <h4
          css={css`
            margin-top: 50px;
          `}
        >
          <Link to={`/blog/`} className="footer">
            View all {data.allMarkdownRemark.totalCount} posts
          </Link>
        </h4>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
