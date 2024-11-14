import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreateTravel from "./pages/CreateTravel";
import NavBar from "./Components/NavBar";
import Homepage from "./pages/Homepage";


function App() {
  return (
    <Router>
      <NavBar/>
      <Routes> 
         <Route path="/" element = {<Homepage/>}/>
        <Route path="/create" element={<CreateTravel />} />
      </Routes>
    </Router>
  );
}

export default App;