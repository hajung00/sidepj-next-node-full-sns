import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';
// all: 동시에 실행할 수 있게, fork: 비동기 함수 호출, call: 동기 함수 호출, put: dispatch
// tack: 일회용성이라 while로 감싸준다 => takeEvery로 대체 => 중복클릭 했을 때 마지막 한번만 실행(takeLatest),
// effects 앞에 yield를 주로 붙여주는데 이는 테스트 하기 위함.
import axios from 'axios';

// 로그인
function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(2000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      //data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      //data: err.response.data,
    });
  }
}

// 로그아웃
function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(2000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      //data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      //data: err.response.data,
    });
  }
}

// 포스트 추가
function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(2000);
    yield put({
      type: 'ADD_POSTS_SUCCESS',
     // data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POSTS_FAILURE',
     // data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}
function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}
export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
