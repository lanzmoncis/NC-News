const articles = require("../db/data/test-data/articles");
const {
  fetchTopics,
  fetchArticles,
  fetchArticlesById,
  fetchArticleComments,
} = require("../models/model");

const getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesById(article_id)
    .then((articleById) => {
      res.status(200).send({ articleById });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const idChecker = fetchArticlesById(article_id);
  const selectsComments = fetchArticleComments(article_id);

  Promise.all([idChecker, selectsComments])
    .then(([article, commentsById]) => {
      res.status(200).send({ commentsById });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getTopics,
  getArticles,
  getArticlesById,
  getArticleComments,
};
