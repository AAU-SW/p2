import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export const LinearProgressWithLabel = (props) => {
  return (
    <Box>
      <Box>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: 12, // Make the progress bar thicker
            borderRadius: 6, // Make rounded corners
            backgroundColor: '#e0e0e0', // Light gray background
            '& .MuiLinearProgress-bar': {
              borderRadius: 6, // Keep the filled portion rounded too
              backgroundColor: '#7b61ff', // Purple color
            },
          }}
        />
      </Box>
    </Box>
  );
};
