import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-d2107-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('데이터를 가져오는 데 실패했습니다!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: '에러!!',
          message: '카트 데이터를 보내는데 실패했습니다.'
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: '보내는 중...',
        message: '카트 데이터를 보내는 중...'
      })
    );

    const sendRequest = async (params) => {
      const response = await fetch(
        'https://react-http-d2107-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          })
        }
      );

      if (!response.ok) {
        throw new Error('카트 데이터를 보내는데 실패했습니다.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: '성공!',
          message: '카트 데이터를 보내는데 성공했습니다.'
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: '에러!!',
          message: '카트 데이터를 보내는데 실패했습니다.'
        })
      );
    }
  };
};
