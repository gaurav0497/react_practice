import { takeLatest } from "redux-saga/effects";

import { login, logout, signUp } from "./auth";

import constants from "../constants";

function* sagas() {
  yield takeLatest(constants("auth").sagas.login, login);
  yield takeLatest(constants("auth").sagas.signUp, signUp);
  yield takeLatest(constants("auth").sagas.logout, logout);
}

export default sagas;
