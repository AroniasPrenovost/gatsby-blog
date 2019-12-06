import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import "../components/base.css"
import Layout from "../components/layoutAlt"
import { rhythm } from "../utils/typography"

export default ({ data }) => {
  // Bug patch: replace first instance of '>,<' w/ ><
  data.markdownRemark.html = data.markdownRemark.html.replace(">,<", "><")

  const post = data.markdownRemark

  return (
    <Layout>
      <div
        css={css`
          margin-top: ${rhythm(4)};
        `}
      >
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <Link to={`/`} className="footer">
        home
      </Link>
      <Link to={`/blog/`} className="footer">
        posts
      </Link>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
