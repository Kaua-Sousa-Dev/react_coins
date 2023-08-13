import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Project(){

    const {id} = useParams()

    const [Project, setProject] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        }).then((resp) => resp.json())
        .then((data) =>{
            setProject(data)
        })
        .catch((erro) => console.log(erro))

    }, [id])
    return(
        <div>
            {Project &&(
                <p>{Project.name}</p>
            )}
        </div>
    )
}

export default Project