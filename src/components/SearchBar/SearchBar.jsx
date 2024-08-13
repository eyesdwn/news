import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSearch, value }) => (
  <TextField sx={{ mb: 2 }} label="Search" value={value} onChange={(e) => onSearch(e.target.value)} fullWidth />
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
