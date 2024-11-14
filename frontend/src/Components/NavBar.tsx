import React, { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <section className="flex justify-between text-right px-52  pt-10 dark:bg-blue-900 ">
      <div className="text-2xl ">
        <Link to="/"><h1>TRVL✈</h1></Link>
      </div>
      <div className="gap-1">
        <Link to="/create">CREATE LOG</Link>
        
        <button onClick={toggleDarkMode}>
          {dark ? <IoSunnyOutline /> : <FaRegMoon />}
        </button>
      </div>
    </section>
  );
};

export default NavBar;
