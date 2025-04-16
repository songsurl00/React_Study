import React from 'react';

import quizIsCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter(answer => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

  const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
  const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
  const wrongAnswersShare = 100 - correctAnswersShare;

  return (
    <div id='summary'>
      <img src={quizIsCompleteImg} alt='트로피 아이콘' />
      <h2>퀴즈가 끝났습니다!</h2>
      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedAnswersShare}%</span>
          <span className='number'>스킵</span>
        </p>
        <p>
          <span className='number'>{correctAnswersShare}%</span>
          <span className='number'>정답</span>
        </p>
        <p>
          <span className='number'>{wrongAnswersShare}%</span>
          <span className='number'>오답</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={answer}>
              <h3>{index + 1}</h3>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? '스킵'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
