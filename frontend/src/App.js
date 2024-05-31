import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/Homepage';
import { Route } from "react-router-dom";
import Posts from './components/Miscellaneous/Posts';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <div className="App">
     <Route exact path="/" component={Homepage} />
     <Route path="/admin" component={AdminPage} />
     <Route path="/register" component={Signup} />
     <Route path="/login" component={Login} />
     <Route path="/posts" component={Posts} />

    </div>
  );
}

export default App;
