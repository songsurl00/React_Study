import React from 'react';
import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

const ErrorPage = () => {
  const error = useRouteError();

  let title = '에러가 발생했습니다!';
  let message = '뭔가 에러가 생겼습니다.';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = '404';
    message = '페이지를 찾을 수 없습니다.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
