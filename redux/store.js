import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

// initial states here
const initalState = {};

// store in localstorage
const persistConfig = {
  key: "authentication",
  storage,
};
const PersistReducer = persistReducer(persistConfig, rootReducer);

// middleware
const middleware = [thunk];

// creating store
export const store = createStore(
  PersistReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);
const Persistor = persistStore(store);

store.subscribe(() => {
  console.log(store.getState());
});

// assigning store to next wrapper
const makeStore = () => store;

export { Persistor };
export const wrapper = createWrapper(makeStore);
