import React from "react"
import { css } from "@emotion/core"
import "./base.css"
import "./layout.css"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { withPrefix } from "gatsby-link"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allSitePage {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  )

  // create link for every file in /pages
  function flattenObj(obj, parent, res = {}) {
    for (let key in obj) {
      let propName = parent ? parent + "_" + key : key
      if (typeof obj[key] == "object") {
        flattenObj(obj[key], propName, res)
      } else {
        res[propName] = obj[key]
      }
    }
    return res
  }

  //   var currentPath = window.location.pathname // broken hack, need to pass props
//   var files = flattenObj(data)
//   var postCount = 0
//   files = Object.values(files)
//   for (var i = 0; i < files.length; i++) {
//     if (files[i].includes("/blog/") && files[i].length > 6) {
//       postCount++
//     }
    // if (files[i].indexOf("SitePage ") !== -1) {
    //   files[i] = files[i].replace("SitePage ", "")
    //   if (currentPath === files[i]) {
    //     files.splice(files.indexOf(currentPath), 1)
    //   }
    //   if (files[i]) {
    //     files.splice(files.indexOf(currentPath), 1)
    //   }
    // }
  }

//   function createP() {
//     var p = document.createElement("p")
//     p.innerText = "test"
//     return p
//   }

//   var ddd
//   // hack
//   if (currentPath === "/") {
//     files = [{ slug: "/blog/", name: "View all " + postCount + " blog posts" }]
//   } else if (currentPath === "/blog/") {
//     files = [{ slug: "/", name: "Home" }]
//     ddd = createP()
//     console.log(ddd)
//   } else {
//     files = [
//       { slug: "/", name: "Home" },
//       { slug: "/blog/", name: "All posts" },
//     ]
//   }

  return (
    <div>
      {/* {files.forEach(function(value) {
        return <div>{value}</div>
      })} */}
    </div>
  )
}

/* 
          <Link to={`/blog/`} className="footer">
            View all {data.allMarkdownRemark.totalCount} posts
          </Link>
*/
