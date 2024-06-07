// src/App.js
import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Homepage from './pages/Homepage';
import AdminPage from './pages/AdminPage';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Posts from './components/Miscellaneous/Posts';
import HomeProfile from './components/Miscellaneous/HomeProfile';
import Loading from './components/Miscellaneous/Loading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });

    // Set a timeout to increase the loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set to 3000ms (3 seconds) or any desired delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <ChakraProvider>
      {loading ? (
        <Loading />
      ) : (
        <div className="App">
          <Route exact path="/" component={Homepage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/posts" component={Posts} />
          <Route path="/profile" component={HomeProfile} />
        </div>
      )}
    </ChakraProvider>
  );
}

export default App;
