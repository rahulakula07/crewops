// import React from 'react';
// import { CircularProgress, Box } from '@mui/material';

// const Spinner = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//       }}
//     >
//       <CircularProgress />
//     </Box>
//   );
// };

// export default Spinner;


import React from 'react';
import { Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <CircularProgress
        thickness={5}
        size={60}
        sx={{ color: '#1976d2' }} // Primary color
      />
      <Typography variant="h6" color="text.secondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Spinner;
