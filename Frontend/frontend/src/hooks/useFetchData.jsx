import {useState , useEffect} from 'react'
import { token } from '../../config.js';

const useFetchData = (url) => {
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
           try {
            const res = await fetch(url , {
                headers:{Authorization: `Bearer ${token}`},
            })
            const result = await res.json()

            if(!res.ok){
               throw new Error(result.message )
            }
            setData(result.data)
            // setLoading(false)
           } catch (error) {
            // setLoading(false)
            setError(error.message);
            console.error('Error fetching data:', error);

           }finally{
            setLoading(false);
           }
        };
        fetchData()
    },[url]);
  return { data , loading , error}
}

export default useFetchData
