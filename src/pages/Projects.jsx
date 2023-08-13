import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'


import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

import Loading from '../layout/Loading'
import styles from './Projects.module.css'
import ProjectCard from '../Projects/ProjectCard'

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoad, setRemoveload] = useState(false)
    const [projectMessage, setProjectmessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() =>{
        setTimeout(
           () => {
                fetch('http://localhost:5000/projects', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setProjects(data)
                    setRemoveload(true)
                }).catch((erro) => console.log(erro))
            }
        , 300)
    }, [])

    function DeleteProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "DELETE",
            headers: { 
                "Content-Type"  :  "application/json" 
            }
        }).then((resp) => resp.json()).then(() =>{
                setProjects(projects.filter((project) => project.id !== id))
                setProjectmessage('Projeto removido com sucesso!')
        }).catch((erro) => console.log(erro))
    }

    return(
        <div className={styles.project_container}>

            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto"/>
            </div>

            {message && <Message type="sucess" msg={message} />}
            {projectMessage && <Message type="sucess" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) =>
                        <ProjectCard
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={DeleteProject}
                        />
                    )
                }
                {!removeLoad && <Loading />}
                {removeLoad && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
        
    )
}

export default Projects