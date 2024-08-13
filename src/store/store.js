import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './slice/articlesSlice';

export const store = configureStore({
  reducer: {
    articles: articlesSlice,
  },
});
