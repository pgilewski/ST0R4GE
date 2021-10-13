import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import Predictions from '@aws-amplify/predictions'
import awsmobile from '../aws-exports';
import { createPicture } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function Upload() {
    const [ files, setFiles ] = useState([]);
    const [ loading, setLoading ] = useState('start');




    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [ files ]
    );

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        );
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const filterLabels = (labels) => {
        const filteredLabels = labels.filter((label) => {
            if(label.metadata.confidence > 80) return label
        }).map((label) => {
            return label.name
        })

        return filteredLabels
    }

    const addImageToDB = async (image) => {
        try {
            await API.graphql(graphqlOperation(createPicture, {input:image}));
        } catch (e) {
            console.error(e);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading('loading');

        const creds = await Auth.currentCredentials()

        for (const [ index, file ] of files.entries()) {
            try {
                await Storage.put(file.name, file, {
                    contentType: 'image/jpg',
                    level: 'private'
                })
            } catch (error) {
                console.error('Error uploading file: ', error);
            }

            Predictions.identify({
                labels: {
                    source: {
                        file,
                    },
                    type: "LABELS"
                }
            }).then( response => {
                let { labels } = response
                let picture = {
                    id: `private/${creds.identityId}/${file.name}`,
                    labels: filterLabels(labels),
                    file: {
                        bucket: awsmobile.aws_user_files_s3_bucket,
                        region: awsmobile.aws_user_files_s3_bucket_region,
                        key: `private/${creds.identityId}/${file.name}`
                    }
                }
                addImageToDB(picture).catch((e) => {console.error(e)})
            }).then(() => {
                if (index === files.length - 1) {
                    setLoading('result');
                }
            })
        }

    };
    const preview = files.map((file) => {
        return <img src={file.preview} alt={file.name} className="w-2/3 md:w-full" key={file.name} />;
    });

    const renderResult = (props) => {
        if (loading === 'result') {
            return (
                <div>
                    <h1>Uploaded {props} files.</h1>
                    <Link to="/gallery">
                        <button
                            type="button"
                            className="mb-4 mt-6 py-4 px-6  bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                            Go to Gallery
                        </button>
                    </Link>
                </div>
            );
        } else if (loading === 'loading') {
            return (
                <div>
                    <LoadingSpinner />
                </div>
            );
        }
    };

    const renderUpload = () => {
        return (
            <div>
                <div className="pt-12 mx-auto bg-white dark:bg-gray-800 max-w-lg ">
                    <div className="grid md:grid-cols-3 md:gap-4 ">
                        <div {...getRootProps({ className: 'dropzone' })} className="col-span-3 ">
                            <input {...getInputProps()} />

                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mb-12">
                                <div
                                    className={
                                        isDragActive ? (
                                            'border-indigo-500 flex flex-col items-center py-12 px-6 rounded-md border-2 border-dashed'
                                        ) : (
                                            'border-gray-400 flex flex-col items-center py-12 px-6 rounded-md border-2 border-dashed'
                                        )
                                    }
                                >
                                    <svg
                                        className="w-12 h-12 text-gray-500"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        />
                                    </svg>

                                    <p className="text-xl text-gray-700">Drop files to upload</p>

                                    <p className="mb-2 text-gray-700">or</p>

                                    <label className="bg-white cursor-pointer px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        Select files
                                    </label>

                                    <p className="text-xs text-gray-600 mt-4">Maximum upload file size: 512MB.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 justify-items-center grid md:grid-cols-3 gap-4">{preview}</div>
                    </div>
                </div>
{/*                <select className="px-4 mt-2 py-2 border rounded-md">
                    <option>memy</option>
                    <option>folder_2</option>
                    <option>aesthetics</option>
                    <option>-------------</option>
                    <option>new directory</option>
                </select>*/}

                {files.length > 0 ? (
                    <div className="">
                        {' '}
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="mt-4 py-4 px-6  bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                            Upload {files.length} pictures
                        </button>
                    </div>
                ) : null}
            </div>
        );
    };
    return (
        <div className="full-height-no-navbar dark:bg-gray-800 w-full ">
            {loading === 'start' ? renderUpload() : renderResult(files.length)}
        </div>
    );
}
export default Upload;