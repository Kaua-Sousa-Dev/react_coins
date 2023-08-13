import { useNavigate } from 'react-router-dom'

import ProjectForm from '../Projects/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){

    const navigate = useNavigate()

    function createPost(project){

        // initialize cost and services
        project.cost = 0
        project.service = []


        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            }, 
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then(
            (data) => {
                console.log(data)
                navigate('/projects', {state:{message: "Projeto criado com sucesso!"}})
            }
        )
        .catch((erro) => console.log(erro))
    }

    return(
        <section className={styles.project}>
            <h1>Novos Projetos</h1>
            <p>Crie, Gerencie seus projetos</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </section>
    )
}

export default NewProject