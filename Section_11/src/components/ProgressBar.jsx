import { useEffect, useState } from 'react';

const ProgressBar = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('인터벌');
      setRemainingTime(prevTime => prevTime - 10);
    }, 10);

    return () => {
      console.log('인터벌 클린업');
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
};

export default ProgressBar;
