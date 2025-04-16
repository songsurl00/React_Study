import { useState } from 'react';

const NewTask = ({ onAdd, onDelete }) => {
  const [enteredTask, setEnteredTask] = useState('');

  const handleChange = event => {
    setEnteredTask(event.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === '') {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask('');
  };

  return (
    <div className='flex items-center gap-4'>
      <input
        type='text'
        className='w-62 px-2 py-1 rounded-sm bg-stone-200'
        onChange={handleChange}
        value={enteredTask}
      />
      <button className='text-stone-700 hover:text-stone-950' onClick={handleClick}>
        할 일 추가
      </button>
    </div>
  );
};

export default NewTask;
