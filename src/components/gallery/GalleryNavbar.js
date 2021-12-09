export default function GalleryNavbar({
  setSearch,
  setShowNames,
  setSortMethod,
}) {
  function capitalize(input) {
    const CapitalizedWords = []
    //jezeli inoput nie jest pusty I jeżeli nie kończy się spacja
    if (input !== '' && input.charAt(input.length - 1) !== ' ') {
      const words = input.split(' ')
      words.forEach((word) => {
        CapitalizedWords.push(
          word[0].toUpperCase() + word.slice(1, word.length),
        )
      })
      //jezeli kończy się spacją
    } else if (input.charAt(input.length - 1) === ' ') {
      const words = input.split(' ')
      words.pop()
      words.forEach((word) => {
        CapitalizedWords.push(
          word[0].toUpperCase() + word.slice(1, word.length),
        )
      })
    } else {
      //jeżeli jest pusty
    }
    return CapitalizedWords.join(' ')
  }
  const handleSelectChange = (e) => {
    const sortMethod = e.target.value
    if (sortMethod === 'name') {
      setSortMethod(sortMethod)
    } else if (sortMethod === 'oldest') {
      setSortMethod(sortMethod)
    } else if (sortMethod === 'newest') {
      setSortMethod(sortMethod)
    } else if (sortMethod === 'size') {
    }
    //setSortMethod(sortMethod)
  }
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow py-4 ">
        <div className="max-w-7xl mx-auto px-8">
          {/*<div className="md:flex md:items-center md:justify-between md:h-16">
             <div className=" flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    className="text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    href=""
                  >
                    folder1
                  </a>
                  <a
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    href=""
                  >
                    folder2
                  </a>
                  <a
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    href=""
                  >
                    folder3
                  </a>
                </div>
              </div>
            </div> 
            </div>
            */}

          <div className="flex justify justify-between flex-row w-full space-x-3 ">
            <input
              onChange={(e) => {
                setSearch(capitalize(e.target.value))
              }}
              type="text"
              id='"form-subscribe-Search'
              className=" w-48 rounded-lg border-transparent  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="search"
            />
            <div className="flex flex-row">
              <label class="flex items-center mx-2 space-x-2 justify-center align-middle ">
                <div className="ml-4 relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    onChange={setShowNames}
                    type="checkbox"
                    name="toggle"
                    id="Recognition"
                    className="checked:bg-indigo-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="Recognition"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <span class="text-gray-700 dark:text-white font-normal">
                  Show names
                </span>
              </label>
              {/* vertical line */}
              <div className="mx-2">
                <div className=" border border-1 border-gray-300 h-full"></div>
              </div>
              <select
                onChange={handleSelectChange}
                className="w-48 text-gray-500 mx-2  py-2  px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                name="animals"
              >
                <option value="">sort by:</option>
                <option value="name">name</option>
                <option value="oldest">oldest</option>
                <option value="newest">newest</option>
                <option value="size">size</option>
              </select>
            </div>
          </div>
          {/*						<div className="-mr-2 flex md:hidden">
                              <button
                                  className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                  <svg width="20" height="20" fill="currentColor" className="h-8 w-8"
                                       viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                      </path>
                                  </svg>
                              </button>
                          </div>*/}
        </div>
      </nav>
    </div>
  )
}
