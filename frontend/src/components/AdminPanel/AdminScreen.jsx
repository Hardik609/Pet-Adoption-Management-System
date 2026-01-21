import React, { useState } from 'react';
import AdoptingRequests from './AdoptingRequests';
import AdoptedHistory from './AdoptedHistory';
import ApprovedRequests from './ApprovedRequests';
import Dashboard from './Dashboard';

const AdminScreen = () => {
  const [screen, setScreen] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2', color: 'primary' },
    { key: 'approvedRequests', label: 'Approved Pets', icon: 'bi-check-circle', color: 'success' },
    { key: 'adoptingPet', label: 'Adoption Requests', icon: 'bi-heart', color: 'warning' },
    { key: 'adoptedHistory', label: 'Adopted History', icon: 'bi-clock-history', color: 'info' }
  ];

  return (
    <div className="row g-3">
      {/* Sidebar */}
      <div className="col-lg-3 col-xl-2">
        <div className="card shadow-sm h-100">
          <div className="card-header bg-white border-bottom">
            <h5 className="mb-0">
              <i className="bi bi-menu-button-wide me-2 text-primary"></i>
              Navigation Menu
            </h5>
          </div>
          <div className="list-group list-group-flush rounded-0">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`list-group-item list-group-item-action d-flex align-items-center py-3 ${
                  screen === item.key ? 'active' : ''
                }`}
                onClick={() => setScreen(item.key)}
              >
                <i className={`bi ${item.icon} me-3 fs-5 text-${item.color}`}></i>
                <span className="fw-medium">{item.label}</span>
                {screen === item.key && (
                  <i className="bi bi-chevron-right ms-auto"></i>
                )}
              </button>
            ))}
          </div>
          
          {/* Stats Summary */}
          <div className="card border-0 mt-3">
            <div className="card-body bg-light rounded">
              <h6 className="card-title text-muted mb-3">
                <i className="bi bi-info-circle me-2"></i>
                Quick Stats
              </h6>
              <div className="row g-2">
                <div className="col-6">
                  <div className="bg-white p-2 rounded text-center">
                    <small className="text-muted d-block">Today</small>
                    <span className="fw-bold">12</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-white p-2 rounded text-center">
                    <small className="text-muted d-block">This Week</small>
                    <span className="fw-bold">48</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="col-lg-9 col-xl-10">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-header bg-white border-bottom py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">
                  <i className={`bi ${menuItems.find(item => item.key === screen)?.icon} me-2 text-primary`}></i>
                  {menuItems.find(item => item.key === screen)?.label}
                </h4>
                <p className="text-muted mb-0">
                  Manage and monitor pet adoption system activities
                </p>
              </div>
              <span className="badge bg-primary bg-gradient px-3 py-2">
                <i className="bi bi-shield-check me-1"></i>
                Admin Mode
              </span>
            </div>
          </div>
          
          <div className="card-body p-4">
            <div className="content-area">
              {screen === 'dashboard' && <Dashboard />}
              {screen === 'approvedRequests' && <ApprovedRequests />}
              {screen === 'adoptingPet' && <AdoptingRequests />}
              {screen === 'adoptedHistory' && <AdoptedHistory />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;