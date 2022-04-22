import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import useDarkMode from '../hooks/useDarkMode';
import useAuth from '../hooks/useAuth';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg';

export default function Navbar(props) {
  const [colorTheme, setTheme] = useDarkMode();
  // Call the hook which returns, current value and the toggler function
  const { isNavbarDown, setIsNavbarDown, isProfileDown, setIsProfileDown } =
    props;

  const { currentUser } = useAuthContext();

  const { signOut } = useAuth();

  const profileToggle = () => {
    setIsProfileDown(isProfileDown ? false : true);
  };
  const navbarToggle = () => {
    setIsNavbarDown(isNavbarDown ? false : true);
  };
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 shadow font-mono ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link to="/" className="flex-shrink-0">
                <MenuIcon className="h-6 w-6 text-gray-800 dark:text-white" />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {currentUser ? (
                    <div>
                      <Link
                        to="/upload"
                        className="  text-gray-800 dark:text-gray-200 uppercase px-3 py-2 rounded-md text-lg font-medium"
                      >
                        Upload
                      </Link>
                      <Link
                        to="/gallery"
                        className=" text-gray-800 dark:text-gray-200 uppercase px-3 py-2 rounded-md text-lg font-medium"
                        href="/#"
                      >
                        Gallery
                      </Link>
                      <Link
                        to="/dashboard"
                        className=" text-gray-800 dark:text-gray-200 uppercase px-3 py-2 rounded-md text-lg font-medium"
                        href="/#"
                      >
                        Dashboard
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="flex flex-row text-left">
                    <div onClick={() => setTheme(colorTheme)}>
                      {colorTheme === 'light' ? (
                        <div className="flex items-center justify-center w-full rounded-md  px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                          <SunIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full rounded-md  px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                          <MoonIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      onClick={profileToggle}
                      type="button"
                      className="flex items-center justify-center w-full rounded-md  px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                      id="options-menu"
                    >
                      <ProfileIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                    </div>

                    {isProfileDown ? (
                      <div className="z-10 origin-top-right absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {currentUser ? (
                            <div>
                              <Link
                                to="/profile"
                                className="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:tex dark:text-gray-200t-gray-100 dark:hover:bg-gray-600"
                                role="menuitem"
                              >
                                <span className="flex flex-col">
                                  <span>Profile</span>
                                </span>
                              </Link>
                              <div
                                onClick={() => signOut()}
                                className="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:tex dark:text-gray-200t-gray-100 dark:hover:bg-gray-600"
                                role="menuitem"
                              >
                                <span className="flex flex-col">
                                  <span>Sign Out</span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Link
                                to="/register"
                                className="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:tex dark:text-gray-200t-gray-100 dark:hover:bg-gray-600"
                                role="menuitem"
                              >
                                <span className="flex flex-col">
                                  <span>Create acc</span>
                                </span>
                              </Link>
                              <Link
                                to="/login"
                                className="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:tex dark:text-gray-200t-gray-100 dark:hover:bg-gray-600"
                                role="menuitem"
                              >
                                <span className="flex flex-col">
                                  <span>Login</span>
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={navbarToggle}
                className="text-gray-800 dark:text-white hover:uppercaseinline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                {isNavbarDown ? (
                  <ArrowUpIcon className="h-6 w-6" />
                ) : (
                  <ArrowDownIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isNavbarDown ? (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              {currentUser ? (
                <div>
                  <Link
                    to="/upload"
                    className="  block text-gray-800 dark:text-gray-200 uppercase px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Upload
                  </Link>
                  <Link
                    to="/gallery"
                    className=" block text-gray-800 dark:text-gray-200 uppercase px-3 py-2 rounded-md text-lg font-medium"
                    href="/#"
                  >
                    Gallery
                  </Link>
                  <Link
                    to="/dashboard"
                    className=" block text-gray-800 dark:text-gray-200 uppercase px-3 py-2 rounded-md text-lg font-medium"
                    href="/#"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : null}
              <Link
                to="/about"
                className=" block text-gray-800 dark:text-gray-200 uppercase px-3 py-2 rounded-md text-lg font-medium"
                href="/#"
              >
                About
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
