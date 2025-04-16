import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingHotelState {
  hotelName: string;
  pricePerNight: number;
}

const initialState: BookingHotelState = {
  hotelName: "",
  pricePerNight: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setHotelDetails: (state, action: PayloadAction<BookingHotelState>) => {
      state.hotelName = action.payload.hotelName;
      state.pricePerNight = action.payload.pricePerNight;
    },
    resetHotelDetails: () => initialState,
  },
});

export const { setHotelDetails, resetHotelDetails } = bookingSlice.actions;
export default bookingSlice.reducer;