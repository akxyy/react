import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DestinationState {
  destination_id: number;
}

const initialState: DestinationState = {
  destination_id: 0,
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestinationState: (state, action: PayloadAction<DestinationState>) => {
      state.destination_id = action.payload.destination_id;
    },
  },
});

export const { setDestinationState } = destinationSlice.actions;
export default destinationSlice.reducer;