import React, { useContext } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { useState, useEffect } from 'react'
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
import { getPicture } from '../graphql/queries'
import { updatePicture, deletePicture } from '../graphql/mutations'
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

export default function GalleryRouter() {
  return (
    <Router className="">
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

  const [deletedPictures, setDeletedPictures] = useState([])
  // const { graphqlKey, s3Key, url, labels }=
  return (
    <div>
      <Switch location={background || location}>
        <Route
          exact
          path="/gallery"
          children={<Gallery deletedPictures={deletedPictures} />}
        />
        <Route path="/gallery/img/:id" children={<ImageView />} />
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && (
        <Route
          path="/gallery/img/:id"
          children={
            <Modal
              picture={location.state.picture}
              setDeletedPictures={setDeletedPictures}
              deletedPictures={deletedPictures}
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
    picture: { id, file, s3Key, url },
    picture,
    setDeletedPictures,
    deletedPictures,
  } = props
  //   id: ID!
  //   name: String
  //   owner: String
  //   labels: [String]
  //   file: S3Object
  // }
  const updateImageInDB = async () => {
    const input = { id, labels: labelsToState, file }
    try {
      const d1 = await API.graphql(
        graphqlOperation(updatePicture, { input: input }),
      )
      notyf.success('Updated file successfully')
    } catch (e) {
      notyf.error("Couldn't update a picture.")
    }
  }

  const deleteImageFromDB = async (image) => {
    try {
      const d1 = await API.graphql(
        graphqlOperation(deletePicture, { input: image }),
      )

      console.log(image)
      const d2 = await Storage.list('', { level: 'private' })
      console.log(d2)
    } catch (e) {
      notyf.error('We had a problem with removing your photo.')
    }
  }

  const [editMode, setEditMode] = useState(false)

  const [labelsToState, setLabelsToState] = useState(props.picture.labels || [])

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
    // TODO: rewrite to do both symutanously
    const d1 = await API.graphql(
      graphqlOperation(deletePicture, { input: { id } }),
    )
    const d2 = await Storage.remove(s3Key, { level: 'private' })
    if (d1 && d2) {
      setDeletedPictures([...deletedPictures, url])
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

  let back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  const renderInModal = ({ file, s3Key, url }) => {
    const type = file.type
    if (type === null) {
      return (
        <img
          alt={s3Key}
          className="m-auto"
          src={url}
          style={{
            maxHeight: '50vh',
          }}
        />
      )
    } else {
      if (type.includes('image')) {
        return (
          <img
            key={s3Key}
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
            key={s3Key}
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
        return <PdfPlayer file={file} url={url} className="mx-auto" />
      } else if (type.includes('mpeg')) {
        return (
          <audio controls className="mx-auto">
            <source key={s3Key} src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )
      }
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
        className="modal overflow-y-auto "
        style={{
          position: 'fixed',
          background: '#fff',
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
            background: '#fff',
            top: 10,
            right: 10,
          }}
          type="button"
          onClick={back}
          className="w-8 h-8 cursor-pointer"
        />
        <div className="flex flex-col text-left p-4">
          <div className="w-full">{renderInModal(picture)}</div>
          <div className=" w-full p-4 flex flex-row">
            <div className="w-1/2">
              <h3 className="mt-2">
                <strong>Data dodania:</strong> 2021-10-29
              </h3>
              <h3 className="my-2">
                <strong>Tagi:</strong>
              </h3>
              <Tags
                className="mt-2"
                setLabelsToState={setLabelsToState}
                labelsToState={labelsToState}
                full={true}
                editMode={editMode}
              />
            </div>
            <div className="w-1/2  align-bottom">
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
  const { i, url, labels, picture, location, s3Key, filesDisplayed } = props
  function renderGalleryElement(props) {
    const {
      url,
      s3Key,
      file: { type },
    } = props
    // wsteczna obsługa
    if (!type) {
      return (
        <img
          alt={picture.name}
          className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          src={url}
        />
      )
    } else {
      if (type.includes('image')) {
        return (
          <img
            src={url}
            alt={s3Key}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        )
      } else if (type.includes('doc') || type.includes('pdf')) {
        return (
          <img
            alt={s3Key}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
            src={pdf2_placeholder}
          />
        )
      } else if (
        type.includes('rar') ||
        type.includes('zip') ||
        type.includes('7zip')
      ) {
        return (
          <img
            alt={s3Key}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
            src={rar_placeholder}
          />
        )
      } else if (type.includes('video')) {
        return (
          <img
            alt={s3Key}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
            src={video_placeholder}
          />
        )
      } else if (type.includes('mpeg')) {
        return (
          <img
            alt={s3Key}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
            src={audio_placeholder}
          />
        )
      } else {
        return (
          <img
            alt={s3Key}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
            src={file_placeholder}
          />
        )
      }
    }
  }

  return (
    <div
      key={s3Key}
      className="w-full xl:w-1/3 lg:w-1/3 sm:w-1/2 p-4 img-hover-zoom "
    >
      <div>
        <Link
          to={{
            pathname: `/gallery/img/${i}`,
            state: {
              background: location,
              picture,
            },
          }}
          className="flex relative  "
        >
          {renderGalleryElement(picture, url)}
          <div className="px-14 pt-48 relative z-10 w-full ">
            <h1 className="text-white">
              {filesDisplayed ? picture.s3Key : null}
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
  const {
    pictures,
    search,
    deletedPictures,
    filesDisplayed,
    sortMethod,
    setPictures,
  } = props
  let location = useLocation()

  useEffect(() => {
    pictures.forEach((file) => {
      if (file.type) {
        if (file.type.includes('image')) {
          URL.revokeObjectURL(file.preview)
        }
      }
    })
  }, [pictures])

  if (sortMethod === 'name') {
    // console.log(pictures)
    let newPicturesArray = pictures
    newPicturesArray.sort((a, b) => {
      let fa = a.s3Key.toLowerCase().charAt(0),
        fb = b.s3Key.toLowerCase().charAt(0)
      // console.log(fa, fb)
      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })
    setPictures(newPicturesArray)
    console.log('new pictures set')
  } else if (sortMethod === 'oldest') {
    console.log('321')
  } else if (sortMethod === 'newest') {
    console.log('123')
  } else if (sortMethod === 'size') {
    console.log('size')
  } else if (sortMethod === 'type') {
    console.log('size')
  }

  return pictures.map((picture, i) => {
    if (picture) {
      let { labels, url, s3Key } = picture
      if (deletedPictures.includes(url)) {
        return null
      } else {
        if (search === '') {
          return (
            <GalleryElement
              i={i}
              key={s3Key}
              url={url}
              labels={labels}
              picture={picture}
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
              i={i}
              key={s3Key}
              url={url}
              labels={labels}
              picture={picture}
              location={location}
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
  const [pictures, setPictures] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showNames, setShowNames] = useToggle()
  const [sortMethod, setSortMethod] = useState('')

  useEffect(() => {}, pictures)
  const notyf = useContext(NotyfContext)
  async function getImages() {
    const creds = await Auth.currentCredentials()
    try {
      await Storage.list('', { level: 'private' })
        .then(async (result) => {
          for (const item of result) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
            const cognitoS3Path = `private/${creds.identityId}/${item.key}`
            const getS3Promise = Storage.get(item.key, { level: 'private' })
            const getDbPromise = API.graphql(
              graphqlOperation(getPicture, {
                id: cognitoS3Path,
              }),
            )
            const newPicture = await Promise.all([
              getS3Promise,
              getDbPromise,
            ]).then(([url, data]) => {
              if (data.data.getPicture && url) {
                const { file, id, labels } = data.data.getPicture
                return {
                  id,
                  file,
                  labels,
                  url,
                  graphqlKey: cognitoS3Path,
                  s3Key: item.key,
                }
              } else {
                //error handling
                notyf.error('Couldnt fetch the data.')
              }
            })

            setPictures((prevPictures) => [...prevPictures, newPicture])
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

  // const deleteImage = (props) => {
  //   console.log(props)
  // }
  // cont[hasError, setHasError] = useState(false)
  useEffect(() => {
    getImages()
  }, [])

  const { deletedPictures } = props
  return (
    <div className="full-height-no-navbar">
      <div className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Gallery
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-8">
              Search, filter and grid settings are coming up next, as app is
              still in development.
            </p>
            <GalleryNavbar
              setSearch={setSearch}
              setShowNames={setShowNames}
              setSortMethod={setSortMethod}
              pictures={pictures}
            />
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-wrap m-4 ">
              {/* change label to "keyword" or "search" */}
              <RenderImages
                filesDisplayed={showNames}
                pictures={pictures}
                search={search}
                deletedPictures={deletedPictures}
                sortMethod={sortMethod}
                setPictures={setPictures}
              />
            </div>
          )}
        </div>
      </div>
      {/* {hasError && <ErrorComponent />} */}
    </div>
  )
}
