import dayjs from 'dayjs';

export const formatNewsArticles = (articles) =>
  articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    imgUrl: article.urlToImage,
    date: article.publishedAt,
    author: article.author,
  }));

export const formatNewsAIArticles = (articles) =>
  articles.map((article) => ({
    title: article.title,
    description: article.body,
    url: article.url,
    imgUrl: article.image,
    date: article.date,
    author: article.authors?.[0]?.name,
  }));

export const formatGuardianArticles = (articles) =>
  articles.map((article) => ({
    title: article.fields?.headline,
    description: article.fields?.bodyText,
    url: article.fields?.shortUrl,
    imgUrl: article.fields?.thumbnail,
    date: article.fields?.lastModified,
  }));

export const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
