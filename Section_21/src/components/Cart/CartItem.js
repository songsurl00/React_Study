import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
  const { id, title, quantity, totalPrice, price } = item;

  const dispatch = useDispatch();

  const addItemHandler = (params) => {
    dispatch(cartActions.addItemToCart(item));
  };

  const removeItemHandler = (params) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
