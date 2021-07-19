import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const [state, setstate] = useState({
        data:null,
        loading:true,
        error:null
    });

    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])
    
    useEffect(() => {
        
        setstate({
            data:null,
            loading:true,
            error:null
        })

        fetch(url)
        .then(resp => resp.json())
        .then(data=>{
            if(isMounted.current)
            {
                setstate({
                    data:data,
                    loading:false,
                    error:null
                })
            }

        })
        .catch(()=>{
            setstate({
                data:null,
                loading:false,
                error:'No se pudo cargar la data'
            })
        })
    }, [url])

    

    
    return state;
   
}
