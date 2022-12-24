import { call, put } from "redux-saga/effects";

import constants from "../constants";
import Contacts from "../apis/contacts";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export function* login(action: any) {
  yield load("login");
  action.payload.showLoading(true);
  const response: ResponseGenerator = yield call(Contacts.login, action.payload);
  // console.log("res", response);
  if (response.status === 204 || response.status === 200) {
    yield put({
      type: constants("auth").reducers.login.success,
      payload: response.data,
    });
    // window.location.href = '/admin'
    // action.payload.showOtpBox()
    yield unload("login");
    action.payload.showLoading(false);
  } else {
    yield error("login", response, null);
    yield unload("login");
    action.payload.showLoading(false);
    action.payload.showMsg(response?.data?.message || "Something went wrong!");
  }
}



function* error(type: string, response: any, message: any) {
  let status = 0;
  if (response) {
    status = response.status || 0;
  }
  yield put({
    type: constants("auth").reducers[type].error,
    payload: {
      status: status,
      message: message || "We ran into some issues and are looking into it.",
    },
  });
}

function* load(type: any) {
  yield put({
    type: constants("auth").reducers[type].load,
  });
}

function* unload(type: any) {
  yield put({
    type: constants("auth").reducers[type].unload,
  });
}
