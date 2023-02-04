import shortId from 'shortid'; // 겹치기 힘든 id 생성해줌
import produce from 'immer'; // 불변성 지켜주는 라이브러리
import { faker } from '@faker-js/faker';

// state
export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  hashTag: [],
  hashTagPosts: [],
  accuseMessage: '',
  accuseMessageReset: false,
  likePostLoading: false,
  likePostError: null,
  likePostDone: false,
  unlikePostLoading: false,
  unlikePostError: null,
  unlikePostDone: false,
  hasMorePosts: true,
  postAdded: false,
  loadPostLoading: false,
  loadPostError: null,
  loadPostDone: false,
  loadPostsLoading: false,
  loadPostsError: null,
  loadPostsDone: false,
  addPostLoading: false,
  addPostError: null,
  addPostDone: false,
  removePostLoading: false,
  removePostError: null,
  removePostDone: false,
  addCommentLoading: false,
  addCommentError: null,
  addCommentDone: false,
  uploadImagesLoading: false,
  uploadImagesError: null,
  uploadImagesDone: false,
  retweetLoading: false,
  retweetError: null,
  retweetDone: false,
  removeCommentLoading: false,
  removeCommentError: null,
  removeCommentDone: false,
  editContentLoading: false,
  editContentError: null,
  editContentDone: false,
  accusePostLoading: false,
  accusePostError: null,
  accusePostDone: false,
  hashTagLoading: false,
  hashTagError: null,
  hashTagDone: false,
};

//action => 객체
//action이 동적으로 필요하면 action creator 함수 생성

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

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

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const EDIT_CONTENT_REQUEST = 'EDIT_CONTENT_REQUEST';
export const EDIT_CONTENT_SUCCESS = 'EDIT_CONTENT_SUCCESS';
export const EDIT_CONTENT_FAILURE = 'EDIT_CONTENT_FAILURE';

export const LOAD_RELATIVE_POSTS_REQUEST = 'LOAD_RELATIVE_POSTS_REQUEST';
export const LOAD_RELATIVE_POSTS_SUCCESS = 'LOAD_RELATIVE_POSTS_SUCCESS';
export const LOAD_RELATIVE_POSTS_FAILURE = 'LOAD_RELATIVE_POSTS_FAILURE';

export const ACCUSE_POST_REQUEST = 'ACCUSE_POST_REQUEST';
export const ACCUSE_POST_SUCCESS = 'ACCUSE_POST_SUCCESS';
export const ACCUSE_POST_FAILURE = 'ACCUSE_POST_FAILURE';

export const LOAD_HASHTAG_REQUEST = 'LOAD_HASHTAG_REQUEST';
export const LOAD_HASHTAG_SUCCESS = 'LOAD_HASHTAG_SUCCESS';
export const LOAD_HASHTAG_FAILURE = 'LOAD_HASHTAG_FAILURE';

export const ACCUSE_MESSAGE_REQUEST = 'ACCUSE_MESSAGE_REQUEST';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// reducer
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_HASHTAG_REQUEST:
        draft.hashTagLoading = true;
        draft.hashTagError = null;
        draft.hashTagDone = false;
        break;
      case LOAD_HASHTAG_SUCCESS: {
        draft.hashTag = action.data;
      }
      case LOAD_HASHTAG_FAILURE:
        draft.hashTagLoading = false;
        draft.hashTagError = action.error;
        break;

      case ACCUSE_POST_REQUEST:
        draft.accusePostLoading = true;
        draft.accusePostError = null;
        draft.accusePostDone = false;
        break;
      case ACCUSE_POST_SUCCESS: {
        if (action.data.UserId) {
          draft.accusePostLoading = false;
          draft.accusePostDone = true;
          const post = draft.mainPosts.find((y) => y.id === action.data.PostId);
          draft.accuseMessage = `postId: ${post.id}글을 ${action.data.Nickname}님이 신고하였습니다.`;
          draft.accuseMessageReset = true;
          break;
        } else {
          draft.accusePostLoading = false;
          draft.accusePostDone = true;
          draft.mainPosts = draft.mainPosts.filter(
            (y) => y.id !== action.data.PostId
          );
          break;
        }
      }

      case ACCUSE_POST_FAILURE:
        draft.accusePostLoading = false;
        draft.accusePostError = action.error;
        break;

      case ACCUSE_MESSAGE_REQUEST:
        {
          draft.accuseMessage = '';
          draft.accuseMessageReset = false;
        }
        break;

      case LOAD_RELATIVE_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsError = null;
        draft.loadPostsDone = false;
        break;
      case LOAD_RELATIVE_POSTS_SUCCESS: {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      }
      case LOAD_RELATIVE_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case EDIT_CONTENT_REQUEST:
        draft.editContentLoading = true;
        draft.editContentError = null;
        draft.editContentDone = false;
        break;
      case EDIT_CONTENT_SUCCESS:
        const post = draft.mainPosts.find((y) => y.id === action.data.PostId);
        post.content = action.data.content;
        draft.editContentLoading = false;
        draft.editContentDone = true;
        break;
      case EDIT_CONTENT_FAILURE:
        draft.editContentLoading = false;
        draft.editContentError = action.error;
        break;

      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentError = null;
        draft.removeCommentDone = false;
        break;
      case REMOVE_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((y) => y.id === action.data.PostId);
        post.Comments = post.Comments.filter(
          (y) => y.id !== action.data.commentId
        );
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      }

      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostError = null;
        draft.loadPostDone = false;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetError = null;
        draft.retweetDone = false;
        break;
      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;

      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesError = null;
        draft.uploadImagesDone = false;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;

      // case LOAD_HASHTAG_POSTS_SUCCESS:
      //   draft.loadPostsLoading = false;
      //   draft.loadPostsDone = true;
      //   draft.hashTagPosts = action.data;
      //   draft.hasMorePosts = action.data.length === 10;
      //   break;

      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsError = null;
        draft.loadPostsDone = false;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
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
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
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
        draft.mainPosts = draft.mainPosts.filter(
          (y) => y.id !== action.data.PostId
        );
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
        const post = draft.mainPosts.find((y) => y.id === action.data.PostId);
        post.Comments.unshift(action.data);
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

      // *like
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostError = null;
        draft.likePostDone = false;
        break;
      case LIKE_POST_SUCCESS: {
        // action.data=> PostId, UserId
        const post = draft.mainPosts.find((y) => y.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      // *unlike
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostError = null;
        draft.unlikePostDone = false;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((y) => y.id === action.data.PostId);
        post.Likers = post.Likers.filter((y) => y.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      default:
        break;
      // return state;
    }
  });
};

export default reducer;
