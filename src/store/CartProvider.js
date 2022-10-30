import { useReducer } from 'react';
import CartContext from './context-cart';

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const filteredUniqueItems = state.items.filter((item) => {
      return item.id !== action.item.id;
    });
    const filteredSameItems = state.items.filter((item) => {
      return item.id === action.item.id;
    });
    const addedItem = { ...action.item };
    if (filteredSameItems.length) {
      addedItem.amount += filteredSameItems[0].amount;
    }

    const updatedItems = filteredUniqueItems.concat(addedItem);
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
