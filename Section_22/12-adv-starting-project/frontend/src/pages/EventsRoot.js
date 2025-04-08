import { Outlet } from 'react-router-dom';
import React from 'react';
import EventsNavigation from '../components/EventsNavigation';

const EventsRootLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default EventsRootLayout;
