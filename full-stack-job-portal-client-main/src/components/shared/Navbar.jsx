/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import Logo from "../Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import axios from "axios";

const Navbar = ({ navbarRef }) => {
  const { user, handleFetchMe } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        title: "Logout...",
        text: response?.data?.message,
      });
      await handleFetchMe();
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data,
      });
    }
    setIsDropdownOpen(false);
  };

  return (
    <Wrapper ref={navbarRef}>
      <div className="container">
        <Logo />
        <div className="flex justify-end items-center">
          <NavLink className="nav-item" to="/all-jobs">
            Jobs
          </NavLink>
          {user?._id ? (
            <>
              <NavLink className="nav-item hidden sm:block" to="/dashboard">
                Dashboard
              </NavLink>
              <div className="relative">
                <button
                  className="nav-item flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] transition-colors text-white px-6 py-2 rounded"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{user.username}</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/dashboard/edit-profile/${user._id}"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Edit Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NavLink className="nav-item" to="/login">
              <span className="bg-[#f97316] hover:bg-[#ea580c] transition-colors text-white px-6 py-2 rounded">
                Login
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0 5px 5px var(--shadow-light);
  padding: 1rem 0;
  position: relative;
  .container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .container .nav-item {
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
    margin-left: 20px;
    color: var(--color-black);
  }
  .container .nav-item.active {
    color: var(--color-primary);
  }
  @media screen and (max-width: 1200px) {
    padding: 1rem 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 1.2rem 1rem;
    .container {
      display: flex;
      /* justify-content: center; */
    }
  }
`;

export default Navbar;
