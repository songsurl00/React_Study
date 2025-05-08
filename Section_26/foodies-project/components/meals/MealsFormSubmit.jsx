'use client';

import { useFormStatus } from 'react-dom';

const MealsFormSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? '제출중...' : 'Share Meal'}</button>
  );
};

export default MealsFormSubmit;
