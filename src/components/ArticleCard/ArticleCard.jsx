import { Card, CardContent, CardMedia, Link, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

const fallbackURL = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';

export const ArticleCard = ({ article }) => {
  const [url, setUrl] = useState(article.imgUrl || fallbackURL);

  const errorHandler = useCallback(() => {
    setUrl(fallbackURL);
  }, [setUrl]);

  return (
    <Card>
      <CardMedia
        sx={{ background: '#d5d5d5' }}
        component="img"
        height="240"
        image={url}
        alt={article.title}
        onError={errorHandler}
      />
      <CardContent>
        <Link href={article.url} target="_blank" rel="noopener" sx={{ textDecoration: 'none' }}>
          <Typography variant="h6" color="blue" sx={{ fontWeight: 'bold' }}>
            {article.title}
          </Typography>
        </Link>
        <Typography variant="body2" mt={1}>
          {`${article.description?.substring(0, 400)}`}...{' '}
          <Link href={article.url} sx={{ color: 'blue' }} target="_blank" rel="noopener">
            Read more
          </Link>
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
          <Typography color="blue" variant="caption">
            {dayjs(article.date).format('YYYY-MM-DD')}
          </Typography>
          {article.author && (
            <Typography variant="caption" color="blue">
              by {article.author}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};
