import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';
// import { uiActions } from '../store/ui-slice';

const MainHeader = (props) => {
  // const
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
