import React from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

function NodeBird({ Component }) {
  return (
    <>
      <Head>
        <meta charSet='_utf-8' />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
