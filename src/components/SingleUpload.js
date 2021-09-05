import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

function SingleUpload () {
    /* const fileInput = useRef(); */

    const onSubmit = async event => {
        event.preventDefault();

        try {
            const result = await Storage.put(file.name, file, {
                contentType: 'image/png', 
                level: 'private' 
              });
            console.log(result)
        } catch (error) {
            console.log('Error uploading file: ', error);
        }

    } 

    const onChange = event => {
        setFile(event.target.files[0]);
    }
    const [file, setFile] = useState('')
    

    useEffect( () => {
        console.log('recipes');
    }, [])
    
    return (
      <div className="" >
          <form onSubmit={onSubmit}>
            <input className="" type='file'/*  ref={fileInput} */ onChange={onChange} />
            <button type='submit'>Upload</button>
          </form>
      </div>
    )
} 

export default SingleUpload;