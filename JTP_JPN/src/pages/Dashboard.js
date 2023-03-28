import React, { useState,useEffect } from 'react'
import { getDropdowns, getMovies } from '../global/api';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


const Dashboard = () => {
    const [options,setOptions] = useState(['One', 'Two', 'Three', 'Four', 'Five']);
    const [rec, setRec] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(()=>{
        getDropdowns().then(res => {
            setOptions(res)
        }).catch(err => { setError("Unable To Fetch"); console.log(err) })
            .finally(() => {
              setLoading(false)
            })

    },[])

    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
        setLoading(true)
        setRec([])
        getMovies({ movie: event.target.value}).then(res => {
            setRec(res)
          }).catch(err => { setError("Unable To Fetch"); console.log(err) })
            .finally(() => {
              setLoading(false)
            })
    }
    return (
        <div className='mx-4'>
            <div className='mb-12 grid place-item-center'>
            <p className='text-2xl'>Select a movie </p>
            <select onChange={onOptionChangeHandler}
            >

                <option>Please choose one option</option>
                {options.map((option, index) => {
                    return <option key={index} >
                        {option.title}
                    </option>
                })}
            </select>
            {error && <p className='text-sm text-red-500 mt-4'>{error}</p>}
            {loading && <div className='grid place-items-center p-4'><HourglassBottomIcon style={{ fontSize: "1rem" }} /></div>}
            </div>
            {rec.length>0
            &&
            <p className='text-2xl'>Recommendations:</p>
            }
            {rec.map((item, idx) => {
                return (
                    <div key={idx} className='shadow p-4 my-2 rounded flex items-center justify-between'>
                        {/* <img src={item.src} alt={item.title} /> */}
                        <p>{item.title}</p>
                        <p>{item.genres}</p>
                        {/* <p>{JSON.parse( item.genres).map((it,index)=>{return <span key={index}>{it}</span>})}</p> */}
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard