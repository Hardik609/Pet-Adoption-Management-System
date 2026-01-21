import React from 'react'
import AdoptSection from './AdoptSection'
import PostPetSection from './PostPetSection'
import SubmitPet from "./SubmitPet";

const Services = () => {
  return (
    <div className='container'>

      <div className='row'>
        <div className='col-md-6 d-flex align-items-center'>
          <AdoptSection/>
        </div>

        <div className='col-md-6 d-flex align-items-center'>
          <PostPetSection/>
        </div>
      </div>

      {/* 🔥 ADD THIS PART */}
      <div className='row mt-5'>
        <div className='col-12'>
          <SubmitPet />
        </div>
      </div>

    </div>
  )
}

export default Services
