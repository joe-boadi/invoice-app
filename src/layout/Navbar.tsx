import { useEffect, useRef, useState, useContext } from "react";
import styles from "../assets/styles/modules/nav.module.css";
import logo from "../assets/svg/logo.svg";
import avatar from "../assets/img/image-avatar.jpg";
import sunSvg from "../assets/svg/icon-sun.svg";
import moonSvg from "../assets/svg/icon-moon.svg";
import useDarkModeToggle from "../hooks/useDarkMode";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth/helper/AuthService";
import AuthContext from "../auth/context/AuthProvider";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useDarkModeToggle();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleToggleDarkMode = () => {
    toggleTheme();
  };

  const handleLogout = () => {
    AuthService.logout();
    if (authContext) {
      authContext.setAuth(null); // Update the auth state
    }
    navigate("/login"); // Redirect to login page after logout
  };

  // Handle Click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.darkmodeToggle} onClick={handleToggleDarkMode}>
          <img src={isDarkMode ? sunSvg : moonSvg} alt="toggle-darkmode" />
        </div>
        <div className={styles.imgContainer} onClick={toggleDropdown}>
          <img src={avatar} alt="profile picture" />
          {isDropdownVisible && (
            <div className={styles.dropdown} ref={dropdownRef}>
              <Button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
