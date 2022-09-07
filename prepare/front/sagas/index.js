import { all, fork } from 'redux-saga/effects';
// all: 동시에 실행할 수 있게, fork: 비동기 함수 호출, call: 동기 함수 호출, put: dispatch
// tack: 일회용성이라 while로 감싸준다 => takeEvery로 대체 => 중복클릭 했을 때 마지막 한번만 실행(takeLatest),
// effects 앞에 yield를 주로 붙여주는데 이는 테스트 하기 위함.
import userSaga from './user';
import postSaga from './post';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
