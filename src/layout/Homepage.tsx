
import { Link } from 'react-router-dom';
import styles from '../assets/styles/modules/Homepage.module.css'
import logo from '../assets/svg/logo.svg'
import InvoiceImg from '../assets/svg/illustration-empty.svg'
import Button from '../components/button/Button';

const Homepage = () => {
  return (
    <div aria-label="homepage" className={styles.homepage}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <Button className={styles.login_button}>
          <Link to="/login">
            Login
          </Link>
        </Button>
      </nav>

      {/* Hero section*/}
      <header className={styles.hero}>
        <section className={styles.hero_content}>
          <div>
            <h1>Welcome to Invoice App</h1>
            <p>Create, manage, and track invoices effortlessly.</p>
          </div>
          <div className={styles.heroDiv}>
            <img src={InvoiceImg} alt={"Hero Icon"} />
          </div>
          <Link to={"/login"} className={styles.get_started}>
            Get Started
          </Link>
          {/* End hero section*/}
        </section>
      </header>
    </div>
  );
}

export default Homepage