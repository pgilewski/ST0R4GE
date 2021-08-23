import { useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth'

function Home () {

  const { checkUser } = useAuth()
    

    useEffect( () => {
        console.log('home');
    }, [])
    
    return (
      <div>
        <p className="text-xl">Welcome home!</p>
        <button onClick={() => {checkUser()}}>sprawdz usera</button>
      </div>
    )
} 

export default Home;