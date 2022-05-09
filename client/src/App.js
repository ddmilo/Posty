import logo from './logo.svg';
import './App.css';
import SignInForm from './components/SignInForm';
import {Link} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <SignInForm />
      <Link to="/signup">Don't have an account? Register here.</Link>
    </div>
  );
}

export default App;
