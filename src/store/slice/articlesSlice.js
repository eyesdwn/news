import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchGuardianArticles, fetchNewsAIArticles, fetchNewsArticles } from '../services/getArticles';

const initialState = {
  newsArticles: [],
  newsAIArticles: [],
  guardianArticles: [],
  isLoading: false,
  error: {
    newsArticles: null,
    newsAIArticles: null,
    guardianArticles: null,
  },
};

export const fetchNewsArticlesAsync = createAsyncThunk('articles/fetchNewsArticles', async ({ query, filters }) => {
  if (filters.source === 'the-guardian') {
    return [];
  }
  const response = await fetchNewsArticles(query, filters);
  return response;
});

export const fetchNewsAIArticlesAsync = createAsyncThunk('articles/fetchNewsAIArticles', async ({ query, filters }) => {
  if (!!filters.source) {
    return [];
  }
  const response = await fetchNewsAIArticles(query, filters);
  return response;
});

export const fetchGuardianArticlesAsync = createAsyncThunk(
  'articles/fetchGuardianArticles',
  async ({ query, filters }) => {
    if (!filters.source || filters.source === 'the-guardian') {
      const response = await fetchGuardianArticles(query, filters);
      return response;
    }
    return [];
  }
);

export const selectArticles = createSelector(
  (state) => state.articles.newsArticles,
  (state) => state.articles.newsAIArticles,
  (state) => state.articles.guardianArticles,
  (newsArticles, newsAIArticles, guardianArticles) => {
    return [...guardianArticles, ...newsArticles, ...newsAIArticles];
  }
);

export const selectError = createSelector(
  (state) => state.articles.error.newsArticles,
  (state) => state.articles.error.newsAIArticles,
  (state) => state.articles.error.guardianArticles,
  (newsArticlesError, newsAIArticlesError, guardianArticlesError) => {
    if (newsArticlesError && newsAIArticlesError && guardianArticlesError) {
      return 'An error occurred while fetching articles';
    }
    return null;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsArticlesAsync.pending, (state) => {
        state.isLoading = true;
        state.error.newsArticles = null;
      })
      .addCase(fetchNewsArticlesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newsArticles = action.payload;
      })
      .addCase(fetchNewsArticlesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error.newsArticles = action.error;
      })
      .addCase(fetchNewsAIArticlesAsync.pending, (state) => {
        state.isLoading = true;
        state.error.newsAIArticles = null;
      })
      .addCase(fetchNewsAIArticlesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newsAIArticles = action.payload;
      })
      .addCase(fetchNewsAIArticlesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error.newsAIArticles = action.error;
      })
      .addCase(fetchGuardianArticlesAsync.pending, (state) => {
        state.isLoading = true;
        state.error.guardianArticles = null;
      })
      .addCase(fetchGuardianArticlesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardianArticles = action.payload;
      })
      .addCase(fetchGuardianArticlesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error.guardianArticles = action.error;
      });
  },
});

export default articlesSlice.reducer;
