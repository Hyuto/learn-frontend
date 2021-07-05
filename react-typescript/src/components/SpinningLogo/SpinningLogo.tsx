import React from 'react';
import logo from './logo.svg';
import './SpinningLogo.scss';

const SpinningLogo: React.FC = () => {
  return (
    <>
      <img src={logo} className="spinning-logo" alt="logo" />
    </>
  );
}

export default SpinningLogo;