import { useEffect, useRef, useState } from "react";

// styles
import styles from "../assets/styles/modules/nav.module.css";

// svgs, images
import logo from "../assets/svg/logo.svg";
import avatar from "../assets/img/image-avatar.jpg";
import sunSvg from "../assets/svg/icon-sun.svg";
import moonSvg from "../assets/svg/icon-moon.svg";

// utils
import useDarkModeToggle from "../hooks/useDarkMode";
import useLocalStorage from "../hooks/useLocalStorage";
import Button from "../components/button/Button";
import { AuthService } from "../auth/helper/AuthService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleTheme, setDarkMode } = useDarkModeToggle();
  const [value, setValue] = useLocalStorage("isDarkMode", isDarkMode);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    toggleTheme();
    setValue(!isDarkMode);
  };

  useEffect(() => {
    const darkmode = value ?? isDarkMode;
    setDarkMode(darkmode);
  }, [value, isDarkMode]);

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
    // clean up event listeners / dropdown visibility changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const handleLogout = () => {
    AuthService.removeToken();
    navigate("/");
  };

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
