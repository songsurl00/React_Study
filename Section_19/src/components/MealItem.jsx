import { useContext } from 'react';

import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

const MealItem = ({ meal }) => {
  const { addItem } = useContext(CartContext);
  const { name, price, description, image } = meal;

  const handleAddMealToCart = () => {
    addItem(meal);
  };

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className='meal-item-price'>{currencyFormatter.format(price)}</p>
          <p className='meal-item-description'>{description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMealToCart}>카트에 담기</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
