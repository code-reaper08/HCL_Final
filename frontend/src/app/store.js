import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import TaskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: TaskReducer,
  },
});
