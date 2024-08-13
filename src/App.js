import { Box, Button, Container, LinearProgress, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Filters, NewsFeed, SearchBar } from './components';
import {
  fetchGuardianArticlesAsync,
  fetchNewsAIArticlesAsync,
  fetchNewsArticlesAsync,
  selectArticles,
  selectError,
} from './store/slice/articlesSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.articles);
  const articles = useSelector(selectArticles);
  const error = useSelector(selectError);

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    dateStart: dayjs('2024-07-21'),
    dateEnd: dayjs(new Date()),
    category: '',
    source: '',
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchArticles = useCallback(
    debounce((query, filters) => {
      dispatch(fetchNewsArticlesAsync({ query, filters }));
      dispatch(fetchNewsAIArticlesAsync({ query, filters }));
      dispatch(fetchGuardianArticlesAsync({ query, filters }));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetchArticles(query, filters);
  }, [query, filters, debouncedFetchArticles]);

  const handleFilterChange = useCallback(
    (key, value) => {
      setFilters({ ...filters, [key]: value });
    },
    [filters, setFilters]
  );

  const handleReset = useCallback(() => {
    setFilters({ category: '', source: '' });
    setQuery('');
  }, [setFilters, setQuery]);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'blue' }}>
          News
        </Typography>
        <Paper style={{ padding: 16 }}>
          <SearchBar onSearch={setQuery} value={query} />
          <Filters filters={filters} onFilterChange={handleFilterChange} />
          <Button
            sx={{
              mt: 2,
              background: 'blue',
              fontWeight: 'bold',
              '&:hover': {
                background: 'darkblue',
              },
            }}
            variant="contained"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Paper>
        {isLoading && <LinearProgress sx={{ mt: 3, backgroundColor: 'blue', opacity: 0.5 }} />}
        {error && (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Error: {error}
          </Typography>
        )}
        <NewsFeed articles={articles} />
      </Box>
    </Container>
  );
};

export default App;
