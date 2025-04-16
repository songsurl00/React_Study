import Input from './Input';

const InputGroup = ({ inputList }) => {
  return (
    <div className='input-group'>
      {inputList.map(labelName => (
        <Input key={labelName}>{labelName}</Input>
      ))}
    </div>
  );
};

export default InputGroup;
