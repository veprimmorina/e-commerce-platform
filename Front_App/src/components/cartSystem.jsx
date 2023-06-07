import { createSlice } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";

const initialState = {
  cart: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSystem = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const find = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const actual = state.cart
        .filter((item) => item.id === action.payload.id)
        .reduce((total, item) => total + item.quantity, 0);

      console.log("test", action.payload.productDetails.quantity, actual);
      if (actual === action.payload.productDetails.quantity) {
        toast.error(
          "You have reached the maxiumum of order for this product!",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        <ToastContainer />;
      } else if (find !== -1) {
        toast.success("Product quantity added on cart!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        state.cart[find].quantity += 1;
        state.totalPrice += action.payload.productPrice;
      } else {
        toast.success("Added on cart!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        state.totalPrice += action.payload.productPrice;
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    RemoveCart: (state, action) => {
      const find = state.cart.findIndex((item) => item.id === action.payload);
      if (find !== -1) {
        const removedItem = state.cart[find];
        state.cart.splice(find, 1);
        state.totalPrice -= removedItem.productPrice * removedItem.quantity;
      }
    },

    IncreaseQuantity: (state, action) => {
      const find = state.cart.findIndex((item) => item.id === action.payload);
      if (find !== -1) {
        const increasedItem = state.cart[find];

        state.cart[find].quantity += 1;
        state.totalPrice += increasedItem.productPrice;
      }
    },
    DecreaseQuantity: (state, action) => {
      const find = state.cart.findIndex((item) => item.id === action.payload);
      if (find !== -1) {
        if (state.cart[find].quantity === 1) {
          const decreasedProduct = state.cart[find];
          state.cart.splice(find, 1);
          state.totalPrice -= decreasedProduct.productPrice;
        } else {
          const decreasedProduct = state.cart[find];
          state.cart[find].quantity -= 1;
          state.totalPrice -= decreasedProduct.productPrice;
        }
      }
    },
  },
});

export const { AddCart, RemoveCart, IncreaseQuantity, DecreaseQuantity } =
  cartSystem.actions;
export default cartSystem.reducer;
