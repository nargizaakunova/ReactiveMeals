import { useReducer } from 'react';
import CartContext from './context-cart';

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      items: [...state.items, action.item],
      totalAmount: state.totalAmount + action.item.amount * action.item.price,
    };
  }
  if (action.type === 'REMOVE') {
    return {};
  }
  return { items: state.items, totalAmount: state.totalAmount };
};
const defaultCartState = { items: [], totalAmount: [] };
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCardHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemFromCardHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
