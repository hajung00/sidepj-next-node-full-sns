// state
export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

// action creator (액션을 만드는 함수를 생성: 동적액션, 액션생성기라고함. )
// 로그인 액션
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};

// 로그아웃 액션
export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 로그인 액션이 일어났을 때, 로그인 true / user에 id, password
    case 'LOG_IN':
      return {
        ...state, // user 객체 spread
        isLoggedIn: true,
        me: action.data,
      };
    // 로그아웃 액션이 일어났을 때, 로그인 false / user 정보 null로 없애줌.
    case 'LOG_OUT':
      return {
        ...state, // user 객체 spread
        isLoggedIn: false,
        me: null,
      };
    // reducer 초기화 할때 default설정 안해주면 undifinde로 에러뜸
    default:
      return state;
  }
};

export default reducer;
