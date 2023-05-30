import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header({ onNavigate }) {
    const [navbar, setNavbar] = useState(false);
    return (
      <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a href="https://flowbite.com" className="flex items-center">
                <div className="font-lobster text-5xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500" >MyLearn</div>
              </a>
              <div className="flex items-center lg:order-2">
                  <button onClick={()=>setNavbar(!navbar)} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                      <span className="sr-only">Open main menu</span>
                      <svg  className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                      <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
              </div>
              <div className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${navbar===true ? '' :'hidden'}`} id="mobile-menu-2">
                  <ul className="flex flex-col mt-4 mb-9 font-medium lg:flex-row lg:space-x-8 lg:mt-5">
                      <li>
                          <Link to="/" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-violet-500 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                      </li>
                      <li>
                          <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-violet-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">My Learning</a>
                      </li>
                      <li>
                          <button onClick={onNavigate} className="block py-2 pr-4 pl-3 text-gray-700 hover:text-violet-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</button>
                      </li>
                      <li>
                          <Link to='/Contact' className="block py-2 pr-4 pl-3 text-gray-700 hover:text-violet-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact Us</Link>
                      </li>
                  </ul>
                  <Link to='/Demo' className="text-white lg:relative lg:bottom-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-orange-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-3xl text-lg px-6 py-2 lg:ml-24 ml-12 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Request Your Demo</Link>
              </div>
          </div>
      </nav>
  </header>
    );
}