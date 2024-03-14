

const InputTexte= ({type, value, name, label, handleChange}) => (
        <div className="form-group">
          <label id={name}>{label}</label>
          <input
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
          />
        </div>
);
  
export default InputTexte;