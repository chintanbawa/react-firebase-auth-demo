import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

//types
import { IAppButton } from 'types';

export default function AppButton({ title, onClick, isLoading, ...props }: IAppButton) {
  return (
    <Button variant="contained" onClick={onClick} {...props}>
      {isLoading ? <CircularProgress size={30} sx={{ color: 'white' }} /> : title}
    </Button>
  );
}
