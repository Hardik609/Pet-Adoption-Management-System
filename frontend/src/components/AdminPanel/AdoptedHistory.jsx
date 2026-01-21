import React, { useState, useEffect, useCallback } from 'react';
import PetCard from './PetCard';
import { useAuthContext } from '../../hooks/useAuthContext';

const AdoptedHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  const { user } = useAuthContext();

  const fetchAdoptedPets = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/pets/adopted`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch adopted pets');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching adopted pets:', error);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchAdoptedPets();
  }, [fetchAdoptedPets]);

  const filterByTime = (pet) => {
    const adoptedDate = new Date(pet.adoptedAt);
    const now = new Date();
    const diffDays = Math.floor((now - adoptedDate) / (1000 * 60 * 60 * 24));
    
    switch(timeFilter) {
      case 'today': return diffDays === 0;
      case 'week': return diffDays <= 7;
      case 'month': return diffDays <= 30;
      case 'year': return diffDays <= 365;
      default: return true;
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && filterByTime(request);
  });

  const stats = {
    total: requests.length,
    thisMonth: requests.filter(pet => {
      const adoptedDate = new Date(pet.adoptedAt);
      const now = new Date();
      return (now - adoptedDate) <= (30 * 24 * 60 * 60 * 1000);
    }).length,
    thisWeek: requests.filter(pet => {
      const adoptedDate = new Date(pet.adoptedAt);
      const now = new Date();
      return (now - adoptedDate) <= (7 * 24 * 60 * 60 * 1000);
    }).length,
    today: requests.filter(pet => {
      const adoptedDate = new Date(pet.adoptedAt);
      const now = new Date();
      return adoptedDate.toDateString() === now.toDateString();
    }).length
  };

  return (
    <div>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">
            <i className="bi bi-clock-history me-2"></i>
            Adopted Pets History
          </h4>
          <p className="text-muted mb-0">View and manage all previously adopted pets</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={fetchAdoptedPets}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-start border-info border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">Total Adopted</h6>
                  <h3 className="mb-0">{stats.total}</h3>
                </div>
                <i className="bi bi-check-all fs-3 text-info"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-success border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">This Month</h6>
                  <h3 className="mb-0">{stats.thisMonth}</h3>
                </div>
                <i className="bi bi-calendar-month fs-3 text-success"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-warning border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">This Week</h6>
                  <h3 className="mb-0">{stats.thisWeek}</h3>
                </div>
                <i className="bi bi-calendar-week fs-3 text-warning"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-primary border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">Today</h6>
                  <h3 className="mb-0">{stats.today}</h3>
                </div>
                <i className="bi bi-calendar-day fs-3 text-primary"></i>
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
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setTimeFilter('all');
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pets List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading adopted pets history...</p>
        </div>
      ) : filteredRequests.length > 0 ? (
        <>
          <div className="alert alert-info mb-3">
            <i className="bi bi-info-circle me-2"></i>
            Showing {filteredRequests.length} of {requests.length} adopted pets
            {timeFilter !== 'all' && ` (${timeFilter})`}
            {searchTerm && ` for search: "${searchTerm}"`}
          </div>
          
          <div className="row">
            {filteredRequests.map((request) => (
              <div className="col-lg-6 mb-4" key={request._id}>
                <PetCard
                  pet={request}
                  updateCards={fetchAdoptedPets}
                  deleteBtnText="Delete History"
                  showDelete={true}
                  adoptedView={true}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-inbox display-1 text-muted mb-3"></i>
          <h4>No Adopted Pets Found</h4>
          <p className="text-muted">
            {searchTerm || timeFilter !== 'all' 
              ? 'No pets match your search criteria.' 
              : 'No pets have been adopted yet.'}
          </p>
          {(searchTerm || timeFilter !== 'all') && (
            <button
              className="btn btn-outline-primary mt-2"
              onClick={() => {
                setSearchTerm('');
                setTimeFilter('all');
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

export default AdoptedHistory;