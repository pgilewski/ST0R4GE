import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
} from 'react-router-dom';

import Gallery from '../Gallery';
import Modal from './Modal';
export default function GalleryRouter() {
  return <GallerySwitch />;
}

function ImageView() {
  let { id } = useParams();
  // let image = IMAGES[parseInt(id, 10)]
  // TODO: Change it to something more fitting.
  return (
    <div>
      ImageView
      {/* IMAGEVIEW
        <img alt={name} /> */}
    </div>
  );
}

function GallerySwitch() {
  let location = useLocation();
  console.log(location);
  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let background = location.state && location.state.background;

  const [deletedFiles, setDeletedFiles] = useState([]);
  // const { graphqlKey, s3Key, url, labels }=
  return (
    <div>
      <Routes location={background || location}>
        <Route
          exact
          path=""
          element={
            <Gallery
              classname="bg-white dark:bg-gray-800 h-screen"
              deletedFiles={deletedFiles}
            />
          }
        />
        <Route path="/img/:id" element={<ImageView />} />
      </Routes>

      {/* Show the modal when a background page is set */}
      {background && (
        <Modal
          file={location.state.file}
          setDeletedFiles={setDeletedFiles}
          deletedFiles={deletedFiles}
        />
      )}
    </div>
  );
}
