import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

// 해시태그 분별 conponent (postData는 post.content)
function PostCardContent({ postData }) {
  return (
    <div>
      {/* 정규식으로 #분별 후 content에 #있으면 #뗀 나머지 부분 링크로 연결 아닌 부분은 그냥 return */}
      {postData.split(/(#[^\s#]+)/g).map((hashtag, i) => {
        if (hashtag.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${hashtag.slice(1)}`} key={i}>
              <a>{hashtag}</a>
            </Link>
          );
        }
        return hashtag;
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};
export default PostCardContent;
