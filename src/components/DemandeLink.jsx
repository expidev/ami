import React, { useState, useRef } from 'react';
import style from './DemandeLink.module.css';

const EmailComponent = ({ id_ami }) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const handleCopyFallback = (text) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    try {
        // Copy the selected text to the clipboard
        document.execCommand('copy');
        console.log('Text copied to clipboard');
        setCopied(true);
    } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
    } finally {
        // Remove the temporary textarea from the DOM
        document.body.removeChild(textarea);
    }
}; 

  const handleCopy = () => {
    const emailValue = inputRef.current.value;
    if (!navigator.clipboard) {
      navigator.clipboard.writeText(emailValue)
        .then(() => {
          console.log('Text copied to clipboard');
          setCopied(true);
        })
        .catch((error) => {
            console.error('Failed to copy text to clipboard:', error);
            // Fallback to alternative method if clipboard API is not available
            handleCopyFallback(emailValue);
        });
    } else {
        handleCopyFallback(emailValue);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={style.emailComponent}>
      <input
        ref={inputRef}
        className={style.emailInput}
        type="email"
        value={`${window.location.origin}/demande/${encodeURIComponent(id_ami)}`}
        disabled
      />
      <button className={style.copyButton} onClick={handleCopy}>{copied ? 'Copié!' : 'Copier'}</button>
    </div>
  );
};

export default EmailComponent;