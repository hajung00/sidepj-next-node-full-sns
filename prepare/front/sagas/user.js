import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHANGE_PROFILE_REQUEST,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  UPLOAD_PROFILEIMAGES_REQUEST,
  UPLOAD_PROFILEIMAGES_SUCCESS,
  UPLOAD_PROFILEIMAGES_FAILURE,
  LOAD_ALLUSER_REQUEST,
  LOAD_ALLUSER_SUCCESS,
  LOAD_ALLUSER_FAILURE,
} from '../reducers/user';
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowings);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadmyInfo);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchProfile() {
  yield takeLatest(CHANGE_PROFILE_REQUEST, changeProfile);
}
function* watchLoadProfileImages() {
  yield takeLatest(UPLOAD_PROFILEIMAGES_REQUEST, loadProfileImages);
}
function* watchUnFollowList() {
  yield takeLatest(LOAD_ALLUSER_REQUEST, unfollowList);
}

//
function unfollowListAPI(lastId_list) {
  console.log('lastID', lastId_list);
  return axios.get(`/user/lists?lastId=${lastId_list || 3}`);
}
function* unfollowList(action) {
  try {
    const result = yield call(unfollowListAPI, action.lastId_list);
    yield put({
      type: LOAD_ALLUSER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ALLUSER_FAILURE,
      error: err.response.data,
    });
  }
}

// loadProfileImages
function loadProfileImagesAPI(data) {
  console.log(data);
  return axios.post('/user/images', data);
}
function* loadProfileImages(action) {
  try {
    const result = yield call(loadProfileImagesAPI, action.data);
    yield put({
      type: UPLOAD_PROFILEIMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_PROFILEIMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

// loadFollowers
function loadFollowersAPI(data) {
  return axios.get('/user/followers', data);
}
function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

// loadFollowings
function loadFollowingsAPI(data) {
  return axios.get('/user/followings', data);
}
function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

// loadmyInfo
function loadmyInfoAPI() {
  return axios.get('/user');
}
function* loadmyInfo() {
  try {
    const result = yield call(loadmyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// loadUser
function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}
function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// 팔로우
function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// 언팔로우
function unFollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// removefollower
function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그인
function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
function logOutAPI() {
  return axios.post('user/logout');
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// changenickname
function changeProfileAPI(data) {
  console.log(data);
  return axios.patch('/user/profile', data);
}

function* changeProfile(action) {
  try {
    const result = yield call(changeProfileAPI, action.data);
    console.log(result);
    yield put({
      type: CHANGE_PROFILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_PROFILE_FAILURE,
      error: err.response.data,
    });
  }
}

// 회원가입
function signUpAPI(data) {
  console.log(data);
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchProfile),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchLoadProfileImages),
    fork(watchUnFollowList),
  ]);
}
