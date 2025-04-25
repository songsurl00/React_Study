import { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ id, signal })
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeletion,
    error: deletionError
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
      navigate('/events');
    }
  });

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  const handleDelete = () => {
    mutate({ id });
  };

  let content;

  if (isPending) {
    content = (
      <div id='event-details-content' className='center'>
        <p>데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div>
        isError && (
        <ErrorBlock
          title='데이터를 불러오는 데 실피했습니다.'
          message={
            error.info?.message ||
            '데이터를 가져오는 데 실패했습니다. 잠시 후에 다시 시도해주세요'
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to='edit'>Edit</Link>
          </nav>
        </header>
        <div id='event-details-content'>
          <img src={`http://localhost:3000/${data.image}`} alt='' />
          <div id='event-details-info'>
            <div>
              <p id='event-details-location'>{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id='event-details-description'>{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>정말?</h2>
          <p>정말 삭제하시겠습니까?</p>
          <div className='form-actions'>
            {isPendingDeletion && <p>삭제 중...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className='button-text'>
                  취소
                </button>
                <button onClick={handleDelete} className='button'>
                  삭제
                </button>
              </>
            )}
          </div>
          {isErrorDeletion && (
            <ErrorBlock
              title='삭제에 실피했습니다'
              message={deletionError.info?.message || '삭제 실패'}
            />
          )}
        </Modal>
      )}

      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>
      <article id='event-details'>{content}</article>
    </>
  );
}
