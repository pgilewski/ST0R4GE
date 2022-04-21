import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import Predictions from '@aws-amplify/predictions';
import { createFile } from '../graphql/mutations';
import LoadingSpinner from './LoadingSpinner';
import NotyfContext from '../context/NotyfContext';
import docs_placeholder from '../assets/images/docs_placeholder.png';
import rar_placeholder from '../assets/images/rar_placeholder.png';
import audio_placeholder from '../assets/images/audio_placeholder.png';
import file_placeholder from '../assets/images/file_placeholder.png';

import Tags from './gallery/Tags';

function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState('start');
  const [showTagsInput, setShowTagsInput] = useState(false);
  const [tags, setTags] = useState([]);

  const notyf = useContext(NotyfContext);

  useEffect(() => {
    files.forEach((file) => {
      if (!file.type.includes('video')) {
        URL.revokeObjectURL(file.preview);
      }
    });
  }, [files]);

  // TODO: check if object in array has type: includes("executable")
  const onDrop = useCallback((acceptedFiles) => {
    // eslint-disable-next-line
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFiles((prev) => prev.concat(newFiles));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const filterLabels = (labels) => {
    const filteredLabels = labels
      // eslint-disable-next-line
      .filter((label) => {
        if (label.metadata.confidence > 80) return label;
      })
      .map((label) => {
        return label.name;
      });

    return filteredLabels;
  };
  const concatTagsAndLabels = (labels, tags) => {
    const joinedLabels = labels.concat(tags);
    return joinedLabels;
  };

  let filesListPromise = Storage.list('', { level: 'private' });

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading('loading');

    let filesAmount = await Promise.resolve(filesListPromise).then(
      (data) => {
        return data.length;
      }
    );

    const creds = await Auth.currentCredentials();

    for (const [index, file] of files.entries()) {
      // 1,048,576 = 1MB
      if (file.size > 20 * 1048576) {
        notyf.error(
          "You can't upload file bigger than 20MB. Other files has been uploaded."
        );
        history.push('/upload');
        setFiles([]);

        setLoading('start');
      } else {
        if (filesAmount >= 20) {
          notyf.error(
            'You are allowed to store 20 files on trial version.'
          );
          setLoading('result');
        } else {
          try {
            const storagePromise = Storage.put(file.name, file, {
              level: 'private',
            });
            filesAmount++;

            if (recognize) {
              if (
                file.type === 'image/jpg' ||
                file.type === 'image/jpeg' ||
                file.type === 'image/png'
              ) {
                const labelsPromise = Predictions.identify({
                  labels: {
                    source: {
                      file,
                    },
                    type: 'LABELS',
                  },
                });
                const picture = await Promise.all([
                  storagePromise,
                  labelsPromise,
                ]).then(([storageData, labelsData]) => {
                  let { labels } = labelsData;
                  let time = new Date();
                  let picture = {
                    id: `private/${creds.identityId}/${file.name}`,
                    name: file.name,
                    labels: concatTagsAndLabels(
                      filterLabels(labels),
                      tags
                    ),
                    type: file.type,
                    createdAt: time,
                    size: file.size,
                  };
                  return picture;
                });
                try {
                  API.graphql(
                    graphqlOperation(createFile, { input: picture })
                  );
                } catch (error) {
                  console.error(error);
                }
              } else {
                notyf.error(
                  file.type + " kind of files can't be recognized."
                );
                const picture = await Promise.resolve(
                  storagePromise
                ).then((storageData) => {
                  let time = new Date();

                  let picture = {
                    id: `private/${creds.identityId}/${file.name}`,
                    name: file.name,
                    labels: tags ? tags : [],
                    type: file.type,
                    createdAt: time,
                    size: file.size,
                  };
                  return picture;
                });
                try {
                  API.graphql(
                    graphqlOperation(createFile, { input: picture })
                  );
                } catch (error) {
                  console.error(error);
                }
              }
            } else {
              const picture = await Promise.resolve(
                storagePromise
              ).then(() => {
                let time = new Date();
                let picture = {
                  id: `private/${creds.identityId}/${file.name}`,
                  name: file.name,
                  labels: tags ? tags : [],
                  type: file.type,
                  createdAt: time,
                  size: file.size,
                };
                return picture;
              });
              try {
                await API.graphql(
                  graphqlOperation(createFile, { input: picture })
                );
              } catch (error) {
                console.error(error);
              }
            }
            notyf.success('Uploaded a file.');
            if (index === files.length - 1) {
              setLoading('result');
            }
          } catch (error) {
            console.error(error);
            setLoading('result');
          }
        }
      }
    }
  };
  const preview = files.map((file) => {
    let type = file.type;

    if (type.includes('image')) {
      return (
        <img
          src={file.preview}
          alt={file.name}
          className="w-2/3 md:w-full"
          key={file.name}
        />
      );
    } else if (type.includes('video')) {
      return (
        <video controls key={file.name} className="w-2/3 md:w-full">
          <source src={file.preview} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      );
    } else if (type.includes('pdf')) {
      return (
        <img
          src={docs_placeholder}
          alt={file.name}
          className="w-2/3 md:w-full"
          key={file.name}
        />
      );
    } else if (type.includes('rar')) {
      return (
        <img
          src={rar_placeholder}
          alt={file.name}
          className="w-2/3 md:w-full"
          key={file.name}
        />
      );
    } else if (type.includes('mpeg')) {
      return (
        <img
          src={audio_placeholder}
          alt={file.name}
          className="w-2/3 md:w-full"
          key={file.name}
        />
      );
    } else {
      return (
        <img
          src={file_placeholder}
          alt={file.name}
          className="w-2/3 md:w-full"
          key={file.name}
        />
      );
    }
  });
  const history = useHistory();

  const renderResult = (props) => {
    if (loading === 'result') {
      history.push('/gallery');

      /*         <div>
          <h1>Uploaded {props} files.</h1>
          <Link to="/gallery">
            <button
              type="button"
              className="mb-4 mt-6 py-4 px-6  bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Go to Gallery
            </button>
          </Link>
        </div> */
    } else if (loading === 'loading') {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }
  };
  const [recognize, setRecognize] = useState(false);
  const handleToggleChange = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setRecognize(true);
    } else {
      setRecognize(true);
    }
  };

  const renderUpload = () => {
    return (
      <div className="bg-white dark:bg-gray-800">
        <div className="pt-12 mx-auto bg-white dark:bg-gray-800  max-w-lg ">
          <div className="grid md:grid-cols-3 md:gap-4 ">
            <div
              {...getRootProps({ className: 'dropzone' })}
              className="col-span-3 "
            >
              <input {...getInputProps()} />

              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mb-12">
                <div
                  className={`sm: mx-2 flex flex-col items-center py-12 px-6 rounded-md border-2 border-dashed ${
                    isDragActive
                      ? 'border-indigo-500 '
                      : 'border-gray-400'
                  }`}
                >
                  <svg
                    className="w-12 h-12 text-gray-500 dark:text-gray-200"
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

                  <p className="text-xl text-gray-700 dark:text-gray-200">
                    Drop files to upload
                  </p>

                  <p className="mb-2 text-gray-700 dark:text-gray-200">
                    or
                  </p>

                  <label className="bg-white cursor-pointer px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    Select files
                  </label>

                  <p className="text-xs dark:text-gray-300 mt-4">
                    Maximum upload file size: 20MB.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-3 justify-items-center grid md:grid-cols-3 gap-4">
              {preview}
            </div>
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
          <div className="w-full">
            <div className="flex flex-col mx-auto align-middle justify-center items-center">
              <div className="flex flex-row mx-auto align-middle justify-center items-center">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="mt-4 mb-4 py-4 px-6  bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Upload {files.length} pictures
                </button>
                <div className="ml-4 relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="Recognition"
                    onChange={handleToggleChange}
                    className="checked:bg-indigo-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="Recognition"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <span className=" text-gray-700 mt-2 dark:text-white font-normal">
                  Recognize
                </span>
              </div>
              <span
                onClick={() => setShowTagsInput(true)}
                className="text-blue-800 dark:text-blue-600 cursor-pointer mb-4"
              >
                Do you want to add tags?
              </span>
              {showTagsInput ? (
                <Tags
                  editMode={showTagsInput}
                  setLabelsToState={setTags}
                  labelsToState={tags}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <div className="bg-white dark:bg-gray-800 h-screen">
      {loading === 'start'
        ? renderUpload()
        : renderResult(files.length)}
    </div>
  );
}
export default Upload;
