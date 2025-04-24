import { Button } from '../components/Button';
import { RxCross2 } from "react-icons/rx";
export const Modal = ({
    isOpen,                // Controls if modal is visible
    onClose,               // Function to call when modal is closed
    title,                 // Title of the modal header
    onSubmit,              // Form submission handler
    children,              // Content inside the modal
    submitButtonText       // Text for the submit button
  }) => {
    return (
        <dialog open={isOpen} className={isOpen ? "backdrop" : ""}>
            <form className="inputForms" onSubmit={onSubmit}>
                <a className="form-header">
                    {title}
                    <button style={{ border: 'none', outline: 'none', background: 'none', cursor: 'pointer'}} onClick={onClose}>
                        <RxCross2 />
                    </button>
                </a>

                {/* Modal content passed as children */}
                {children}

                <Button label= {submitButtonText || "Submit"} />
            </form>
        </dialog>
    )
}