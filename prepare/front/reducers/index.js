import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from '../reducers/user';
import post from '../reducers/post';

// reducer  = (이전상태, 액션) => 다음상태
// reducer은 함수이기 때문에 combineReducer로 합쳐줌.
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
};
export default rootReducer;
