import React from 'react';
import GoogleMapReact from 'google-map-react';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import mapStyles from './List/mapStyles';

import { Paper, Typography, useMediaQuery } from '@mui/material';

export const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div
      style={{
        height: '85vh',
        width: '100%',
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.length &&
          places.map((vehicle, i) => (
            <div
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                '&:hover': { zIndex: 2 },
              }}
              lat={Number(vehicle?.latitude)}
              lng={Number(vehicle?.longitude)}
              key={i}
            >
              {!matches ? (
                <LocationOnIcon color="primary" fontSize="large" />
              ) : (
                <Paper
                  elevation={3}
                  style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100px',
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {' '}
                    {vehicle?.vehicleName}
                  </Typography>
                  <img
                    style={{
                      cursor: 'pointer',
                    }}
                    src={vehicle?.photo ? vehicle?.photo : 'http://localhost:3000/images/v/d1.jpg'}
                    alt=""
                  />
                </Paper>
              )}
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
