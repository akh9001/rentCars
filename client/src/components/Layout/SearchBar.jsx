import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <TextField
      fullWidth
      variant="standard" 
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start"
          sx={{
            p: 2, 
            my: 1}}
          >
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment >
        ),
      }}
    />
  );
}
