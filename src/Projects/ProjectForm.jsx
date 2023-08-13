import {useEffect, useState} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit,btnText, projectData}){

    const [categories, Setcategories] = useState([])
    const [project, Setproject] = useState(projectData || {})

    useEffect(() =>{
    fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((resp) => resp.json()).then((data) => {Setcategories(data)}).catch((erro) => {console.log(erro)})
    }, []) 

    const submit = (e) =>{
        e.preventDefault()
        handleSubmit(project)
    }
    function handleChange(e){
        Setproject({...project, [e.target.name]: e.target.value})
    }
    function handleSelect(e){
        Setproject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }
    })
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name : ''}/>
            <Input type="number" text="Orçamento" name="budget" placeholder="Insira o orçamento" handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>
            <Select name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : ''} />
            <Submit text={btnText} />
        </form>
    )
}

export default ProjectForm