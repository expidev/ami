import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmationModal.module.css';

const modalRoot = document.getElementById('modal-root');

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, children }) => {
  const modalContent = (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          {children}
          <div className={styles.modalButtons}>
            <button className={styles.cancelButton} onClick={onCancel}>Annuler</button>
            <button className={styles.confirmationButton} onClick={onConfirm}>Confirmer</button>
          </div>
        </div>
      </div>
    )
  );

  return ReactDOM.createPortal(
    modalContent,
    modalRoot
  );
};

export default ConfirmationModal;
