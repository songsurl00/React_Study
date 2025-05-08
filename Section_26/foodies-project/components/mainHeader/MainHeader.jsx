import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './MainHeaderBackground';
import logoImg from '@/assets/logo.png';
import classes from './MainHeader.module.css';
import NavLink from './NavLink';

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href='/'>
          <Image src={logoImg} alt='로고 이미지' priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href='/meals'>Browser Meals</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
