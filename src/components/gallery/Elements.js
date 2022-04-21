import { useLocation } from 'react-router-dom';
import GalleryElement from './Element';
export function GalleryElements(props) {
  const { files, search, deletedFiles, filesDisplayed } = props;
  let location = useLocation();
  // eslint-disable-next-line
  return files.map((file, i) => {
    if (file) {
      let { id, labels, url } = file;
      if (deletedFiles.includes(url)) {
        return null;
      } else {
        if (search === '') {
          return (
            <GalleryElement
              key={id}
              url={url}
              file={file}
              location={location}
              filesDisplayed={filesDisplayed}
            />
          );
        } else if (
          labels !== null &&
          labels.find((a) => a.includes(search)) !== undefined
        ) {
          return (
            <GalleryElement
              key={id}
              url={url}
              file={file}
              location={location}
              filesDisplayed={filesDisplayed}
            />
          );
        } else {
          return null;
        }
      }
    }
  });
}
export default GalleryElements;
