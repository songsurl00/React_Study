import MealItem from './MealItem';

import useHttp from '../hooks/useHttp';
import Error from './UI/Error';

const requestConfig = {};

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p className='center'>데이터를 가져오는 중...</p>;
  }

  if (error) {
    return <Error title='음식들을 가져오는데 실패했습니다' message={error} />;
  }

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
