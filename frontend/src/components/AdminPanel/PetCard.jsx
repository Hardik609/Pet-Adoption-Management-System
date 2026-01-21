import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../../hooks/useAuthContext';

const PetCard = ({ pet, updateCards, deleteBtnText, showDelete = false, adoptedView = false, onDelete }) => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showDeletedSuccess, setshowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthContext();

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to ${deleteBtnText?.toLowerCase()}?`)) return;
    
    setIsDeleting(true);
    try {
      if (onDelete) {
        await onDelete(pet._id);
      } else {
        const endpoint = adoptedView 
          ? `${process.env.REACT_APP_API_URL}/admin/pets/adopted/${pet._id}`
          : `${process.env.REACT_APP_API_URL}/admin/pets/${pet._id}`;
        
        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) throw new Error('Failed to delete');
      }
      
      setshowDeletedSuccess(true);
      if (updateCards) {
        updateCards();
      }
    } catch (err) {
      setShowErrorPopup(true);
      console.error('Error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const getTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'dog': return 'bi-badge-3d';
      case 'cat': return 'bi-emoji-smile';
      case 'bird': return 'bi-twitter';
      case 'rabbit': return 'bi-heart';
      default: return 'bi-heart';
    }
  };

  return (
    <>
      {showErrorPopup && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Failed to delete. Please try again.
          <button type="button" className="btn-close" onClick={() => setShowErrorPopup(false)}></button>
        </div>
      )}
      
      {showDeletedSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          Successfully deleted!
          <button type="button" className="btn-close" onClick={() => setshowDeletedSuccess(false)}></button>
        </div>
      )}

      <div className="card h-100 border-0 shadow-sm">
        <div className="row g-0 h-100">
          <div className="col-md-5">
            <div className="position-relative h-100">
              <img
                src={pet.filename ? `${process.env.REACT_APP_API_URL}/images/${pet.filename}` : '/placeholder-pet.jpg'}
                className="img-fluid rounded-start h-100 w-100"
                alt={pet.name}
                style={{ objectFit: 'cover', minHeight: '200px' }}
                onError={(e) => {
                  e.target.src = '/placeholder-pet.jpg';
                }}
              />
              <div className="position-absolute top-0 end-0 m-2">
                <span className={`badge ${adoptedView ? 'bg-success' : 'bg-primary'}`}>
                  <i className={`bi ${getTypeIcon(pet.type)} me-1`}></i>
                  {pet.type}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="card-title mb-1">
                    <i className="bi bi-tag me-2"></i>
                    {pet.name}
                  </h5>
                  <div className="d-flex gap-2 mb-2">
                    <span className="badge bg-info">
                      <i className="bi bi-calendar me-1"></i>
                      {pet.age} years
                    </span>
                    <span className="badge bg-secondary">
                      <i className="bi bi-geo-alt me-1"></i>
                      {pet.area}
                    </span>
                  </div>
                </div>
                {adoptedView && pet.adoptedAt && (
                  <div className="text-end">
                    <small className="text-muted">Adopted</small>
                    <div className="text-success">
                      <i className="bi bi-check2-circle"></i>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted mb-2">Owner Details</h6>
                <div className="row g-2">
                  <div className="col-6">
                    <small className="text-muted d-block">Email</small>
                    <p className="mb-0">
                      <i className="bi bi-envelope me-1 small"></i>
                      {pet.email}
                    </p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Phone</small>
                    <p className="mb-0">
                      <i className="bi bi-phone me-1 small"></i>
                      {pet.phone}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted mb-2">Additional Info</h6>
                <div className="row g-2">
                  {pet.breed && (
                    <div className="col-6">
                      <small className="text-muted d-block">Breed</small>
                      <p className="mb-0">{pet.breed}</p>
                    </div>
                  )}
                  {pet.gender && (
                    <div className="col-6">
                      <small className="text-muted d-block">Gender</small>
                      <p className="mb-0">{pet.gender}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {adoptedView && pet.adoptedAt && (
                <div className="mb-3">
                  <small className="text-muted d-block">Adoption Date</small>
                  <p className="mb-0">
                    <i className="bi bi-calendar-check me-1"></i>
                    {formatTimeAgo(pet.adoptedAt)}
                  </p>
                </div>
              )}
              
              {pet.description && (
                <div className="mb-3">
                  <small className="text-muted d-block">Description</small>
                  <p className="mb-0 small">{pet.description}</p>
                </div>
              )}
              
              <div className="mt-auto pt-3">
                {showDelete && (
                  <button
                    className="btn btn-danger w-100"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-trash me-2"></i>
                        {deleteBtnText}
                      </>
                    )}
                  </button>
                )}
                
                {!showDelete && (
                  <small className="text-muted d-block text-center">
                    <i className="bi bi-info-circle me-1"></i>
                    Last updated: {formatTimeAgo(pet.updatedAt)}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetCard;