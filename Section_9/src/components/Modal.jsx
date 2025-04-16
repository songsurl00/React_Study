import { createPortal } from 'react-dom';
import { useImperativeHandle, useRef } from 'react';
import Button from './Button';

const Modal = ({ ref, children, buttonCaption }) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    }
  }));

  return createPortal(
    <dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-sm shadow-sm'>
      {children}
      <form method='dialog' className='mt-4 text-right'>
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
};

export default Modal;
