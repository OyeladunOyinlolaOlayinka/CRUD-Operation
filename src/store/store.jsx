import { configureStore } from "@reduxjs/toolkit";
import RecordSlice from "./RecordSlice";

export const store = configureStore({
    reducer: {
        records: RecordSlice,
    }
})