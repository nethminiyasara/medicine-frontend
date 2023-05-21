import React, { useState, useEffect } from 'react';

import List from './List/List';
import { Map } from './Map';

import Grid from '@mui/material/Grid';
import { getVehicles } from '../../services/vehicleService';

export const MapLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getVehicles().then((data) => {
        setPlaces(data);
        setFilteredPlaces([]);

        setIsLoading(false);
      });
    }
  }, [bounds]);

  return (
    <>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces?.length ? filteredPlaces : places}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
      {/* <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-8">
          <Map />
        </div>
      </div> */}
    </>
  );
};
