import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './Loading.css';

const Loading = () => {
  return (
    <div>loading...
    <FontAwesome
        className='animated circular infinite'
        name='spinner'
        size='2x'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    </div>
  )
}

export default Loading;