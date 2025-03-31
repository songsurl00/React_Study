import { useState } from 'react';

import Header from './components/Header';
import Results from './components/Result';
import UserInput from './components/UserInputs/UserInput';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const inputIsValid = userInput.duration >= 1;

  const handleChange = (inputIdentifier, newValue) => {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue
      };
    });
  };

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && <p className='center'>duration을 1 이상으로 입력해주세요</p>}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  );
}

export default App;
