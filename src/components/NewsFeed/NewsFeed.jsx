import PropTypes from 'prop-types';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Box, Grid } from '@mui/material';
import { ArticleCard } from '../ArticleCard';

export const NewsFeed = ({ articles }) => (
  <Box mt={4}>
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="16px">
        {articles?.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.url}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  </Box>
);

NewsFeed.propTypes = {
  articles: PropTypes.array.isRequired,
};
