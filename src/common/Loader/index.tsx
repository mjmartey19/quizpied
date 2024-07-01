import { CSSProperties } from 'react';
import Logo from '../../images/logo/logo.png';

const Loader = () => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(80deg, #1e1e1e, #444)',
    overflow: 'hidden',
  };

  const logoContainerStyle: CSSProperties = {
    position: 'relative' as 'relative', // Cast to 'relative' to satisfy TypeScript
    animation: 'spin 3s infinite linear',
  };

  const logoStyle: CSSProperties = {
    width: '200px',
    animation: 'bounce 2s infinite',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
          }
        `}
      </style>
      <div style={logoContainerStyle}>
        <img style={logoStyle} src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Loader;
