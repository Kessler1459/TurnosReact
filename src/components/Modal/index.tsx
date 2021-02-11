import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = (props: {
    modalContent: JSX.Element,
    hide: () => void,
    isShowing: boolean
}) =>
    props.isShowing
        ? ReactDOM.createPortal(
              <>
                  <div className={styles.modaloverlay} />
                  <div
                      className={styles.modalwrapper}
                      aria-modal
                      aria-hidden
                      tabIndex={-1}
                      role="dialog"
                  >
                      <div className={styles.modal}>
                          <div className={styles.modalheader}>
                              <button
                                  type="button"
                                  className={styles.modalclosebutton}
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={props.hide}
                              >
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className={styles.modalBody}>
                          {props.modalContent}
                          </div>
                      </div>
                  </div>
              </>,
              document.body
          )
        : null;

export default Modal;
