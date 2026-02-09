const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.set("view engine", "ejs");


//app.use(express.static(path.join(__dirname, 'HTML')))
app.use(express.static(path.join(__dirname, 'Public')))
//app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
  
const tempData = [{username: 'Admin', password: 123}]

// index page //
app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('Pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

// about page //
app.get('/about', (req, res) => {
  res.render("Pages/about")
}) 

app.get('/register', (req, res) => {
  res.render("Pages/register", {tempData: tempData})
})

app.get('/login', (req, res) => {
 res.render("Pages/login")
})

app.get('/account', (req, res) => {
  res.render("Pages/account")
})



/////////////////////////////////////////////////////////////////////////

app.post("/register", (req, res) => {
  tempData.push({
    username: req.body.username,
    password: req.body.password
  });

  console.log(tempData);
  res.render("Pages/register", {tempData: tempData}) 
});

//////////////////////////////////////////////////////////////////////////

// 404 Not Found
app.use((req, res) => {
  res.status(404).render("Pages/404")
})

// 500 Server Error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("Pages/500")
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
