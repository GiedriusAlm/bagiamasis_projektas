import React from 'react';
import { StyledOverlay } from './styles';

const modal = () => {
  return (
    <>
      <StyledOverlay></StyledOverlay>
      <div className='modal-container'>
        <div className='modal-content'>Modal</div>
      </div>
    </>
  );
};

export default modal;
