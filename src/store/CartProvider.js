import { useReducer } from 'react';
import CartContext from './context-cart';

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const filteredItems = state.items.filter((item) => {
      return item.id !== action.item.id;
    });
    const prevItem = state.items.filter((item) => {
      return item.id === action.item.id;
    })[0];

    const newItem = {
      ...action.item,
    };

    if (prevItem) {
      newItem.amount += prevItem.amount;
    }

    const updatedItems = filteredItems.concat(newItem);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    return {};
  }
  return { items: state.items, totalAmount: state.totalAmount };
};

const defaultCartState = { items: [], totalAmount: 0 };

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
