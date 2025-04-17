import { useContext, useActionState } from 'react';

import Modal from './UI/Modal';
import Input from './UI/Input';
import Error from './UI/Error';

import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    'http://localhost:3000/orders',
    requestConfig
  );

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleClose = () => {
    hideCheckout();
  };

  const handleFinish = () => {
    hideCheckout();
    clearCart();
    clearData();
  };

  const checkoutAction = async (prevState, fd) => {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData
        }
      })
    );
  };

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        닫기
      </Button>
      <Button>주문하기</Button>
    </>
  );

  if (isSending) {
    actions = <span>데이터를 보내는 중...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleFinish}>
        <h2>성공!</h2>
        <p>주문이 완료되었습니다.</p>
        <p>세부 주문 정보는 이메일에서 확인하실 수 있습니다.</p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>확인</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'checkout'} onClose={handleClose}>
      <form action={formAction}>
        <h2>결제하기</h2>
        <p>총 금액: {currencyFormatter.format(cartTotal)}</p>
        <Input type='text' label='이름' id='name' />
        <Input type='email' label='이메일' id='email' />
        <Input type='text' label='스트리트' id='street' />
        <div className='control-row'>
          <Input type='text' label='우편변호' id='postal-code' />
          <Input type='text' label='도시' id='city' />
        </div>

        {error && (
          <Error title='데이터를 보내는데 실패했습니다' message={error} />
        )}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
