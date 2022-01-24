import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full font-mono">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold  text-sky-800 dark:text-white ">
          <span className="block ">ST0R4G3</span>
        </h2>
        <div className="text-center mb-6">
          <p className="text-gray-800 dark:text-white mt-4 text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            Your personal online cloud storage.
            <br />
          </p>
        </div>
        <div className="mt-12 lg:flex-shrink-0">
          <div className="inline-flex rounded-md">
            <Link to="/upload">
              <button
                type="button"
                className="mr-2 py-4 px-6 bg-sky-600 hover:bg-sky-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Upload
              </button>
            </Link>
            <Link to="/gallery">
              <button
                type="button"
                className="ml-2 py-4 px-6 bg-gray-500 hover:bg-gray-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Gallery
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10 mt-4">
          <h1 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl leading-tight mt-4">
            <br />
          </h1>
        </div>
        <section className="text-gray-600 dark:text-gray-200 font-mono">
          <div className="container px-5 py-2 mx-auto text-left">
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div className="p-2 sm:w-1/2 w-full ">
                <div className="bg-gray-100 dark:bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="font-mono font-medium">Store files</span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="font-mono font-medium">
                    Recognize images
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="font-mono font-medium">Display media</span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="font-mono font-medium">
                    Tag and search files
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="font-mono font-medium ">
                    Create directories{' '}
                    <span className="text-sky-300"> [in progress] </span>{' '}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-sky-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="font-mono font-medium">
                    Share files
                    <span className="text-sky-300"> [in progress]</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
