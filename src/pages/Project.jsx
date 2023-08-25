import {parse,v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../Projects/ProjectForm'
import ServiceForm from '../Service/ServiceForm'
import ServiceCard from '../Service/ServiceCard'

function Project(){

    const {id} = useParams()

    const [Project, setProject] = useState()
    const [service, setService] = useState([])
    const [showProjectForm, SetshowProjectForm] = useState(false)
    const [showServiceForm, SetshowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [Type, setType] = useState()

    useEffect(() => {
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            }).then((resp) => resp.json())
            .then((data) =>{
                setProject(data)
                setService(data.service)
            })
            .catch((erro) => console.log(erro))
    
        }, 300)
    }, [id])

    function editPost(Project){
        setMessage('')

        // budget Validation
        if(Project.budget < Project.cost){
            setMessage("O orçamento deve ser maior que o custo do projeto!")
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${Project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(Project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            SetshowProjectForm(false)
            setMessage('Edição realizada com sucesso!')
            setType('sucess')
        })
        .catch((erro) => console.log(erro))
    }

    function createService(Project){
        setMessage('')

        const lastService = Project.service[Project.service.length -1 ] 

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(Project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(Project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            Project.service.pop()
            return false
        }

        Project.cost = newCost

        fetch(`http://localhost:5000/projects/${Project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Project)
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setService(data.service)
            SetshowServiceForm(false)
        })
        .catch(error => console.log(error))
    }

    function removeService(id, cost){

        const serviceUpdate = Project.service.filter(
            (service) => service.id !== id
        )

        const projectUpdate = Project

        projectUpdate.service = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUpdate)
        }).then((resp) => resp.json())
        .then((data) =>{
            setProject(projectUpdate)
            setService(serviceUpdate)
            setMessage("Serviço removido com sucesso!")
        })
        .catch(error => console.log(error))
    }

    function toggleProjectForm(){
        SetshowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        SetshowServiceForm(!showServiceForm)
    }

    return(
        <>
            {Project ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {Message && <Message type={Type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>{Project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {Project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R${Project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${Project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm  handleSubmit={editPost} btnText="Concluir Edição" projectData={Project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {
                                    showServiceForm && (
                                        <ServiceForm 
                                        handleSubmit={createService}
                                        btnTxt="Adicionar Serviço"
                                        projectData={Project}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                            <Container customClass="start">
                                {
                                    service.length > 0 && (
                                        service.map((service) =>(
                                            <ServiceCard 
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                            />
                                        )
                                        ))
                                }
                                {service.length === 0 && <p>Não há serviços cadastrados </p>}
                            </Container>
                    </Container>
                </div>
            ): ( 
                <Loading />
            )}
        </>
    )
}

export default Project