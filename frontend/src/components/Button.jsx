import '../styles/Button.css';

export const Button = ({ label, onClick }) => {
  return (
    <button className="button" onClick={() => onClick()}>
      {label}
    </button>
  );
};
