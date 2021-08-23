import { useEffect, useState } from 'react';

function Recipes () {

    useEffect( () => {
        console.log('recipes');
    }, [])
    
    return (
      <div>
        <p className="text-xl">Your recipes</p>
      </div>
    )
} 

export default Recipes;