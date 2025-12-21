const Article = require("../../models/Articles");

const findArticleById = async (articleId) => {
  return await Article.findById(Number(articleId));
}

const getArticleContributors = async (articleId) => {

  const article = await
    Article.findById(Number(articleId))
      .populate({
        path: "contributors",
        select: "user_id user_name followers Profile_image",
        match: {
          isBannedUser: false,
          isBlockUser: false
        }
      }).
      exec();

  if (!article || article.is_removed) {
    return null;
  }

  if (article.contributors) {
    article.contributors = article.contributors.filter(user => user !== null);
  }

  return article.contributors || [];
}

module.exports = {
  findArticleById,
  getArticleContributors
}