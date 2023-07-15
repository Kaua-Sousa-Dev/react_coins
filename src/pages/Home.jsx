import styles from './Home.module.css'
import photo from '../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Coins</span></h1>
            <p>Gerencie seu projeto, hoje!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={photo} alt="Coins" />
        </section>
    )
}

export default Home