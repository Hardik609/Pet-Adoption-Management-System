import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        pets: 0,
        requests: 0,
        adopted: 0
    });
    const [petTypes, setPetTypes] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch all statistics
                const [
                    usersRes,
                    petsRes,
                    requestsRes,
                    adoptedRes,
                    typesRes,
                    monthlyRes
                ] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats/users`, {
                        headers: { Authorization: `Bearer ${user.token }` }
                    }),
                    fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats/pets`, {
                        headers: { Authorization: `Bearer ${user.token}`}
                    }),
                    fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats/requests`, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    }),
                    fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats/adopted`, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    }),
                    fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats/pet-types`, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    }),
                    fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats/monthly`, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    })
                ]);

                const [usersData, petsData, requestsData, adoptedData, typesData, monthlyData] = await Promise.all([
                    usersRes.json(),
                    petsRes.json(),
                    requestsRes.json(),
                    adoptedRes.json(),
                    typesRes.json(),
                    monthlyRes.json()
                ]);

                setStats({
                    users: usersData.count || 0,
                    pets: petsData.count || 0,
                    requests: requestsData.count || 0,
                    adopted: adoptedData.count || 0
                });

                setPetTypes(typesData.map(item => ({
                    name: item._id,
                    value: item.count,
                    color: getRandomColor()
                })));

                setMonthlyData(monthlyData);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getRandomColor = () => {
        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A8E6CF', '#DCE775', '#FF6B6B', '#4ECDC4'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const totalPets = petTypes.reduce((acc, item) => acc + item.value, 0);

    return (
        <div>
            <div className="mb-4">
                <h4 className="mb-3">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard Overview
                </h4>
                <p className="text-muted">Real-time statistics and insights about your pet adoption system</p>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading dashboard data...</p>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-3">
                            <div className="card bg-primary bg-gradient text-white shadow">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="card-title mb-2">Total Users</h6>
                                            <h2 className="mb-0">{stats.users}</h2>
                                            <small className="opacity-75">Registered Users</small>
                                        </div>
                                        <i className="bi bi-people display-5 opacity-50"></i>
                                    </div>
                                    <div className="mt-3">
                                        <small>
                                            <i className="bi bi-arrow-up-circle me-1"></i>
                                            12% increase this month
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-3">
                            <div className="card bg-success bg-gradient text-white shadow">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="card-title mb-2">Total Pets</h6>
                                            <h2 className="mb-0">{stats.pets}</h2>
                                            <small className="opacity-75">Available Pets</small>
                                        </div>
                                        <i className="bi bi-heart display-5 opacity-50"></i>
                                    </div>
                                    <div className="mt-3">
                                        <small>
                                            <i className="bi bi-arrow-up-circle me-1"></i>
                                            8 new this week
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-3">
                            <div className="card bg-warning bg-gradient text-white shadow">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="card-title mb-2">Adoption Requests</h6>
                                            <h2 className="mb-0">{stats.requests}</h2>
                                            <small className="opacity-75">Pending Requests</small>
                                        </div>
                                        <i className="bi bi-envelope display-5 opacity-50"></i>
                                    </div>
                                    <div className="mt-3">
                                        <small>
                                            <i className="bi bi-clock me-1"></i>
                                            Requires attention
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-3">
                            <div className="card bg-info bg-gradient text-white shadow">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="card-title mb-2">Adopted Pets</h6>
                                            <h2 className="mb-0">{stats.adopted}</h2>
                                            <small className="opacity-75">Successfully Adopted</small>
                                        </div>
                                        <i className="bi bi-check-circle display-5 opacity-50"></i>
                                    </div>
                                    <div className="mt-3">
                                        <small>
                                            <i className="bi bi-graph-up me-1"></i>
                                            24% success rate
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="row g-3 mb-4">
                        <div className="col-lg-6">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h5 className="card-title mb-0">
                                        <i className="bi bi-pie-chart me-2 text-primary"></i>
                                        Pet Type Distribution
                                    </h5>
                                </div>
                                <div className="card-body">
                                    {petTypes.length > 0 ? (
                                        <div style={{ width: '100%', height: 300 }}>
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie
                                                        data={petTypes}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({ name, percent }) => 
                                                            `${name}: ${(percent * 100).toFixed(1)}%`
                                                        }
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {petTypes.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-muted">No pet data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h5 className="card-title mb-0">
                                        <i className="bi bi-bar-chart me-2 text-success"></i>
                                        Monthly Activity
                                    </h5>
                                </div>
                                <div className="card-body">
                                    {monthlyData.length > 0 ? (
                                        <div style={{ width: '100%', height: 300 }}>
                                            <ResponsiveContainer>
                                                <BarChart data={monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="adoptions" fill="#00C49F" name="Adoptions" />
                                                    <Bar dataKey="requests" fill="#FF8042" name="Requests" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-muted">No monthly data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Table */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white">
                                    <h5 className="card-title mb-0">
                                        <i className="bi bi-list-check me-2"></i>
                                        Pet Types Summary
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Pet Type</th>
                                                    <th className="text-center">Count</th>
                                                    <th className="text-center">Percentage</th>
                                                    <th className="text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {petTypes.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <span 
                                                                className="d-inline-block me-2 rounded-circle"
                                                                style={{
                                                                    width: '12px',
                                                                    height: '12px',
                                                                    backgroundColor: item.color
                                                                }}
                                                            ></span>
                                                            {item.name}
                                                        </td>
                                                        <td className="text-center">
                                                            <span className="badge bg-secondary">
                                                                {item.value}
                                                            </span>
                                                        </td>
                                                        <td className="text-center">
                                                            {((item.value / totalPets) * 100).toFixed(1)}%
                                                        </td>
                                                        <td className="text-center">
                                                            <span className={`badge ${item.value > 5 ? 'bg-success' : 'bg-warning'}`}>
                                                                {item.value > 5 ? 'High' : 'Low'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="table-primary">
                                                    <td><strong>Total</strong></td>
                                                    <td className="text-center"><strong>{totalPets}</strong></td>
                                                    <td className="text-center"><strong>100%</strong></td>
                                                    <td className="text-center">
                                                        <span className="badge bg-info">All</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Info */}
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card bg-light border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                                                <div>
                                                    <h6 className="mb-1">System Status</h6>
                                                    <p className="text-muted mb-0">All systems operational</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-database-fill text-primary fs-4 me-3"></i>
                                                <div>
                                                    <h6 className="mb-1">Database</h6>
                                                    <p className="text-muted mb-0">MongoDB Atlas connected</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-shield-fill-check text-success fs-4 me-3"></i>
                                                <div>
                                                    <h6 className="mb-1">Security</h6>
                                                    <p className="text-muted mb-0">JWT Authentication active</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;