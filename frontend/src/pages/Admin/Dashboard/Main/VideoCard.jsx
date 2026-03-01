import React from 'react'

const VideoCard = ({ image, title, date, comment }) => {
  return (
    <>
    <div className='flex items-center w-[90%] mt-5 '>
      <div>
      <img src={image} alt={title} className='h-[3rem]' />
      </div>

      <div className='ml-4'>
        <h2 className='text-lg text-white '>{title}</h2>
        <p className='text-gray-500 mb-3'>{date}</p>
      </div>

      <div className='flex-grow mb-5 flex justify-end items-center'>
        <div className='text-white text-lg'>{comment}</div>
      </div>
    </div>
</>
  )
}

export default VideoCard
