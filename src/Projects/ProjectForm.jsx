import styles from './ProjectForm.module.css'

function ProjectForm(){
    return(
        <form className={styles.form}>
            <div>
                <label>Nome do projeto</label>
                <input type="text"/>
            </div>
            <div>
                <label>Orçamento do projeto</label>
                <input type="number"/>
            </div>
            <div>
                <select name="category_id">
                    <option disabled selected>Selecione categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar Projeto" />
            </div>
        </form>
    )
}

export default ProjectForm