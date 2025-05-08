import Link from 'next/link';
const BLogPage = () => {
  return (
    <main>
      <h1>The Blog</h1>
      <p>
        <Link href='/blog/post-1'>page1</Link>
      </p>
      <p>
        <Link href='/blog/post-2'>page2</Link>
      </p>
    </main>
  );
};

export default BLogPage;
