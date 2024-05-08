import AdminPage from './pages/AdminPage';
import Homepage from './pages/Homepage';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Route exact path="/" component={Homepage} />
     <Route path="/admin" component={AdminPage} />
    </div>
  );
}

export default App;
