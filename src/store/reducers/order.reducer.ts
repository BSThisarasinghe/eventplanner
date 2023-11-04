import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../models/restaurant-response.model";

interface OrderModel {
  orderDetails: RestaurantData | null;
}

const orderStore = createSlice({
  name: "order-store",
  initialState: {
    orderDetails: null
  } as OrderModel,
  reducers: {
    orderFetchSuccess: (state: OrderModel, action: PayloadAction<RestaurantData>) => {
      return {
        ...state,
        orderDetails: action.payload
      }
    },
    orderFetchFail: (state: OrderModel) => {
      return {
        ...state,
        orderDetails: null
      }
    }
  },
});

export default orderStore;