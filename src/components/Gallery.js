import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import { useState, useEffect } from 'react'
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
import { getPicture } from '../graphql/queries'
import { updatePicture, deletePicture } from '../graphql/mutations'
import Tags from './gallery/Tags'
import GalleryNavbar from './gallery/GalleryNavbar'
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg'
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom'

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

const Modal = (props) => {
  const [message, setMessage] = useState({})
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
    console.log(input)
    try {
      const d1 = await API.graphql(
        graphqlOperation(updatePicture, { input: input }),
      )
      console.log('updated', d1)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteImageFromDB = async (image) => {
    try {
      const d1 = await API.graphql(
        graphqlOperation(deletePicture, { input: image }),
      )
      return d1
    } catch (e) {
      console.error(e)
    }
  }

  const [editMode, setEditMode] = useState(false)

  const onEditClick = () => {
    console.log(editMode)
    try {
      if (editMode) {
        // jezeli tagi sie roznia to zrob put, jesli nie to nic nie rob
        if (props.picture.labels === labelsToState) {
          console.log('brak zmian')
        } else {
          console.log('image', picture)

          updateImageInDB()
        }
        setEditMode(false)
      } else {
        setEditMode(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onRemoveClick = async () => {
    //rewrite to do both symutanously

    const d1 = await deleteImageFromDB({ id })
    const d2 = await Storage.remove(s3Key, { level: 'private' })
    if (d1 && d2) {
      setMessage({
        type: 'success',
        message: 'Successfully deleted file.',
      })
      console.log(deletedPictures)
      const newArray = []
      setDeletedPictures([...deletedPictures, url])
      history.push('/gallery')
    }
    console.log(d1, d2, 'deleted')
  }
  const [labelsToState, setLabelsToState] = useState(props.picture.labels || [])
  let history = useHistory()

  // let image = IMAGES[parseInt(id, 10)]

  // if (!s3Key) return null

  let back = (e) => {
    e.stopPropagation()
    history.goBack()
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
    >
      <div
        className="modal"
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
        <button
          style={{
            position: 'absolute',
            background: '#fff',
            top: 10,
            right: 10,
            border: '2px solid #444',
          }}
          type="button"
          onClick={back}
        >
          Close
        </button>
        <div className="flex  flex-col text-left p-4">
          <div className="w-full">
            <img
              alt="gallery"
              className="m-auto"
              src={url}
              style={{
                maxHeight: '50vh',
              }}
            />
          </div>
          <div className=" w-full p-6">
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
  )
}

function ImageView() {
  let { id } = useParams()
  // let image = IMAGES[parseInt(id, 10)]
  console.log(id)

  return (
    <div>
      IMAGEVIEW
      <img />
    </div>
  )
}

function RenderImages(props) {
  const { pictures, search, deletedPictures } = props
  let location = useLocation()
  useEffect(() => {
    console.log(deletedPictures)
  }, [deletedPictures])
  return pictures.map((picture, i) => {
    let { labels, url } = picture
    if (!labels) {
      labels = []
    }
    if (
      (search === '') |
        (labels.find((a) => a.includes(search)) !== undefined) &&
      !deletedPictures.includes(url)
    ) {
      return (
        <div key={i} className="lg:w-1/3 sm:w-1/2 p-4 img-hover-zoom ">
          <div>
            <Link
              key={i}
              to={{
                pathname: `/gallery/img/${i}`,
                state: {
                  background: location,
                  picture,
                },
              }}
              className="flex relative  "
            >
              <img
                alt="gallery"
                className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
                src={url}
              />
              <div className="px-4 pt-36 pb-4 relative z-10 w-full ">
                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500"></h2>
                <Tags labels={labels} full={false} />
              </div>
            </Link>
          </div>
        </div>
      )
    } else {
      return null
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
              const { file, id, labels } = data.data.getPicture
              return {
                id,
                file,
                labels,
                url,
                graphqlKey: cognitoS3Path,
                s3Key: item.key,
              }
            })
            setPictures((prevPictures) => [...prevPictures, newPicture])
          }
        })
        .then(() => {
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
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
            <GalleryNavbar setSearch={setSearch} />
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-wrap m-4 ">
              {/* change label to "keyword" or "search" */}
              <RenderImages
                pictures={pictures}
                search={search}
                deletedPictures={deletedPictures}
              />
            </div>
          )}
        </div>
      </div>
      {/* {hasError && <ErrorComponent />} */}
    </div>
  )
}
