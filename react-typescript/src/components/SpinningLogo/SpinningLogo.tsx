import logo from './logo.svg';
import './SpinningLogo.scss';

const SpinningLogo = () => {
  return (
    <>
      <img src={logo} className="spinning-logo" alt="logo" />
    </>
  );
}

export default SpinningLogo;