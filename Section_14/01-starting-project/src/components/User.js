import { Component } from 'react';

import classes from './User.module.css';

class User extends Component {
  componentWillUnmount() {
    console.log('컴포넌트 언마운트');
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
