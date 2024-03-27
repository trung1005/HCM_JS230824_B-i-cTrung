import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { taskAction, taskReducer } from "./slices/task.slice";

const RootReducer = combineReducers({
    taskStore: taskReducer
})

export type StoreType = ReturnType<typeof RootReducer>

export const store = configureStore({
    reducer: RootReducer
})

store.dispatch(taskAction.fetchTask())