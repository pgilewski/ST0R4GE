import React, { useContext } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { useState, useEffect, useCallback } from 'react'
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
import { getFile } from '../graphql/queries'
import { updateFile, deleteFile } from '../graphql/mutations'
import Tags from './gallery/Tags'
import GalleryNavbar from './gallery/GalleryNavbar'
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg'
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg'
import { ReactComponent as BackIcon } from '../assets/icons/back.svg'
import docs_placeholder from '../assets/images/docs_placeholder.png'
import rar_placeholder from '../assets/images/rar_placeholder.png'
import video_placeholder from '../assets/images/video_placeholder.png'
import audio_placeholder from '../assets/images/audio_placeholder.png'
import pdf2_placeholder from '../assets/images/pdf2_placeholder.png'
import file_placeholder from '../assets/images/file_placeholder.png'

import { useToggle } from '../hooks/useToggle'

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom'

import NotyfContext from '../context/NotyfContext'
import Pagination from './gallery/Pagination'

export default function GalleryRouter() {
  return (
    <Router className="h-screen">
      <GallerySwitch />
    </Router>
  )
}

function GallerySwitch() {
  let location = useLocation()

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let background = location.state && location.state.background

  const [deletedFiles, setDeletedFiles] = useState([])
  // const { graphqlKey, s3Key, url, labels }=
  return (
    <div>
      <Switch location={background || location}>
        <Route
          exact
          path="/gallery"
          children={
            <Gallery
              classname="bg-white dark:bg-gray-800 h-screen"
              deletedFiles={deletedFiles}
            />
          }
        />
        <Route path="/gallery/img/:id" children={<ImageView />} />
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && (
        <Route
          path="/gallery/img/:id"
          children={
            <Modal
              file={location.state.file}
              setDeletedFiles={setDeletedFiles}
              deletedFiles={deletedFiles}
            />
          }
        />
      )}
    </div>
  )
}
const PdfPlayer = (props) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  return (
    <div className="mx-auto">
      <Document
        className="w-full overscroll-x-auto"
        style={{ width: '100%' }}
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}
const Modal = (props) => {
  const [message, setMessage] = useState({})
  const notyf = useContext(NotyfContext)
  const {
    file: { id, labels, createdAt, size, url },
    file,
    setDeletedFiles,
    deletedFiles,
  } = props
  const [name, setName] = useState(file.name)
  const time =
    createdAt.split('T')[0] + ' ' + createdAt.split('T')[1].split('.')[0]
  //   id: ID!
  //   name: String
  //   owner: String
  //   labels: [String]
  //   file: S3Object
  // }
  const updateImageInDB = async () => {
    console.log(newName, name)
    if (newName !== name && newName !== '') {
      const input = {
        id,
        name: newName,
        labels: labelsToState,
        size,
        createdAt,
      }
      try {
        const d1 = await API.graphql(
          graphqlOperation(updateFile, { input: input }),
        )
        setName(newName)

        console.log(name)
        notyf.success('Updated file successfully')
      } catch (e) {
        notyf.error("Couldn't update a file.")
      }
    } else {
      const input = { id, name, labels: labelsToState, size, createdAt }
      try {
        const d1 = await API.graphql(
          graphqlOperation(updateFile, { input: input }),
        )
        notyf.success('Updated file successfully')
      } catch (e) {
        notyf.error("Couldn't update a file.")
      }
    }
  }

  const [editMode, setEditMode] = useState(false)

  const [labelsToState, setLabelsToState] = useState(labels || [])

  const onEditClick = () => {
    if (editMode) {
      //TODO: jezeli tagi sie roznia to zrob put, jesli nie to nic nie rob
      updateImageInDB()
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }

  const onRemoveClick = async () => {
    console.log(file)
    // TODO: rewrite to do both symutanously
    const d1 = await API.graphql(
      graphqlOperation(deleteFile, { input: { id } }),
    )
    const s3Entry = id.split('/')[2]
    console.log(s3Entry)
    const d2 = await Storage.remove(s3Entry, { level: 'private' })
    console.log('d2: ', d2)
    if (d1 && d2) {
      setDeletedFiles([...deletedFiles, url])
      notyf.success('Successfully deleted file.')

      history.push('/gallery')
    } else {
      notyf.error('There might occur error while deleting file.')
    }
  }
  let history = useHistory()

  // let image = IMAGES[parseInt(id, 10)]

  // if (!s3Key) return null

  const onEscHandle = (e) => {
    // TODO: back handling when location in on photo
    // console.log(e)
  }
  const [newName, setNewName] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setNewName(value)
  }
  let back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  const renderInModal = ({ type, name, url, size, createdAt }) => {
    if (type.includes('image') && !type.includes('svg')) {
      return (
        <img
          key={name}
          className="m-auto"
          src={url}
          style={{
            maxHeight: '50vh',
          }}
        />
      )
    } else if (type.includes('video')) {
      return (
        <video
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
      )
    } else if (type.includes('pdf')) {
      return <PdfPlayer url={url} className="mx-auto" />
    } else if (type.includes('mpeg')) {
      return (
        <audio controls className="mx-auto">
          <source key={name} src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )
    } else {
      return (
        <img
          key={name}
          className="m-auto"
          src={file_placeholder}
          style={{
            maxHeight: '50vh',
          }}
        />
      )
    }
  }
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
  )
}

function ImageView() {
  let { id } = useParams()
  // let image = IMAGES[parseInt(id, 10)]
  // TODO: Change it to something more fitting.
  return (
    <div>
      IMAGEVIEW
      <img />
    </div>
  )
}

const GalleryElement = (props) => {
  const { file, url, location, filesDisplayed } = props
  const { name, labels, type, createdAt, size } = file

  function renderGalleryElement(props) {
    const { url, name, type } = props
    // obsługa poprzedniej wersji gdzie nie było 'type'
    if (!type) {
      return (
        <img
          src={url}
          alt={name}
          className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
        />
      )
    } else {
      if (type.includes('image') && !type.includes('svg')) {
        return (
          <img
            src={url}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        )
      } else if (type.includes('doc') || type.includes('pdf')) {
        return (
          <img
            src={pdf2_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        )
      } else if (
        type.includes('rar') ||
        type.includes('zip') ||
        type.includes('7zip')
      ) {
        return (
          <img
            src={rar_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        )
      } else if (type.includes('video')) {
        return (
          <img
            src={video_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        )
      } else if (type.includes('mpeg')) {
        return (
          <img
            src={audio_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        )
      } else {
        return (
          <img
            src={file_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        )
      }
    }
  }

  return (
    <div
      key={name}
      className="w-full xl:w-1/3 lg:w-1/3 sm:w-1/2 p-4 img-hover-zoom "
    >
      <div>
        <Link
          to={{
            pathname: `/gallery/img/${name}`,
            state: {
              background: location,
              file,
            },
          }}
          className="flex relative  "
        >
          {renderGalleryElement(file, url)}
          <div className="px-14 pt-48 relative z-10 w-full ">
            <h1 className="text-white overflow-hidden overflow-ellipsis">
              {filesDisplayed ? file.name : null}
            </h1>
            {/* <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500"></h2>
            {labels ? (
              <Tags labels={labels} full={false} />
            ) : (
              <Tags full={false} />
            )} */}
          </div>
        </Link>
      </div>
    </div>
  )
}

function RenderImages(props) {
  const { files, search, deletedFiles, filesDisplayed, sortMethod } = props
  let location = useLocation()
  const [filesInRender, setFilesInRender] = useState(files)

  // useEffect(() => {
  //   pictures.forEach((file) => {
  //     console.log(file)
  //     if (file.type) {
  //       if (file.type.includes('image')) {
  //         URL.revokeObjectURL(file.preview)
  //       }
  //     }
  //   })
  // }, [pictures])

  // if (sortMethod === '') {
  //   return pictures.map((picture, i) => {
  //     if (picture) {
  //       let { labels, url, s3Key } = picture
  //       if (deletedFiles.includes(url)) {
  //         return null
  //       } else {
  //         if (search === '') {
  //           return (
  //             <GalleryElement
  //               i={i}
  //               key={s3Key}
  //               url={url}
  //               labels={labels}
  //               picture={picture}
  //               location={location}
  //               filesDisplayed={filesDisplayed}
  //             />
  //           )
  //         } else if (
  //           labels !== null &&
  //           labels.find((a) => a.includes(search)) !== undefined
  //         ) {
  //           return (
  //             <GalleryElement
  //               i={i}
  //               key={s3Key}
  //               url={url}
  //               labels={labels}
  //               picture={picture}
  //               location={location}
  //             />
  //           )
  //         } else {
  //           return null
  //         }
  //       }
  //     }
  //   })
  // }

  return files.map((file, i) => {
    if (file) {
      let { id, name, labels, type, createdAt, size, url } = file
      if (deletedFiles.includes(url)) {
        return null
      } else {
        if (search === '') {
          return (
            <GalleryElement
              url={url}
              file={file}
              location={location}
              filesDisplayed={filesDisplayed}
            />
          )
        } else if (
          labels !== null &&
          labels.find((a) => a.includes(search)) !== undefined
        ) {
          return (
            <GalleryElement
              url={url}
              file={file}
              location={location}
              filesDisplayed={filesDisplayed}
            />
          )
        } else {
          return null
        }
      }
    }
  })
}
/* id: ID!
name: String
owner: String
labels: [String]
file: S3Object
 */
const Gallery = (props) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showNames, setShowNames] = useToggle()
  const [sortMethod, setSortMethod] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(9)

  const notyf = useContext(NotyfContext)

  async function getFiles() {
    const creds = await Auth.currentCredentials()
    try {
      await Storage.list('', { level: 'private' })
        .then(async (result) => {
          console.log('Result: ', result)
          for (const item of result) {
            const cognitoS3Path = `private/${creds.identityId}/${item.key}`
            const getS3Promise = Storage.get(item.key, { level: 'private' })
            const getDbPromise = API.graphql(
              graphqlOperation(getFile, {
                id: cognitoS3Path,
              }),
            )
            const newFile = await Promise.all([
              getS3Promise,
              getDbPromise,
            ]).then(([url, data]) => {
              if (url && data.data.getFile) {
                const {
                  id,
                  name,
                  labels,
                  type,
                  createdAt,
                  size,
                } = data.data.getFile
                return {
                  url,
                  id,
                  name,
                  labels,
                  type,
                  createdAt,
                  size,
                }
              } else {
                //error handling
                notyf.error('Couldnt fetch the data.')
              }
            })
            console.log(newFile)
            setFiles((prevFiles) => [...prevFiles, newFile])
            setLoading(false)
          }
        })
        .then(() => {
          setLoading(false)
        })
    } catch (error) {
      notyf.error("Couldn't fetch all photos.")
    }
  }

  useEffect(() => {
    getFiles()
  }, [])

  const [currentItems, setCurrentItems] = useState(0)

  const [pageCount, setPageCount] = useState(0)

  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    setCurrentItems(files.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(files.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, files, sortMethod])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % files.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    )
    setItemOffset(newOffset)
  }

  const { deletedFiles } = props
  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="text-gray-600 body-font ">
        <div className=" px-5 py-24 mx-auto xl:max-w-5xl 2xl:max-w-7x">
          <div className="flex flex-col text-center w-full mb-8 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">
              Gallery
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-8 dark:text-gray-400">
              Sort, filter and grid settings are coming up, as app is still in
              development.
            </p>
            <GalleryNavbar
              className=""
              setSearch={setSearch}
              setShowNames={setShowNames}
              setSortMethod={setSortMethod}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-wrap m-4 justify-center">
              <br />
              <RenderImages
                filesDisplayed={showNames}
                files={currentItems}
                search={search}
                deletedFiles={deletedFiles}
                sortMethod={sortMethod}
              />
            </div>
          )}

          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        </div>
      </div>
    </div>
  )
}
