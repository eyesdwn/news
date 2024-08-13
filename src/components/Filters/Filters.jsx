import 'dayjs/locale/de';

import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';

import { categories, sources } from './data';
import { memo } from 'react';

const FiltersComponent = ({ onFilterChange, filters }) => (
  <Stack dsx={{ flexDirection: { xs: 'column', sm: 'row' } }} gap={2}>
    <Stack direction="row" width="100%" gap={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select label="Category" value={filters.category} onChange={(e) => onFilterChange('category', e.target.value)}>
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Source</InputLabel>
        <Select label="Source" value={filters.source} onChange={(e) => onFilterChange('source', e.target.value)}>
          {sources.map((source) => (
            <MenuItem key={source.value} value={source.value}>
              {source.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>

    <Stack direction="row" width="100%" gap={2}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DatePicker
            label="Start Date"
            value={filters.dateStart}
            format="YYYY-MM-DD"
            onChange={(newValue) => onFilterChange('dateStart', newValue)}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DatePicker
            label="End Date"
            value={filters.dateEnd}
            format="YYYY-MM-DD"
            onChange={(newValue) => onFilterChange('dateEnd', newValue)}
          />
        </LocalizationProvider>
      </FormControl>
    </Stack>
  </Stack>
);

export const Filters = memo(FiltersComponent);

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};
