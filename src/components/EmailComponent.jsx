import React, { useState, useRef } from 'react';
import style from './EmailComponent.module.css';

const EmailComponent = ({ id_ami }) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const handleCopy = () => {
    const emailValue = inputRef.current.value;
    navigator.clipboard.writeText(emailValue);
    setCopied(true);
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
        value={`${window.location.origin}/demande/${id_ami}`}
        disabled
      />
      <button className={style.copyButton} onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
    </div>
  );
};

export default EmailComponent;