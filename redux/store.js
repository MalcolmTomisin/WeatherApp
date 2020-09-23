import { configureStore } from "@reduxjs/toolkit";
import { weatherStateReducer } from './reducers';

const store = configureStore({ reducer: weatherStateReducer });
