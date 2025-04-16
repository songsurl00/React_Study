import { useRef } from 'react';

import Input from './Input';
import Modal from './Modal';

const NewProject = ({ onAdd, onCancel }) => {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const handleSave = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    });
  };

  return (
    <>
      <Modal ref={modal} buttonCaption='확인'>
        <h2 className='text-xl font-bold text-stone-700 my-4'>유효하지 않은 입력입니다</h2>
        <p className='text-stone-600 mb-4'>어머... 입력을 하지 않으셨어요</p>
        <p className='text-stone-600 mb-4'>모든 입력창에 유효한 값을 입력해주세요</p>
      </Modal>
      <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button className='text-stone-800 hover:text-stone-950' onClick={onCancel}>
              취소
            </button>
          </li>
          <li>
            <button className='px-6 py-2 rounded bg-stone-800 text-stone-50 hover:bg-stone-950' onClick={handleSave}>
              저장
            </button>
          </li>
        </menu>
        <div>
          <Input type='text' ref={title} label='제목' />
          <Input ref={description} label='설명' textarea />
          <Input type='date' ref={dueDate} label='기간' />
        </div>
      </div>
    </>
  );
};

export default NewProject;
