import React, { useState, useEffect } from 'react'

const Tags = (props) => {
  const { editMode, full, labelsToState, setLabelsToState, labels } = props

  /*   if (props.labels) {
    //tagi wyswietlane w galerii
    const labels = props.labels
    const setLabels = props.setLabels
    return [labels, setLabels]
  } else if (props.labelsToState) {
    //tagi w modalu
    const labels = props.labelsToState
    const setLabels = props.setLabelsToState
    return [labels, setLabels]
  }
 */

  const [labelsGallery, setLabelsGallery] = useState(labels)

  useEffect(() => {
    if (full === false && labels.length > 5) {
      const newLabels = labels.slice(0, 5)
      newLabels.push('...')
      setLabelsGallery(newLabels)
    } else {
    }
  }, [])

  const deleteTag = (e) => {
    const id = e.target.getAttribute('name')
    const newLabels = labelsToState.filter(
      (item, index) => index !== parseInt(id),
    )
    setLabelsToState(newLabels)
  }
  const [newLabel, setNewLabel] = useState(null)

  const addLabel = (e) => {
    e.preventDefault()
    const newLabels = labelsToState
    newLabels.push(newLabel)
    setLabelsToState(newLabels)
    setNewLabel('')
  }
  return (
    <div>
      <div>
        {labels ? (
          labelsGallery.map((label, i) => {
            return (
              <div
                key={i}
                className="mb-1 ml-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border"
              >
                {label}
              </div>
            )
          })
        ) : (
          <div>
            {labelsToState.map((label, i) => {
              return (
                <div
                  key={i}
                  className="mb-1 ml-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border"
                >
                  {editMode ? (
                    <span
                      name={i}
                      className="text-red-600 mr-1 cursor-pointer"
                      onClick={deleteTag}
                    >
                      x
                    </span>
                  ) : null}
                  {/*               {label === '...' ? null : (
                <></>
                          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-hard-drive mr-2"
                >
                  <line x1="22" y1="12" x2="2" y2="12" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                  <line x1="6" y1="16" x2="6.01" y2="16" />
                  <line x1="10" y1="16" x2="10.01" y2="16" />
                </svg> 
              )} */}

                  {label}
                </div>
              )
            })}{' '}
            {editMode ? (
              <form onSubmit={addLabel}>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="border border-gray-400 px-2 mt-2"
                />
              </form>
            ) : null}{' '}
          </div>
        )}
        <div className="inline-flex "></div>
      </div>
    </div>
  )
}

export default Tags
