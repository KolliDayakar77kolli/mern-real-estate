import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/Homepage';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Route exact path="/" component={Homepage} />
     <Route path="/admin" component={AdminPage} />
     <Route path="/register" component={Signup} />
     <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
