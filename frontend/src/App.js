import React, { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Homepage from './pages/Homepage';
import AdminChat from './pages/AdminChat';
import AdminPage from './pages/AdminPage';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Posts from './components/Miscellaneous/Posts';
import Profile from './components/Miscellaneous/Profile';
import Loading from './components/Miscellaneous/Loading';
import Chatbot from './components/Miscellaneous/Chatbot';
import NotFound from "./components/Miscellaneous/NotFound";

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

  const AppContent = () => {
    const location = useLocation();
    const hideChatbotRoutes = ["/login", "/admin", "/profile", "/chats"];

    // Function to check if current route should hide the Chatbot
    const shouldHideChatbot = () => {
      // Check if it's a specified route to hide Chatbot
      if (hideChatbotRoutes.includes(location.pathname)) {
        return true;
      }

      // Check if it's the homepage or a route with query parameters
      if (location.pathname === "/" || location.pathname === "/posts") {
        return false;
      }

      // For all other cases, hide Chatbot
      return true;
    };

    return (
      <Box minH="100vh" bg="gray.100">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/chats" component={AdminChat} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/posts" component={Posts} />
          <Route path="/profile" component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
        {!shouldHideChatbot() && (
          <Box position="fixed" bottom="20px" right="20px">
            <Chatbot />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <ChakraProvider>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <AppContent />
        </Router>
      )}
    </ChakraProvider>
  );
}

export default App;
