import React, { useState, useEffect, useRef } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice"
import { logout } from "../slices/authslice"; 
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [dark, setDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

const [logoutApiCall] = useLogoutMutation();

 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall(); 
      dispatch(logout());  
      navigate('/login'); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Logout failed:', err.message);
      } else {
        console.error('An unexpected error occurred during logout');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-blue-900 p-4 shadow-sm ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl text-gray-900 dark:text-white">
          <Link to="/">TRVL✈</Link>
        </div>

        <div className="flex items-center gap-6">
          {userInfo ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
              >
                {userInfo.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-300 dark:border-gray-700">
                  <div className="p-2">
                    <Link
                      to="/create"
                      className="block text-gray-900 dark:text-white hover:text-blue-500 transition py-1 px-3 rounded-md"
                      onClick={closeDropdown}
                    >
                      CREATE LOG
                    </Link>
                    <Link
                      to="/profile"
                      className="block text-gray-900 dark:text-white hover:text-blue-500 transition py-1 px-3 rounded-md"
                      onClick={closeDropdown}
                    >
                      PROFILE
                    </Link>
                    <Link
                      to="/logout"
                      className="block text-gray-900 dark:text-white hover:text-blue-500 transition py-1 px-3 rounded-md"
                      onClick={() => {
                        closeDropdown();
                        logoutHandler();
                      }}
                    >
                      LOGOUT
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
              >
                SIGN UP
              </Link>
            </>
          )}

          <button
            onClick={toggleDarkMode}
            className="text-gray-900 dark:text-white"
          >
            {dark ? <IoSunnyOutline size={24} /> : <FaRegMoon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
