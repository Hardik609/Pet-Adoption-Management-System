import React, { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import AdoptionFormCard from './AdoptionFormCard';

const AdoptingRequests = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { user } = useAuthContext();

  const fetchForms = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/forms`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch forms');

      const data = await response.json();
      setForms(data);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleApprove = async (formId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/forms/${formId}/approve`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        alert('Form approved successfully!');
        fetchForms();
      }

    } catch (error) {
      console.error('Error approving form:', error);
    }
  };

  const handleReject = async (formId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/forms/${formId}/reject`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        alert('Form rejected successfully!');
        fetchForms();
      }

    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  // ✅ FIXED SEARCH FIELDS BASED ON YOUR JAVA ENTITY
  const filteredForms = forms.filter(form => {

    const matchesSearch =
      form.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.phoneNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.petId?.toString().toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'all') return matchesSearch;
    if (filterType === 'pending') return matchesSearch && form.status === 'pending';
    if (filterType === 'approved') return matchesSearch && form.status === 'approved';
    if (filterType === 'rejected') return matchesSearch && form.status === 'rejected';

    return matchesSearch;
  });

  const stats = {
    total: forms.length,
    pending: forms.filter(f => f.status === 'pending').length,
    approved: forms.filter(f => f.status === 'approved').length,
    rejected: forms.filter(f => f.status === 'rejected').length
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">
            <i className="bi bi-heart me-2"></i>
            Adoption Requests
          </h4>
          <p className="text-muted mb-0">
            Manage and review pet adoption applications
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={fetchForms}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card border-start border-primary border-4">
            <div className="card-body">
              <h6 className="text-muted">Total</h6>
              <h3 className="mb-0">{stats.total}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-start border-warning border-4">
            <div className="card-body">
              <h6 className="text-muted">Pending</h6>
              <h3 className="mb-0">{stats.pending}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-start border-success border-4">
            <div className="card-body">
              <h6 className="text-muted">Approved</h6>
              <h3 className="mb-0">{stats.approved}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-start border-danger border-4">
            <div className="card-body">
              <h6 className="text-muted">Rejected</h6>
              <h3 className="mb-0">{stats.rejected}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">

            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by email, phone or pet ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          Loading adoption requests...
        </div>

      ) : filteredForms.length > 0 ? (

        <div className="row g-3">
          {filteredForms.map((form) => (
            <div className="col-xl-6" key={form.id}>

              <AdoptionFormCard
                application={form}
                onApprove={() => handleApprove(form.id)}
                onReject={() => handleReject(form.id)}
              />

            </div>
          ))}
        </div>

      ) : (
        <div className="text-center py-5">
          No Adoption Requests Found
        </div>
      )}

    </div>
  );
};

export default AdoptingRequests;
