import '../styles/Button.css';

export const Button = ({ children, className = '', type = 'button', ...props }) => {
    return (
      <button type={type} className={`button ${className}`} {...props}>
        {children}
      </button>
    );
  };
  
