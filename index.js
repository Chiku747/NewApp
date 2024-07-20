const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { error } = require("console");





app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));





//Processing form data
app.post("/note", function (req, res) {
  const data = (req.body);
  fs.writeFile(`./files/${data.title}.txt`, data.details, error)
  res.redirect("/")

})
app.get("/", function (req, res) {
  fs.readdir("./files", function (err, files) {
    res.render("index", { files: files });
  })
});


app.get("/:page", function (req, res) {
  const page = req.params.page;
  const pageShow = page.slice(1);
  fs.readFile(`./files/${pageShow}`, "utf-8", function (err, data) {
    res.render("show", { pageShow: pageShow, data: data });
  })
})

app.post("/:page", function (req, res) {
  const page = req.params.page;
  const pageShow = page.slice(1);
  fs.unlink(`./files/${pageShow}`, function (err, data) {
  })
  res.redirect("/");
})


  app.listen(3000);