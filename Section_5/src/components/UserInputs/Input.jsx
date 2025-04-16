const Input = ({ children }) => {
  return (
    <p>
      <label>{children}</label>
      <input type='number' required/>
    </p>
  );
};

export default Input;
