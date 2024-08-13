/* eslint-disable no-undef */
import axios from 'axios';

import { GUARDIAN_BASE_URL, NEWS_API_AI_BASE_URL, NEWS_BASE_URL } from './constants';
import { formatDate, formatGuardianArticles, formatNewsAIArticles, formatNewsArticles } from './utils';

export const fetchGuardianArticles = async (query, filters) => {
  const response = await axios.get(GUARDIAN_BASE_URL, {
    params: {
      q: query,
      'show-fields': 'all',
      'show-references': 'author',
      'page-size': 50,
      'api-key': process.env.REACT_APP_GUARDIAN_API_KEY,
      ...(filters.category && { section: filters.category }),
      ...(filters.dateStart && { 'from-date': formatDate(filters.dateStart) }),
      ...(filters.dateEnd && { 'to-date': formatDate(filters.dateEnd) }),
    },
  });

  return formatGuardianArticles(response.data.response.results);
};

export const fetchNewsArticles = async (query, filters) => {
  // sources value is required for the News API
  const sources = filters.source || 'cnn,bbc-news,new-york-magazine,politico,reuters';

  const response = await axios.get(NEWS_BASE_URL, {
    params: {
      q: `${query} ${filters.category}`,
      sortBy: 'publishedAt',
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
      sources,
      ...(filters.dateStart && { from: formatDate(filters.dateStart) }),
      ...(filters.dateEnd && { to: formatDate(filters.dateEnd) }),
    },
  });

  return formatNewsArticles(response.data.articles);
};

export const fetchNewsAIArticles = async (query, filters) => {
  const response = await axios.get(NEWS_API_AI_BASE_URL, {
    params: {
      resultType: 'articles',
      apiKey: process.env.REACT_APP_NEWS_API_AI_KEY,
      lang: 'eng',
      ...(query && { keyword: query }),
      ...(filters.category && {
        categoryUri: `news/${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`,
      }),
      ...(filters.dateStart && { dateStart: formatDate(filters.dateStart) }),
      ...(filters.dateEnd && { dateEnd: formatDate(filters.dateEnd) }),
    },
  });

  return formatNewsAIArticles(response.data.articles.results);
};
