import Header from './components/Header.jsx';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import StateLogin from './components/StateLogin.js';

function App() {
  return (
    <>
      <Header />
      <main>
        <StateLogin />
        {/* <Login /> */}
        {/* <Signup /> */}
      </main>
    </>
  );
}

export default App;
