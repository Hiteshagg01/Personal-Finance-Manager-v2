import Backdrop from "./Backdrop";
import "./Modal.css";

const Modal = ({ showModal = false, toggle, children }) => {

    if (!showModal) {
        document.body.classList.remove("active-overlay");
    }

    return (
        showModal && (
            <div className="modal">
                <Backdrop isShown={showModal} toggle={toggle} />

                <div className="modal-content">
                    {children}
                    <button
                        type="button"
                        title="Close"
                        className="close-modal"
                        onClick={toggle}
                    >
                        ✖️
                    </button>
                </div>
            </div>
        )
    );
};

export default Modal;
