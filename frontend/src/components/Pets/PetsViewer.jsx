import React, { useState } from 'react';
import AdoptForm from '../AdoptForm/AdoptForm';

const PetsViewer = ({ pet }) => {
  const [showPopup, setShowPopup] = useState(false);

  // const formatTimeAgo = (updatedAt) => {
  //   return formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
  // };

  return (
    <>
      <div className="card h-100 shadow-sm">
        <img
          // src={`${process.env.REACT_APP_API_URL}/images/${pet.filename}`}
          //src={pet.filename}
          src={"src/assets/homepageDog.png"}
          className="card-img-top"
          alt={pet.name}
          style={{ height: "200px", objectFit: "fill" }}
        />

        <div className="card-body">
          <h5 className="card-title text-warning">{pet.name}</h5>
          <p className="card-text"><b>Category:</b> {pet.category}</p>
          <p className="card-text"><b>Breed:</b> {pet.breed}</p>
          <p className="card-text"><b>Age:</b> {pet.age}</p>
          <p className="card-text"><b>Gender:</b> {pet.gender}</p>
          <p className="card-text"><b>Location:</b> {pet.location}</p>
        </div>

        <div className="card-footer bg-white border-0 text-center">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => setShowPopup(true)}
          >
            Show Interest <i className="fa fa-paw"></i>
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adopt {pet.name}</h5>
                <button className="btn-close" onClick={() => setShowPopup(false)}></button>
              </div>
              <div className="modal-body">
                <AdoptForm closeForm={() => setShowPopup(false)} pet={pet} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetsViewer;