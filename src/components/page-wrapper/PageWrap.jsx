import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import styles from '../css/PageWrap.module.scss';
import {Toaster, toast} from 'react-hot-toast';

const notifyError = (msg) => {
  toast.error(`${msg}`, {
    position: 'bottom-center',
    style: {
      padding: "16px",
      borderRadius: "0.3125rem",
      backgroundColor: "#17A2B8",
      color: "#FFF",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "800",
      fontSize: "1.2rem"
    }
  })
};

const notifySuccess = (msg) => {
  toast.success(`${msg}`, {
    position: 'bottom-center',
    duration: 3000,
    style: {
      padding: "16px",
      borderRadius: "0.3125rem",
      backgroundColor: "#17A2B8",
      color: "#FFF",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "800",
      fontSize: "1.2rem"
    }
  })
};

function PageWrap() {
  return (
    <main className={styles.main}>
      <SideBar />
      <section className={styles.main_page}>
        <Outlet context={{notifyError, notifySuccess}} />
      </section>
      <Toaster/>
    </main>
  );
}

export default PageWrap