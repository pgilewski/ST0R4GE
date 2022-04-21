import { useState, useContext } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as BackIcon } from '../../assets/icons/back.svg';
import PdfPlayer from './PdfPlayer';
import Tags from './Tags';
import { updateFile, deleteFile } from '../../graphql/mutations';
import file_placeholder from '../../assets/images/file_placeholder.png';
import NotyfContext from '../../context/NotyfContext';

export default function Modal(props) {
  const notyf = useContext(NotyfContext);
  const {
    file: { id, labels, createdAt, size, url },
    file,
    setDeletedFiles,
    deletedFiles,
  } = props;
  const [name, setName] = useState(file.name);
  const time =
    createdAt.split('T')[0] +
    ' ' +
    createdAt.split('T')[1].split('.')[0];
  //   id: ID!
  //   name: String
  //   owner: String
  //   labels: [String]
  //   file: S3Object
  // }
  const updateImageInDB = async () => {
    if (newName !== name && newName !== '') {
      const input = {
        id,
        name: newName,
        labels: labelsToState,
        size,
        createdAt,
      };
      try {
        await API.graphql(
          graphqlOperation(updateFile, { input: input })
        );
        setName(newName);

        notyf.success('Updated file successfully');
      } catch (e) {
        notyf.error("Couldn't update a file.");
      }
    } else {
      const input = {
        id,
        name,
        labels: labelsToState,
        size,
        createdAt,
      };
      try {
        await API.graphql(
          graphqlOperation(updateFile, { input: input })
        );
        notyf.success('Updated file successfully');
      } catch (e) {
        notyf.error("Couldn't update a file.");
      }
    }
  };

  const [editMode, setEditMode] = useState(false);

  const [labelsToState, setLabelsToState] = useState(labels || []);

  const onEditClick = () => {
    if (editMode) {
      //TODO: jezeli tagi sie roznia to zrob put, jesli nie to nic nie rob
      updateImageInDB();
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const onRemoveClick = async () => {
    // TODO: rewrite to do both symutanously
    const d1 = await API.graphql(
      graphqlOperation(deleteFile, { input: { id } })
    );
    const s3Entry = id.split('/')[2];
    const d2 = await Storage.remove(s3Entry, { level: 'private' });
    if (d1 && d2) {
      setDeletedFiles([...deletedFiles, url]);
      notyf.success('Successfully deleted file.');

      history.push('/gallery');
    } else {
      notyf.error('There might occur error while deleting file.');
    }
  };
  let history = useHistory();

  // let image = IMAGES[parseInt(id, 10)]

  // if (!s3Key) return null

  const onEscHandle = (e) => {
    // TODO: back handling when location in on photo
    // console.log(e)
  };
  const [newName, setNewName] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setNewName(value);
  };
  let back = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  const renderInModal = ({ type, name, url }) => {
    if (type.includes('image') && !type.includes('svg')) {
      return (
        <img
          alt={name}
          key={name}
          className="m-auto"
          src={url}
          style={{
            maxHeight: '50vh',
          }}
        />
      );
    } else if (type.includes('video')) {
      return (
        <video
          alt={name}
          controls
          key={name}
          className="mx-auto"
          style={{
            maxHeight: '50vh',
          }}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      );
    } else if (type.includes('pdf')) {
      return <PdfPlayer url={url} className="mx-auto" />;
    } else if (type.includes('mpeg')) {
      return (
        <audio alt={name} key={name} controls className="mx-auto">
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      return (
        <img
          alt={name}
          key={name}
          className="m-auto"
          src={file_placeholder}
          style={{
            maxHeight: '50vh',
          }}
        />
      );
    }
  };
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)',
        zIndex: 20,
      }}
      // onClick={back}
      onKeyPress={onEscHandle}
    >
      <div
        className="modal overflow-y-auto bg-white dark:bg-gray-700"
        style={{
          position: 'fixed',
          top: 15,
          left: '5%',
          right: '5%',
          bottom: '5%',
          padding: 15,
          border: '2px solid #444',
        }}
      >
        <BackIcon
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          type="button"
          onClick={back}
          className="w-8 h-8 cursor-pointer"
        />
        <div className="flex flex-col text-left p-4">
          <div className="w-full">{renderInModal(file)}</div>
          <div className=" w-full  md:p-4 flex flex-col md:flex-row ">
            <div className="w-full  md:w-1/2">
              <div className="w-full h-full border border-gray-500 p-4">
                <div className="w-full my-1 overflow-hidden overflow-ellipsis dark:text-gray-200">
                  <div className="w-1/2 inline-block">
                    <strong>File name:</strong>
                  </div>
                  {editMode ? (
                    <input
                      type=" text-gray-800"
                      onChange={handleChange}
                      placeholder={name}
                    />
                  ) : (
                    <div className="w-1/2 inline-block ">{name}</div>
                  )}
                  <div className="w-1/2 inline-block">
                    <strong>Date added:</strong>
                  </div>
                  <div className="w-1/2 inline-block">{time}</div>

                  <div className="w-1/2 inline-block mb-4">
                    <strong>File size:</strong>
                  </div>
                  <div className="w-1/2 inline-block">
                    {(size / 1048576).toFixed(2)}MB
                  </div>
                </div>
                <div className="w-full mt-2">
                  {/* <strong>Tagi:</strong> */}

                  <div className="w-full mx-2 border-t pt-4 ">
                    <Tags
                      className="mt-2"
                      setLabelsToState={setLabelsToState}
                      labelsToState={labelsToState}
                      full={true}
                      editMode={editMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="flex">
                <button
                  onClick={onEditClick}
                  type="button"
                  className={`w-1/2 mt-2 py-2 mx-2 px-4 flex justify-center items-center  ${
                    editMode
                      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 '
                  }focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}
                >
                  <EditIcon className="w-5 h-5 mr-2" />
                  {editMode ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={onRemoveClick}
                  type="button"
                  className="w-1/2 mt-2 mx-2 py-2 px-4 flex justify-center items-center  text-white bg-gray-600 transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  {/* bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200  */}
                  <DeleteIcon className="w-5 h-5 mr-2" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
