import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>{loadedEvents => <EventsList events={loadedEvents} />}</Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: '이벤트를 받아올 수 없습니다' };
    // throw new Response(JSON.stringify({ message: '이벤트를 가져오지 못했습니다.' }), { status: 500 });
    return json({ message: '이벤트를 가져오지 못했습니다.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents()
  });
};
