import React from 'react'
import { FaFileAlt } from 'react-icons/fa'

function Base64Image(imageBase64, altText) {
  const Image = ({ data }) => (
    <img
      alt={altText}
      src={`data:image/jpeg;base64,${data}`}
    />
  )

  return (
    <>
      {imageBase64 ? (
        <Image
          data={imageBase64}
        />
      ) : (
        <FaFileAlt />
      )}
    </>
  )
}

export default Base64Image
