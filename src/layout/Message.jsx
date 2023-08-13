import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message({ type, msg}){

    const [Vissible, Setvissible] = useState(false)

    useEffect(() =>{

        if(!msg){
            Setvissible(false)
            return
        }

        Setvissible(true)
        
        const timer = setTimeout(() =>{
            Setvissible(false)
        }, 4000)

        return () => clearTimeout(timer)
    }, [msg])

    return(
        <>
            {Vissible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Message