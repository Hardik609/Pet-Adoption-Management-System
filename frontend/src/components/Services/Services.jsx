import React from 'react'
import AdoptSection from './AdoptSection'
import PostPetSection from './PostPetSection'

const Services = () => {
  return (
    <div className='container'>
      <div className='row ' >
        <div className='col-md-6 d-flex align-items-center'>
          <AdoptSection/>

        </div>
        <div className='col-md-6 d-flex align-items-center'>
          <PostPetSection/>

        </div>
      </div>
        
        
    </div>
  )
}

export default Services
