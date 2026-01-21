import React, { useState, useEffect, useCallback } from 'react';
import PetCard from './PetCard';
import { useAuthContext } from '../../hooks/useAuthContext';

const ApprovedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [petType, setPetType] = useState('all');
  const { user } = useAuthContext();

  const fetchRequests = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/pets/approved`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch approved pets');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const uniquePetTypes = ['all', ...new Set(requests.map(pet => pet.type))];

  const filteredRequests = requests.filter(pet => {
    const matchesSearch = pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = petType === 'all' || pet.type === petType;
    
    return matchesSearch && matchesType;
  });

  const handleDelete = async (petId) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.ok) {
        alert('Pet deleted successfully!');
        fetchRequests();
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">
            <i className="bi bi-check-circle me-2"></i>
            Approved Pets
          </h4>
          <p className="text-muted mb-0">Manage pets available for adoption</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={fetchRequests}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Refresh
        </button>
      </div>

      {/* Stats Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">Available for Adoption</h5>
                  <p className="text-muted mb-0">
                    <i className="bi bi-info-circle me-1"></i>
                    These pets have been approved and are ready for adoption
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary fs-6 px-3 py-2 me-3">
                    {requests.length} Pet{requests.length !== 1 ? 's' : ''}
                  </span>
                  <span className="badge bg-success fs-6 px-3 py-2">
                    <i className="bi bi-check-lg me-1"></i>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search pets by name, type, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex gap-2">
                <select 
                  className="form-select"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  {uniquePetTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setPetType('all');
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading approved pets...</p>
        </div>
      ) : filteredRequests.length > 0 ? (
        <>
          <div className="alert alert-info mb-3">
            <i className="bi bi-info-circle me-2"></i>
            Showing {filteredRequests.length} of {requests.length} approved pets
            {petType !== 'all' && ` (${petType})`}
            {searchTerm && ` for search: "${searchTerm}"`}
          </div>
          
          <div className="row">
            {filteredRequests.map((request) => (
              <div className="col-lg-6 mb-4" key={request._id}>
                <PetCard
                  pet={request}
                  updateCards={fetchRequests}
                  deleteBtnText="Remove Pet"
                  showDelete={true}
                  onDelete={() => handleDelete(request._id)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-emoji-frown display-1 text-muted mb-3"></i>
          <h4>No Approved Pets Found</h4>
          <p className="text-muted">
            {searchTerm || petType !== 'all' 
              ? 'No pets match your search criteria.' 
              : 'There are currently no approved pets available for adoption.'}
          </p>
          {(searchTerm || petType !== 'all') && (
            <button
              className="btn btn-outline-primary mt-2"
              onClick={() => {
                setSearchTerm('');
                setPetType('all');
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i>
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovedRequests;