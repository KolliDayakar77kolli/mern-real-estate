import { Button } from '@chakra-ui/react'
import Homepage from './pages/Homepage';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Route path="/" component={Homepage} />
     <Button colorScheme='blue'>Button</Button>
    </div>
  );
}

export default App;
