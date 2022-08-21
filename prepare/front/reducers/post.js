// state
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '하정',
      },
      content: '안녕하세요 #해시태그',
      Images: [
        {
          src: 'https://cdn.pixabay.com/photo/2020/11/04/13/29/white-5712344_1280.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2021/11/14/12/53/ship-6794508_1280.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2022/07/26/03/31/sea-7344974_1280.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'hajung',
          },
          content: '우왕1',
        },
        {
          User: {
            nickname: 'hajung2',
          },
          content: '우왕2',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

//action => 객체
//action이 동적으로 필요하면 action creator 함수 생성
// post 추가
const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

// dummydata
const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: '하정2',
  },
  content: '더미데이터',
  Images: [],
  Comments: [],
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // post 추가 액션이 일어나면 mainPosts에 추가됨.
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    default:
      return state;
  }
};

export default reducer;
