import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: "events",
    initialState: [],
    reducers: {
        addEvent: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addEvent } = calendarSlice.actions;

export default calendarSlice.reducer;