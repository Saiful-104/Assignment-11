import Container from '../Container';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
// No image imports!

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Direct URLs (fast, reliable, transparent background)
  const logoUrl = "https://img.freepik.com/premium-vector/educational-app-logo_1057974-5236.jpg";
  const placeholderAvatarUrl = "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=";

  return (
    <div className="fixed w-full bg-white dark:bg-gray-900 z-50 shadow-md border-b border-gray-200 dark:border-gray-800">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">

            {/* Left: Logo + Main Links */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="ScholarHub Logo"
                  className="h-12 w-auto object-contain"
                />
                <span className="hidden sm:block text-2xl font-bold text-gray-800 dark:text-white">
                  ScholarHub
                </span>
              </Link>

              {/* Desktop Navigation Links - Always Visible */}
              <div className="hidden lg:flex items-center gap-8">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 font-medium hover:text-lime-600 dark:hover:text-lime-400 transition"
                >
                  Home
                </Link>
                <Link
                  to="/scholarships"
                  className="text-gray-700 dark:text-gray-300 font-medium hover:text-lime-600 dark:hover:text-lime-400 transition"
                >
                  All Scholarships
                </Link>
              </div>
            </div>

            {/* Right: Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-2.5 border border-gray-300 dark:border-gray-600 rounded-full hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800"
              >
                <AiOutlineMenu className="text-gray-700 dark:text-gray-300 text-xl" />
                <img
                  className="w-8 h-8 rounded-full object-cover border-2 border-lime-500"
                  src={user?.photoURL || placeholderAvatarUrl}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div
                  className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <Link
                      to="/"
                      className="block px-6 py-4 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Home
                    </Link>
                    <Link
                      to="/scholarships"
                      className="block px-6 py-4 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      All Scholarships
                    </Link>

                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

                    {user ? (
                      <>
                        <div className="px-6 py-3">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>

                        <div className="h-px bg-gray-200 dark:bg-gray-700" />

                        <Link
                          to="/dashboard"
                          className="block px-6 py-4 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          Dashboard
                        </Link>

                        <button
                          onClick={() => {
                            logOut();
                            setIsOpen(false);
                          }}
                          className="text-left px-6 py-4 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-6 py-4 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="block px-6 py-4 text-lime-600 dark:text-lime-400 font-semibold hover:bg-lime-50 dark:hover:bg-lime-900/30 transition"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;