import { useContext } from 'react';

import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartItem from './CartItem';

const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleCloseCart = () => {
    hideCart();
  };

  const handleGoToCheckout = () => {
    showCheckout();
  };

  return (
    <Modal
      className='cart'
      open={progress === 'cart'}
      onClose={progress === 'cart' ? handleCloseCart : null}
    >
      <h2>장바구니</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          닫기
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>결제하기</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
