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
        // ✅ PUBLIC API – no token needed
        const res = await fetch("http://localhost:8080/pets");

        const data = await res.json();

        setPetsData(data);
        setLoading(false);

      } catch (err) {
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



// import React, { useEffect, useState } from 'react'
// import { useAuthContext } from '../../hooks/useAuthContext';
// import PetsViewer from './PetsViewer';

// const Pets = () => {
//   const [filter, setFilter] = useState("all");
//   const [petsData, setPetsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuthContext();

//   // useEffect(() => {
//   //   setPetsData(dummyPets);
//   //   setLoading(false);
//   // }, []);

//     useEffect(() => {
//       const fetchPets = async () => {
//         const user = JSON.parse(localStorage.getItem("user"));

//         const res = await fetch(`${import.meta.env.VITE_API_URL}/pets`, {
//           headers: {
//             "Authorization": `Bearer ${user.token}`
//           }
//         });

//         const data = await res.json();
//         setPetsData(data);
//       };

//       fetchPets();
//       setLoading(false);
//     }, []);


//   const filteredPets = petsData.filter((pet) => {
//     if (filter === "all") return true;
//     return pet.type === filter;
//   });

//   return (
//     <div className="container my-4">

//       {/* Filter */}
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <select
//             className="form-select"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="all">All Pets</option>
//             <option value="Dog">Dogs</option>
//             <option value="Cat">Cats</option>
//             <option value="Rabbit">Rabbits</option>
//             <option value="Bird">Birds</option>
//             <option value="Fish">Fish</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//       </div>

//       {/* Pets Grid */}
//       <div className="row">
//         {loading ? (
//           <p>Loading...</p>
//         ) : filteredPets.length > 0 ? (
//           filteredPets.map((pet, index) => (
//             <div className="col-md-3 mb-4" key={index}>
//               <PetsViewer pet={pet} />
//             </div>
//           ))
//         ) : (
//           <p className="text-center">No pets available</p>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Pets;


/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";

// const Pets = () => {
//   const [pets, setPets] = useState([]);

//   useEffect(() => {
//     const fetchPets = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));

//       const res = await fetch(`${import.meta.env.VITE_API_URL}/pets`, {
//         headers: {
//           "Authorization": `Bearer ${user.token}`
//         }
//       });

//       const data = await res.json();
//       setPets(data);
//     };

//     fetchPets();
//   }, []);

//   return (
//     <div>
//       <h2>Available Pets</h2>
//       {pets.map(p => (
//         <div key={p.id}>
//           <h5>{p.name}</h5>
//           <p>{p.category} | {p.age} years</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const adoptPet = async (petId) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   await fetch(`${import.meta.env.VITE_API_URL}/adoptions/${petId}`, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${user.token}`
//     }
//   });

//   alert("Pet adopted successfully");
// };

// export default Pets;