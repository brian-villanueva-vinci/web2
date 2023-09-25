var express = require('express');
var router = express.Router();

const FILMS = [
  {
    id : 1, 
    title : "avatar",
    duration : 180,
    budget : 1000000,
    link : "https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)"
  },
  {
    id : 2, 
    title : "avatar",
    duration : 180,
    budget : 1000000,
    link : "https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)"
  },
  {
    id : 3, 
    title : "avatar",
    duration : 180,
    budget : 1000000,
    link : "https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)"
  },
  {
    id : 4, 
    title : "avatar",
    duration : 180,
    budget : 1000000,
    link : "https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)"
  },
];

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("GET /films")
  res.json(FILMS);
});

module.exports = router;
