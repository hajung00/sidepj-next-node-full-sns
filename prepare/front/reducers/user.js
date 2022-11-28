import produce from 'immer';

// state
export const initialState = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  loadmyInfoLoading: false,
  loadmyInfoDone: false,
  loadmyInfoError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNickNameLoading: false, // 닉네임 바꾸기
  changeNickNameDone: false,
  changeNickNameError: null,
  followLoading: false, // follow 시도중
  followUpDone: false,
  followUpError: null,
  unfollowLoading: false, // unfollow 시도중
  unfollowDone: false,
  unfollowError: null,
  loadFollowingsLoading: false, // loadfollowings시도중
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false, // loadfollowers 시도중
  loadFollowersDone: false,
  loadFollowersError: null,
  removeFollowerLoading: false, // removefollower 시도중
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  userInfo: null,
  profileImg: [],
  uploadProfileImagesLoading: false, // removefollower 시도중
  uploadProfileImagesDone: false,
  uploadProfileImagesError: null,
};

// 오타 방지용(변수 선언)
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const CHANGE_PROFILE_REQUEST = 'CHANGE_PROFILE_REQUEST';
export const CHANGE_PROFILE_SUCCESS = 'CHANGE_PROFILE_SUCCESS';
export const CHANGE_PROFILE_FAILURE = 'CHANGE_PROFILE_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const UPLOAD_PROFILEIMAGES_REQUEST = 'UPLOAD_PROFILEIMAGES_REQUEST';
export const UPLOAD_PROFILEIMAGES_SUCCESS = 'UPLOAD_PROFILEIMAGES_SUCCESS';
export const UPLOAD_PROFILEIMAGES_FAILURE = 'UPLOAD_PROFILEIMAGES_FAILURE';

// User에 내가 쓴 게시물 정보 들어있는데 post를 작성해 추가된것을 user에서 받아오기 위한 액션.
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// action creator (액션을 만드는 함수를 생성: 동적액션, 액션생성기라고함. )
// 로그인 액션
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

// 로그아웃 액션
export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  };
};

// 회원가입 액션
export const signUpRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

// reducer
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UPLOAD_PROFILEIMAGES_REQUEST:
        draft.uploadProfileImagesLoading = true;
        draft.uploadProfileImagesError = null;
        draft.uploadProfileImagesDone = false;
        break;

      case UPLOAD_PROFILEIMAGES_SUCCESS:
        draft.uploadProfileImagesLoading = false;
        draft.uploadProfileImagesDone = true;
        draft.profileImg = action.data;
        break;

      case UPLOAD_PROFILEIMAGES_FAILURE:
        draft.uploadProfileImagesLoading = false;
        draft.uploadProfileImagesError = action.error;
        break;

      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;

      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data;
        break;

      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;

      // loadmyinfo
      case LOAD_MY_INFO_REQUEST:
        draft.loadmyInfoLoading = true;
        draft.loadmyInfoError = null;
        draft.loadmyInfoDone = false;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadmyInfoLoading = false;
        draft.loadmyInfoDone = true;
        draft.me = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.loadmyInfoLoading = false;
        draft.loadmyInfoError = action.error;
        break;

      // follow
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;

      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.UserId });
        break;

      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      // unfollow
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;

      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (y) => y.id !== action.data.UserId
        );
        break;

      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      // *로그인 액션이 일어났을 때, 로그인 true / user에 id, password
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;

      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      // *로그아웃 액션이 일어났을 때, 로그인 false / user 정보 null로 없애줌.
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;

      // *회원가입
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;

      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.me = null;
        draft.profileImg = [];
        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      // 프로필 변경
      case CHANGE_PROFILE_REQUEST:
        draft.changeNickNameLoading = true;
        draft.changeNickNameError = null;
        draft.changeNickNameDone = false;
        break;

      case CHANGE_PROFILE_SUCCESS:
        draft.me.nickname = action.data.nickname;
        draft.me.image = action.data.image;
        draft.changeNickNameLoading = false;
        draft.changeNickNameDone = true;
        break;

      case CHANGE_PROFILE_FAILURE:
        draft.changeNickNameLoading = false;
        draft.changeNickNameError = action.error;
        break;

      // load followings
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;

      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        draft.me.Followings = action.data;
        break;

      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      // load followers
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;

      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        draft.me.Followers = action.data;
        break;

      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;

      // remove follower
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerError = null;
        draft.removeFollowerDone = false;
        break;

      case REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        draft.me.Followers = draft.me.Followers.filter(
          (y) => y.id !== action.data.UserId
        );
        break;

      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break;

      // *post 추가했을 때 user에 추가
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // return {
      //   ...state.me,
      //   me: {
      //     ...state.me,
      //     Posts: [{ id: action.data }, ...state.me.Posts],
      //   },
      // };
      // post 지웠을 때 user에서 삭제
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((y) => y.id !== action.data);
        break;
      // return {
      //   ...state.me,
      //   me: {
      //     ...state.me,
      //     Posts: state.me.Posts.filter((y) => y.id !== action.data),
      //   },
      // };

      // reducer 초기화 할때 default설정 안해주면 undifinde로 에러뜸
      default:
        break;
      // return state;
    }
  });
};

export default reducer;
