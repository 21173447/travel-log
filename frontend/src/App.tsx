import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';

const App: React.FC = () => {
  return (
    <div>
      <NavBar /> 
    
      <Outlet /> 
    </div>
  );
};

export default App;
