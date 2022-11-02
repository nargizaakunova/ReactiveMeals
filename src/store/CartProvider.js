import { useReducer } from 'react';
import CartContext from './context-cart';

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: action.item.amount + existingCartItem.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    // 1. Find existing items by index
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    // 2. Recount total amount
    const updatedAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    // 3. If existing item is 1, filter by returning only unique, which will delete the last item as the result
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      // 4. If not 1, reduce by 1, update items and update amount of existing item
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // 5. Return updated amount and updated items
    return {
      totalAmount: updatedAmount,
      items: updatedItems,
    };
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
