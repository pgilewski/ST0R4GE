import { useEffect } from 'react';
import SingleUpload from './SingleUpload';

function Recognize () {

    useEffect( () => {
        console.log('recipes');
    }, [])
    
    return (
      <div className="bg-white dark:bg-gray-800 w-full">
        <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                <span className="block">
                    Upload image
                </span>

            </h2>
            <div className="lg:mt-0 lg:flex-shrink-0">
                <div className="mt-12 inline-flex rounded-md shadow">
                    <SingleUpload />
                </div>
            </div>
        </div>
      </div>
    )
} 

export default Recognize;