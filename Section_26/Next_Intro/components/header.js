import Image from 'next/image';

const Header = () => {
  return (
    <>
      <Image
        src='/logo.png'
        alt='A server surrounded by magic sparkles.'
        width={100}
        height={100}
      />
      <h1>Welcome to this NextJS Course!</h1>
    </>
  );
};

export default Header;
