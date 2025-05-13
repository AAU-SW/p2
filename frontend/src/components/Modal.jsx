import { Button } from './Button.jsx';
import { RxCross2 } from 'react-icons/rx';
export const Modal = ({
  isOpen, // Controls if modal is visible
  onClose, // Function to call when modal is closed
  title, // Title of the modal header
  children, // Content inside the modal
  submitButtonText, // Text for the submit button
}) => {
  return (
    <dialog open={isOpen} className={isOpen ? 'backdrop' : ''}>
      <div className="inputForms">
        <a
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '5px',
            borderBottom: '2px solid black',
            alignItems: 'center',
          }}
        >
          {/* Modal title */}
          {title}
          <Button
            style={{
              border: 'none',
              outline: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'black',
            }}
            onClick={onClose}
          >
            <RxCross2 />
          </Button>
        </a>

        {/* Modal content passed as children */}
        {children}

        <Button type="submit">{submitButtonText}</Button>
      </div>
    </dialog>
  );
};
