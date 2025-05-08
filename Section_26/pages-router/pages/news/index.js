import Link from 'next/link';

const NewsPage = () => {
  return (
    <>
      <h1>NewsPage</h1>
      <ul>
        <li>
          <Link href='/news/next'>NextJs is A Great Framework</Link>
        </li>
        <li>
          <Link href='/news/react'>React</Link>
        </li>
      </ul>
    </>
  );
};

export default NewsPage;
