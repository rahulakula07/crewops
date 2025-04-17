import React from 'react';
import { Skeleton, Box } from '@mui/material';

const SkeletonLoader = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
    </Box>
  );
};

export default SkeletonLoader;
