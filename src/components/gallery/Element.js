import { Link } from 'react-router-dom';

import rar_placeholder from '../../assets/images/rar_placeholder.png';
import video_placeholder from '../../assets/images/video_placeholder.png';
import audio_placeholder from '../../assets/images/audio_placeholder.png';
import pdf2_placeholder from '../../assets/images/pdf2_placeholder.png';
import file_placeholder from '../../assets/images/file_placeholder.png';

export default function GalleryElement(props) {
  const { file, url, location, filesDisplayed } = props;
  const { name } = file;

  function renderGalleryElement(props) {
    const { url, name, type } = props;
    // obsługa poprzedniej wersji gdzie nie było 'type'
    if (!type) {
      return (
        <img
          src={url}
          alt={name}
          className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
        />
      );
    } else {
      if (type.includes('image') && !type.includes('svg')) {
        return (
          <img
            src={url}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        );
      } else if (type.includes('doc') || type.includes('pdf')) {
        return (
          <img
            src={pdf2_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        );
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
        );
      } else if (type.includes('video')) {
        return (
          <img
            src={video_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        );
      } else if (type.includes('mpeg')) {
        return (
          <img
            src={audio_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        );
      } else {
        return (
          <img
            src={file_placeholder}
            alt={name}
            className="gallery-item absolute inset-0 w-full h-full object-cover object-center hover:scale-110"
          />
        );
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
          to={`/gallery/${name}`}
          state={{
            background: location,
            file,
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
  );
}
