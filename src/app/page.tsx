import Initials_page from "./components/initial-page/Initials_page";
import "./page.module.css";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Initials_page />
    </div>
  );
}
