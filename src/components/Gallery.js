import React, { useContext } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useState, useEffect } from 'react';
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import { getFile } from '../graphql/queries';
import GalleryNavbar from './gallery/Navbar';
import { useToggle } from '../hooks/useToggle';
import NotyfContext from '../context/NotyfContext';
import Pagination from './gallery/Pagination';
import GalleryElements from './gallery/Elements';

/* id: ID!
name: String
owner: String
labels: [String]
file: S3Object
 */

export default function Gallery(props) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showNames, setShowNames] = useToggle();
  const [sortMethod, setSortMethod] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const notyf = useContext(NotyfContext);

  useEffect(() => {
    const getFiles = async () => {
      const creds = await Auth.currentCredentials();
      try {
        await Storage.list('', { level: 'private' })
          .then(async (result) => {
            for (const item of result) {
              const cognitoS3Path = `private/${creds.identityId}/${item.key}`;
              const getS3Promise = Storage.get(item.key, {
                level: 'private',
              });
              const getDbPromise = API.graphql(
                graphqlOperation(getFile, {
                  id: cognitoS3Path,
                })
              );
              const newFile = await Promise.all([
                getS3Promise,
                getDbPromise,
              ]).then(([url, data]) => {
                if (url && data.data.getFile) {
                  const { id, name, labels, type, createdAt, size } =
                    data.data.getFile;
                  return {
                    url,
                    id,
                    name,
                    labels,
                    type,
                    createdAt,
                    size,
                  };
                } else {
                  //error handling
                  notyf.error('Couldnt fetch the data.');
                }
              });
              setFiles((prevFiles) => [...prevFiles, newFile]);
              setLoading(false);
            }
          })
          .then(() => {
            setLoading(false);
          });
      } catch (error) {
        notyf.error("Couldn't fetch all photos.");
      }
    };
    getFiles();
  }, [notyf]);

  const [currentItems, setCurrentItems] = useState(0);

  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(files.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(files.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, files, sortMethod]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % files.length;

    setItemOffset(newOffset);
  };

  const { deletedFiles } = props;
  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="text-gray-600 body-font ">
        <div className=" px-5 py-24 mx-auto xl:max-w-5xl 2xl:max-w-7x">
          <div className="flex flex-col text-center w-full mb-8 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">
              Create categories and organize your content.
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-8 dark:text-gray-400">
              Display your images, gifs, videos and documents. Store
              any file
              <span className="text-xs cursor-pointer">*</span>.
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
              <GalleryElements
                filesDisplayed={showNames}
                files={currentItems}
                search={search}
                deletedFiles={deletedFiles}
                sortMethod={sortMethod}
              />
            </div>
          )}

          <Pagination
            onPageChange={handlePageClick}
            pageCount={pageCount}
          />
        </div>
      </div>
    </div>
  );
}
