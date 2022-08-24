import shortId from 'shortid'; // 겹치기 힘든 id 생성해줌
import produce from 'immer'; // 불변성 지켜주는 라이브러리
import { faker } from '@faker-js/faker';

// state
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  postAdded: false,
  loadPostLoading: false,
  loadPostError: null,
  loadPostDone: false,
  addPostLoading: false,
  addPostError: null,
  addPostDone: false,
  removePostLoading: false,
  removePostError: null,
  removePostDone: false,
  addCommentLoading: false,
  addCommentError: null,
  addCommentDone: false,
};
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.internet.userName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.cats(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.firstName(),
          },
          content: faker.lorem.paragraph(),
        },
      ],
    }));

//action => 객체
//action이 동적으로 필요하면 action creator 함수 생성
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

// post 추가
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// post dummydata
const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    nickname: '하정2',
  },
  content: data.content,
  Images: [],
  Comments: [],
});

// comment dummydata
const dummyComment = (data) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    nickname: 'hajung',
  },
  content: data,
});

// reducer
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostError = null;
        draft.loadPostDone = false;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      // *post 추가 액션이 일어나면 mainPosts에 추가됨.
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      // return {
      //   ...state,
      //   addPostLoading: true,
      //   addPostError: null,
      //   addPostDone: false,
      // };
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      // return {
      //   ...state,
      //   addPostLoading: false,
      //   addPostDone: true,
      //   mainPosts: [dummyPost(action.data), ...state.mainPosts],
      // };
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      // *remove post
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostError = null;
        draft.removePostDone = false;
        break;

      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((y) => y.id !== action.data);
        break;
      // return {
      //   ...state,
      //   removePostLoading: false,
      //   removePostDone: true,
      //   mainPosts: state.mainPosts.filter((y) => y.id !== action.data),
      // };
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      // *add comment
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        draft.addCommentDone = false;
        break;

      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((y) => y.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // action.data.content, postId, userId
        // 불변성 유지하면서 comment add
        // postId를 찾고 거기에 comment 추가
        // const postIndex = state.mainPosts.findIndex(
        //   (y) => y.id === action.data.postId
        // ); // 댓글을 작성하려는 게시글 id와 같은 id를 mainPsots에서 찾기
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
      // return state;
    }
  });
};

export default reducer;
