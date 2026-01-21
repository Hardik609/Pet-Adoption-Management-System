/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PetsViewer from './PetsViewer';

const Pets = () => {

  const [filter, setFilter] = useState("all");
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchPets = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pets`);
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }

        const text = await res.text();

        if (!text) {
          console.warn("Empty response from /pets");
          setPetsData([]);
          return;
        }

        const data = JSON.parse(text);
        setPetsData(data);
        setLoading(false);

      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError("Failed to load pets");
        setLoading(false);
      }
    };

    fetchPets();

  }, []);

  // ✅ FIXED: use category instead of type
  const filteredPets = petsData.filter((pet) => {
    if (filter === "all") return true;
    return pet.category?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="container my-4">

      {/* Filter */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Pets</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="rabbit">Rabbits</option>
            <option value="bird">Birds</option>
            <option value="fish">Fish</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="row">

        {loading && <p>Loading...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && filteredPets.length > 0 && (
          filteredPets.map((pet, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <PetsViewer pet={pet} />
            </div>
          ))
        )}

        {!loading && filteredPets.length === 0 && (
          <p className="text-center">No pets available</p>
        )}

      </div>

    </div>
  );
};

export default Pets;
