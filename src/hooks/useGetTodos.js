import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useEffect, useState } from 'react'


const useGetToods = () => {
    const [todos, setTodos] = useState([])
const [loading, setLoading] = useState(true)

    
useEffect( async ()=> {
    //get reference to collection todos
    const ref = collection(db, 'todos')
    
    const snapshot = await getDocs(ref)
    // console.log(`snapshot`, snapshot.docs)
    // console.log(`snapshot`, snapshot.docs[0])
    
    const data = snapshot.docs.map(doc=> {
        return {
            id: doc.id,
            ...doc.data() //title, complited
        }
    })
        console.log(`data`,data)
        setTodos(data),
        setLoading(false)
    }, [])

    return {loading,
    todos}
}
 
export default useGetToods;