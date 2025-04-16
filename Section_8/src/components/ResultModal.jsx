import { useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = ({ ref, targetMime, remainingTime, onReset }) => {
  const dialogRef = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetMime * 1000)) * 100);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
    }
  }));

  return createPortal(
    <dialog ref={dialogRef} className='result-modal' onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        the target time was <strong>{targetMime} seconds.</strong>
      </p>
      <p>
        타이머를 <strong>{formattedRemainingTime} 초 남기고</strong> 멈췄어요.
      </p>
      <form method='dialog' onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
};

export default ResultModal;
