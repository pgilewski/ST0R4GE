import React from 'react';
import { useState } from 'react';
import { Storage } from 'aws-amplify';


function SingleUpload() {
	/* const fileInput = useRef(); */

	/*     const onSubmit = async event => {
        event.preventDefault();
        try {
            const result = await Storage.put(file.name, file, {
                contentType: 'image/png', 
                level: 'private' 
              });
            console.log('Uploaded: ', result)
        } catch (error) {
            console.log('Error uploading file: ', error);
        }

    } 
 */

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
            console.log(file)
			await Storage.put(file.name, file, {
                contentType: 'image/jpg',
                level: 'private'
            }).then((d) => {console.log(d)})
            
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	};
	const onChange = (event) => {
		setFile(event.target.files[0]);
	};

	const [ file, setFile ] = useState('');

	return (
		<div className="">
			<form onSubmit={onSubmit}>
				<input className="" type="file" onChange={onChange} />
				<button type="submit">Upload</button>
			</form>
		</div>
	);
}

export default SingleUpload;
