import React from 'react'
import RatingBar from '../../components/RatingBar'

const HomeView = () => {
  return (
    <>
      <h1>Home</h1>
      <RatingBar rating={80} diameter={100} />
    </>
    
  )
}

export default HomeView