import logo from "../../assets/santander-logo.png";
import styles from "../../styles/Header.module.css";

export function Header() {
  return (
    <div className={styles.container}>
      <img src={logo} height={100} />
      <button className={styles.button}>Novo Saque</button>
    </div>
  );
}
