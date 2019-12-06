import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    {/* <h1>All posts {data.site.siteMetadata.title}</h1> */}

    <p
      css={css`
        color: #dfe4ea;
        margin-top: 50px;
      `}
    >
      {data.allMarkdownRemark.totalCount} posts
    </p>

    {data.allMarkdownRemark.edges.map(({ node }) => (
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
    <Link to={`/`} className="footer">
      home
    </Link>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
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
