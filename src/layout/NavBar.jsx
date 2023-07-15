import { Link } from "react-router-dom"
import styles from './NavBar.module.css'
import Container from "./Container"
import logo from '.././img/costs_logo.png'

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Coins" />
                </Link>

                <ul className={styles.list}>
                    <li className={styles.items}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.items}>
                        <Link to="/company">Sobre</Link>
                    </li>
                    <li className={styles.items}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={styles.items}>
                        <Link to="/newproject">Novos Projetos</Link>
                    </li>
                </ul>
            </Container>
      </nav>
    )
}

export default Navbar