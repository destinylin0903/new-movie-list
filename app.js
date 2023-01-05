//載入Express及定義伺服器變數
const express = require("express");
const movieList = require("./movies.json");
//./代表的是和app.js同一層的資料位置
const app = express();
const port = 3000;

//require express-handlerbars here
const exphbs = require("express-handlebars");

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

//設定routes
app.get("/", (req, res) => {
  // past the movie data into 'index' partial template
  res.render("index", { movies: movieList.results });
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log (req)
  console.log ('keyword',keyword)
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase().trim())
  })
  res.render("index", { movies: movies, keyword: keyword });
})

app.get("/movies/:movie_id", (req, res) => {
  const movie = movieList.results.find(
    (movie) => movie.id.toString() === req.params.movie_id
  );
  res.render("show", { movie: movie });
});

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhotst:${port}`);
});
