import React from 'react';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';

const VehicleDetails = ({ vehicle, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  console.log(vehicle);
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 250 }}
        image={vehicle?.photo ? vehicle?.photo : 'http://localhost:3000/images/v/d1.jpg'}
        title={vehicle?.vehicleName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" style={{ marginBottom: '8px' }}>
          {vehicle?.vehicleName}
        </Typography>

        {vehicle?.products?.map(({ name }) => (
          <Chip key={name} size="medium" label={name} style={{ fontSize: '12px' }} />
        ))}
        {vehicle?.currentLocation && (
          <Typography gutterBottom variant="h4" color="textSecondary" style={{ fontSize: '14px', marginTop: '10px' }}>
            <LocationOnIcon />
            {vehicle?.currentLocation}
          </Typography>
        )}
        {vehicle?.phone && (
          <Typography variant="body2" color="textSecondary">
            <PhoneAndroidIcon /> {vehicle?.phone}
          </Typography>
        )}
        <Typography gutterBottom variant="body2" color="textInfo" style={{ marginTop: '8px', color: 'blue' }}>
          From: {vehicle?.from} - To: {vehicle?.to}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(vehicle?.site, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default VehicleDetails;
