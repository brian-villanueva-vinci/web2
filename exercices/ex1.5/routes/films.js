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
    title : "pokemon",
    duration : 100,
    budget : 1000000,
    link : "https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)"
  },
  {
    id : 3, 
    title : "madacascare",
    duration : 180,
    budget : 1000000,
    link : "https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)"
  },
  {
    id : 4, 
    title : "herry potter",
    duration : 80,
    budget : 1000000,
    link : "https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)"
  },
];


router.get('/', (req, res, next) => {
  const minDuration = req?.query?.minDuration ? req.query.minDuration : undefined;
  if((!isNaN(parseFloat(minDuration)) && isFinite(minDuration)) || minDuration === undefined){
  let listFilm;
  if(minDuration !== undefined){
    listFilm = [...FILMS].filter(film => film.duration >= minDuration)
    console.log("GET /films par la durée")
  }else{
    console.log("GET FILM")
  }
  res.json(listFilm ?? FILMS);
  }
  else return res.sendStatus(400);
});

router.get('/:id', (req, res, next) => {
  const filmIndex = FILMS.findIndex((film) => film.id == req.params.id)
  if(filmIndex <0) return res.sendStatus(404)
  res.json(FILMS[filmIndex]);
});

router.post('/', (req, res, next) => {
  const title = req?.body?.title.length !==0 ? req.body.title : undefined;
  const filmAVerifier = FILMS.find(e=>e.title === title);
  if(filmAVerifier){
    return res.sendStatus(409)
  }
  
  const duration = req?.body?.duration.length !==0 ? parseInt(req.body.duration) : undefined;
  const budget = req?.body?.budget.length !==0 ? parseInt(req.body.budget) : undefined;
  const link = req?.body?.title.link !==0 ? req.body.link : undefined;
 
  if(!isNaN(parseFloat(duration)) && isFinite(duration) && !isNaN(parseFloat(budget)) && isFinite(budget)){
    console.log("POST film")
    const lastIndex = FILMS?.length !==0 ? FILMS.length -1 : undefined;
    const lastId = lastIndex !== undefined ? FILMS[lastIndex]?.id : 0;
    const nextId =lastId+1;
    const  newFilm  = {
      id : nextId,
      title : title,
      duration : duration,
      budget : budget,
      link : link
    }
    FILMS.push(newFilm)
  
    return res.redirect('/');
  } 
  return res.sendStatus(400)

 
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const foundIndex = FILMS.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilm = FILMS.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilm[0];

  res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;


  console.log('POST /FILMS');

  if ((!title && !duration && !budget && !link) 
  || title?.length === 0 || link?.length === 0 
  || (!!isNaN(parseFloat(duration)) && isFinite(duration)) 
  || (!!isNaN(parseFloat(budget)) && isFinite(budget)) ) return res.sendStatus(400);

  const foundIndex = FILMS.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...FILMS[foundIndex], ...req.body};

  FILMS[foundIndex] = updatedFilm;

  res.json(updatedFilm);
});


module.exports = router;
