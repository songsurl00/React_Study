import { Suspense } from 'react';

import { useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>{loadedEvent => <EventItem event={loadedEvent} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>{loadedEvents => <EventsList events={loadedEvents} />}</Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvent = async id => {
  const response = await fetch(`http://localhost:8080/events/` + id);

  if (!response.ok) {
    throw json({ message: '이벤트 상세 정보를 가져오지 못했습니다' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

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

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  return defer({
    event: loadEvent(id),
    events: loadEvents()
  });
};

export const action = async ({ request, params }) => {
  const id = params.eventId;
  const response = await fetch(`http://localhost:8080/events/` + id, {
    method: request.method
  });

  if (!response.ok) {
    // throw json({ message: '이벤트 상세 정보를 가져오지 못했습니다' }, { status: 500 });
    throw new Response(JSON.stringify({ message: '이벤트를 삭제하지 못했습니다.' }), { status: 500 });
  }
  return redirect('/events');
};
