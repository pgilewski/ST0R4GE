import { useEffect, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'

function Upload () {

    useEffect( () => {
        console.log('upload');
    }, [])
   
    const onDrop = useCallback(acceptedFiles => {
      console.log(acceptedFiles)
    }, [])

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    return (
      <div className="bg-white dark:bg-gray-800 w-full">
        <div {...getRootProps({className: 'dropzone'})} className="py-12 mx-auto bg-white dark:bg-gray-800 max-w-lg ">
        {/* no duplicate props allowed */}
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className={isDragActive ? 'border-indigo-500 flex flex-col items-center py-12 px-6 rounded-md border-2 border-dashed' : 'border-gray-400 flex flex-col items-center py-12 px-6 rounded-md border-2 border-dashed'}
                >
              <svg
                  className="w-12 h-12 text-gray-500"
                  aria-hidden="true" fill="none" stroke="currentColor"
                  viewBox="0 0 48 48">
                <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              </svg>

              <p className="text-xl text-gray-700">Drop files to upload</p>

              <p className="mb-2 text-gray-700">or</p>

              <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                Select files
                <input {...getInputProps()} />
              </label>

              <p className="text-xs text-gray-600 mt-4">Maximum upload file size: 512MB.</p>
            </div>
            {files}
          </div>
        </div>
      </div>
    )
} 

export default Upload;