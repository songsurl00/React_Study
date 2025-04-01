import NewTask from './NewTask';

const Tasks = ({ tasks, onAdd, onDelete }) => {
  return (
    <section>
      <h2 className='text-2xl font-bold text-stone-700 mb-4'>테스크</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && <p className='text-stone-800 my-4'>이 프로젝트는 아무것도 가지고 있지 않습니다</p>}
      {tasks.length > 0 && (
        <ul className='p-4 mt-8 rounded-md bg-stone-100'>
          {tasks.map(task => (
            <li key={task.id} className='flex justify-between my-4'>
              <span>{task.text}</span>
              <button className='text-stone-700 hover:text-red-500' onClick={() => onDelete(task.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
