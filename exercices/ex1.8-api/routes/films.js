const express = require('express');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = `${__dirname}/../data/films.json`;

const FILMS = [
  {
    id: 1,
    title: 'avatar',
    duration: 180,
    budget: 1000000,
    link: 'https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)',
  },
  {
    id: 2,
    title: 'pokemon',
    duration: 100,
    budget: 1000000,
    link: 'https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)',
  },
  {
    id: 3,
    title: 'madacascare',
    duration: 180,
    budget: 1000000,
    link: 'https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)',
  },
  {
    id: 4,
    title: 'herry potter',
    duration: 80,
    budget: 1000000,
    link: 'https://fr.wikipedia.org/wiki/Avatar_(s%C3%A9rie_de_films)',
  },
];

router.get('/', (req, res) => {
  const minDuration = req?.query?.minDuration ? req.query.minDuration : undefined;
  if (minDuration === undefined) {
    let listFilm;
    const films = parse(jsonDbPath, FILMS);
    if (minDuration !== undefined) {
      listFilm = [...films].filter((film) => film.duration >= minDuration);
    }
    return res.json(listFilm ?? films);
  }
  return res.sendStatus(400);
});

router.get('/:id', (req, res) => {
  const films = parse(jsonDbPath, FILMS);
  const filmIndex = films.findIndex((film) => film.id === req.params.id);
  if (filmIndex < 0) return res.sendStatus(404);
  return res.json(films[filmIndex]);
});

router.post('/', (req, res) => {
  const films = parse(jsonDbPath, FILMS);
  const title = req?.body?.title.length !== 0 ? req.body.title : undefined;
  const filmAVerifier = films.find((e) => e.title === title);
  if (filmAVerifier) {
    return res.sendStatus(409);
  }

  const duration = req?.body?.duration.length !== 0 ? parseInt(req.body.duration, 10) : undefined;
  const budget = req?.body?.budget.length !== 0 ? parseInt(req.body.budget, 10) : undefined;
  const link = req?.body?.title.link !== 0 ? req.body.link : undefined;

  const lastIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastIndex !== undefined ? films[lastIndex]?.id : 0;
  const nextId = lastId + 1;
  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };
  films.push(newFilm);

  serialize(jsonDbPath, films);

  return res.redirect('/');
});

router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex((film) => film.id === Number(req.params.id));

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilm = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilm[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});

router.patch('/:id', (req, res) => {

  const title = req?.body?.title;
  const duration = Number(req?.body?.duration);
  const budget = Number(req?.body?.budget);
  const link = req?.body?.link;

  // Validation des données
  if ((!title && !duration && !budget && !link) || title?.length === 0 || link?.length === 0) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex((film) => film.id === Number(req.params.id));

  if (foundIndex < 0) {
    return res.sendStatus(404);
  }

  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;
