import React from 'react';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
  const submitHandler = event => {
    event.preventDefault();
  };

  return <EventForm method='POST' />;
};

export default NewEventPage;
