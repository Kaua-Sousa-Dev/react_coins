import ProjectForm from '../Projects/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){
    return(
        <section className={styles.project}>
            <h1>Novos Projetos</h1>
            <p>Crie, Gerencie seus projetos</p>
            <ProjectForm />
        </section>
    )
}

export default NewProject