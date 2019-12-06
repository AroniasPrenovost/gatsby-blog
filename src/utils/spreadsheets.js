const fs = require("fs")
const cron = require("node-cron")

// get google sheet data, build markdown filess
var GoogleSpreadsheet = require("google-spreadsheet")
var creds = require("../../client_secret.json")

cron.schedule("*/1 * * * * *", function() {
  var doc = new GoogleSpreadsheet(creds["spreadsheet_id"])
  doc.useServiceAccountAuth(creds, function(err) {
    doc.getRows(1, function(err, rows) {
      // remove unused rows
      for (var i = 0; i < rows.length; i++) {
        delete rows[i]._xml
        delete rows[i].id
        delete rows[i]._links
      }

      for (var i = 0; i < rows.length; i++) {
        var postObj = {}

        // title
        postObj.title = rows[i]["blog-post-title"]

        // file name
        postObj.file_name = rows[i]["blog-post-title"]
        postObj.file_name = postObj.file_name
          .replace(/\s+/g, "-")
          .toLowerCase()
          .concat(".md")

        postObj.date = rows[i]["blog-post-date"]

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

        fs.writeFile(
          "./src/pages/blog/" + postObj.file_name,
          pageContent,
          function(err) {
            if (err) throw err
            console.log("created: " + postObj.file_name)
          }
        )
      }
    })
  })
})
