import { useState } from 'react'

import Input from '../form/Input'
import Submit from '../form/Submit'

import styles from '../Projects/ProjectForm.module.css'

function ServiceForm({ handleSubmit, btnTxt, projectData}){

    const [service, Setservice] = useState([])

    function submit(e){
        e.preventDefault()
        projectData.service.push(service)
        handleSubmit(projectData)
    }
    function handleChange(e){
        Setservice({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text"
            text="Nome do serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
            />
            <Input 
            type="number"
            text="Custo do serviço"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
            />
            <Input 
            type="text"
            text="Descrição do serviço"
            name="description"
            placeholder="Descreva o serviço"
            handleOnChange={handleChange}
            />
            <Submit text={btnTxt}/>
        </form>
    )
}

export default ServiceForm