const db = require("../db/connection");

const fetchTopics = () => {
  const queryString = `SELECT * FROM topics;`;

  return db.query(queryString).then((topics) => {
    return topics.rows;
  });
};

const fetchArticles = () => {
  const queryString = `SELECT articles.*, COUNT(comments.article_id) AS comment_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`;

  return db.query(queryString).then((articles) => {
    return articles.rows;
  });
};

const fetchArticlesById = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  const queryString = `SELECT * FROM articles WHERE article_id = $1`;
  const value = [article_id];

  return db.query(queryString, value).then((articleById) => {
    if (articleById.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return articleById.rows[0];
  });
};

const fetchArticleComments = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  const queryString = `SELECT comment_id, votes, created_at, author, body, article_id
  FROM comments
  WHERE article_id = $1
  ORDER BY created_at DESC;`;
  const value = [article_id];

  return db.query(queryString, value).then((commentsById) => {
    return commentsById.rows;
  });
};

module.exports = {
  fetchTopics,
  fetchArticles,
  fetchArticlesById,
  fetchArticleComments,
};
