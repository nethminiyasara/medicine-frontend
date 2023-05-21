import React, { useState, useEffect, createRef } from 'react';

import { CircularProgress, Grid, Typography } from '@mui/material';
import VehicleDetails from './VehicleDetails.jsx';

// import useStyles from './styles.js';

const List = ({ places, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  // const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div style={{ padding: '25px' }}>
      <Typography variant="h4">Current Distribution</Typography>
      {isLoading ? (
        <div
          style={{
            height: '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            style={{
              height: '85vh',
              overflow: 'auto',
            }}
          >
            {places?.map((vehicle, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <VehicleDetails selected={Number(childClicked) === i} refProp={elRefs[i]} vehicle={vehicle} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
