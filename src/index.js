import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import App from "./App";

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: "Rose" },
  { id: 2, name: "Tulip" },
  { id: 3, name: "Oak" },
];

function* rootSaga() {
  yield takeLatest("GET_LIST", getPlantList);
  yield takeLatest("ADD_PLANT", addPlant);
  yield takeLatest("REMOVE_PLANT", removePlant);
}

const plantListReducer = (state = [{ name: "rose" }], action) => {
  console.log(action);
  switch (action.type) {
    case "SET_LIST":
      return action.payload;
    default:
      return state;
  }
};

//get function
function* getPlantList() {
  try {
    const plantList = yield axios.get("/api/plant");
    console.log(plantList);
    yield put({ type: "SET_LIST", payload: plantList.data });
    console.log('tried to set')
  } catch (error) {
    console.log("error fetching elements", error);
  }
}

//post function
function* addPlant(action) {
  try {
    yield axios.post("/api/plant", action.payload);
    yield put({ type: "GET_LIST" });
  } catch (error) {
    console.log("error posting an element", error);
  }
}

//delete function
function* removePlant(action) {
  console.log(action);
  try {
    yield axios.delete(`/api/plant/${action.payload}`);
    yield getPlantList();
  } catch (error) {
    console.log("error with deleting an element", error);
  }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantListReducer }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
