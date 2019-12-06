import React from "react"
import { css } from "@emotion/core"
import Footer from "./footer"
import "./base.css"
import "./layout.css"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { withPrefix } from "gatsby-link"
import { Location } from "@reach/router"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div id="pageBody">
      <div
        css={css`
        margin: 0 auto;
        // max-width: 700px;
        max-width: 900px;
        padding: ${rhythm(2)};
        // padding-top: ${rhythm(1.5)};
        padding-top: ${rhythm(5.5)};
      `}
      >
        <div className="center-icon">
          <h1>B</h1>
        </div>
        {/* <Link to={`/`}>
        <h3
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        About
      </Link> */}
        {children}
        <Footer></Footer>
      </div>
    </div>
  )
}
