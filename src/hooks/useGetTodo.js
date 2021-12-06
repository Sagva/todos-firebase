import {useEffect, useState} from 'react'
import {db} from '../firebase'
import {getDoc, doc} from 'firebase/firestore'

const useGetTood = (id) => {
    const [loading, setLoading] = useState(true)

    const [todo, setTodo] = useState()

    useEffect(async ()=> {
        setLoading(true)
        //get document reference

        const ref = doc(db, 'todos', id)
        const snapshot = await getDoc(ref)

        console.log(`snapshot`, snapshot.data())
        if(!snapshot) {
            setTodo(false)
            return
        }

        setTodo(snapshot.data())
        setLoading(false)
    }, [id])

    return {loading,
    todo}
}
 
export default useGetTood;