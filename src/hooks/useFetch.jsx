import { useState,useEffect } from "react"
import axios from "axios"
const useFetch = (url)=>{
    const [data,setdata] = useState([]);
    const [error,seterror] = useState(false);
    useEffect(()=>{
        const fetchData = ()=>{
            axios.get(url)
            .then((res)=>{
               setdata(res)
            })
            .catch((error)=>{
              seterror(error)
            })
        };
        fetchData();
    },[url]);
    const refetch = ()=>{
        axios.get(url)
        .then((res)=>{
           setdata(res)
        })
        .catch((error)=>{
          seterror(error)
        })
    };
    return {data,error,refetch};
};
export default useFetch ;