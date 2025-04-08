import '../styles/Popup.css';

export const Popup = ({ children, close }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div>
          <button onClick={close}>X</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};
