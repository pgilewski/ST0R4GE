import React, { useState, useEffect } from 'react'

const Tags = (props) => {
  const { editMode, full, labelsToState, setLabelsToState } = props

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

  // useEffect(() => {
  //   if (labels && full === false && labels.length > 5) {
  //     const newLabels = labels.slice(0, 5)
  //     newLabels.push('...')
  //     setLabelsGallery(newLabels)
  //   } else {
  //   }
  // }, [])

  const deleteTag = (e) => {
    const id = e.target.getAttribute('name')
    const newLabels = labelsToState.filter(
      (item, index) => index !== parseInt(id),
    )
    console.log(newLabels)
    setLabelsToState(newLabels)
  }

  const [newLabel, setNewLabel] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newLabels = labelsToState

      newLabels.push(newLabel)

      setLabelsToState(newLabels)

      setNewLabel('')
    }
  }

  return (
    <div>
      <div>
        {
          <div>
            {labelsToState
              ? labelsToState.map((label, i) => {
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
                      {label}
                    </div>
                  )
                })
              : null}{' '}
            {editMode ? (
              <input
                onKeyDown={handleKeyDown}
                type="text"
                value={newLabel || ''}
                onChange={(e) => setNewLabel(e.target.value)}
                className="border border-gray-400 px-2 mt-2"
              />
            ) : null}{' '}
          </div>
        }
        <div className="inline-flex "></div>
      </div>
    </div>
  )
}

export default Tags
