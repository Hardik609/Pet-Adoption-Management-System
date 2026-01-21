// import React, { useState, useEffect } from "react";
// import { assets } from "../../assets/assets";
// import { useAuthContext } from "../../hooks/useAuthContext";

// const PostPetSection = () => {
//   const { user } = useAuthContext();

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [area, setArea] = useState("");
//   const [justification, setJustification] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [type, setType] = useState("None");
//   const [picture, setPicture] = useState(null);
//   const [fileName, setFileName] = useState("");

//   const [formError, setFormError] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const togglePopup = () => setShowPopup(!showPopup);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPicture(file);
//       setFileName(file.name);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !age || !area || !justification || !email || !phone || type === "None") {
//       setFormError(true);
//       return;
//     }

//     setIsSubmitting(true);

//     // -----------------------------
//     // FRONTEND-ONLY POST STORAGE
//     // -----------------------------
//     const newPetPost = {
//       name,
//       age,
//       area,
//       justification,
//       email,
//       phone,
//       type,
//       fileName,
//       picturePreview: picture ? URL.createObjectURL(picture) : null,
//     };

//     const existing = JSON.parse(localStorage.getItem("postedPets")) || [];
//     existing.push(newPetPost);
//     localStorage.setItem("postedPets", JSON.stringify(existing));

//     // Reset form
//     setAge("");
//     setArea("");
//     setJustification("");
//     setPhone("");
//     setType("None");
//     setFileName("");
//     setPicture(null);
//     setFormError(false);

//     setTimeout(() => {
//       setIsSubmitting(false);
//       setShowPopup(true);
//     }, 500);
//   };

//   return (
//     <section className="container my-5">

//       <div className="text-center mb-4">
//         <h2 className="fw-bold">Post a Pet for Adoption</h2>
//         <img
//           src={assets.postPet}
//           alt="Pet Looking for a Home"
//           className="img-fluid w-50 mt-3 rounded shadow"
//         />
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         className="p-4 border rounded shadow-sm bg-light"
//       >
//         <div className="row">

//           {/* Name */}
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Name</label>
//             <input type="text" value={name} className="form-control" readOnly />
//           </div>

//           {/* Age */}
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Pet Age</label>
//             <input
//               type="text"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="form-control"
//             />
//           </div>

//           {/* Picture */}
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Picture</label>
//             <label className="form-control d-flex justify-content-between align-items-center">
//               <span>{fileName || "Choose a Picture"}</span>
//               <input type="file" accept="image/*" className="d-none" onChange={handleFileChange} />
//               <i className="fa fa-upload"></i>
//             </label>
//           </div>

//           {/* Location */}
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Location</label>
//             <input
//               type="text"
//               value={area}
//               onChange={(e) => setArea(e.target.value)}
//               className="form-control"
//             />
//           </div>

//           {/* Type */}
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Type</label>
//             <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
//               <option value="None">Choose Type</option>
//               <option value="Dog">Dog</option>
//               <option value="Cat">Cat</option>
//               <option value="Rabbit">Rabbit</option>
//               <option value="Bird">Bird</option>
//               <option value="Fish">Fish</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* Justification */}
//           <div className="col-12 mb-3">
//             <label className="form-label fw-bold">Why do you want to give this pet?</label>
//             <textarea
//               rows="4"
//               value={justification}
//               onChange={(e) => setJustification(e.target.value)}
//               className="form-control"
//             ></textarea>
//           </div>

//           <h4 className="mt-3">Contact Information</h4>

//           {/* Email */}
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Email</label>
//             <input type="text" value={email} className="form-control" readOnly />
//           </div>

//           {/* Phone */}
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Phone Number</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="form-control"
//             />
//           </div>
//         </div>

//         {/* Form Error */}
//         {formError && (
//           <p className="text-danger fw-semibold">Please fill all required fields.</p>
//         )}

//         {/* Submit */}
//         <button type="submit" className="btn btn-primary px-4 py-2 mt-3" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Submit Your Pet"}
//         </button>

//         {/* Success Popup */}
//         {showPopup && (
//           <div className="alert alert-success mt-4 d-flex justify-content-between align-items-center">
//             <span>Your pet post has been saved locally!</span>
//             <button onClick={togglePopup} className="btn btn-sm btn-danger">
//               <i className="fa fa-times"></i>
//             </button>
//           </div>
//         )}
//       </form>
//     </section>
//   );
// };

// export default PostPetSection;


// import React, { useEffect, useState } from 'react'
// import { assets } from '../../assets/assets'
// import { useAuthContext } from '../../hooks/useAuthContext'

// const PostPetSection = () => {
//   const { user } = useAuthContext();
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("None");
//   const [breed, setBreed] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("None");
//   const [location, setLocation] = useState("");
//   const [justification, setJustification] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [formError, setFormError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [ageError, setAgeError] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
  
//   const [picture, setPicture] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//     }
//   }, [user]);


//   useEffect(() => {
//     if (!isSubmitting) {
//       setEmailError(false);
//       setAgeError(false);
//       setFormError(false);
//     }
//   }, [isSubmitting]);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setPicture(selectedFile);
//       setFileName(selectedFile.name);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !name ||
//       category === "None" ||
//       !breed ||
//       !age ||
//       gender === "None" ||
//       !location ||
//       !justification ||
//       !email ||
//       !phone ||
      
//       ageError
//     ) {
//       setFormError(true);
//       return;
//     }

//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("category", category);
//     formData.append("breed", breed);
//     formData.append("age", age);
//     formData.append("gender", gender);
//     formData.append("location", location);
//     formData.append("justification", justification);
//     formData.append("email", email);
//     formData.append("phone", phone);

//     if (picture) {
//       formData.append("fileName", fileName);
//     }

//     try {
//       const payload = {
//         name,
//         category,
//         breed,
//         age,
//         gender,
//         fileName,
//         location,
//         justification,
//         email,
//         phone
//       };

//       const response = await fetch(`${import.meta.env.VITE_API_URL}/pets`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`
//         },
//         body: JSON.stringify(payload)
//       });


//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       console.log("Form submitted successfully");
//       setShowPopup(true);

//       setEmailError(false);
//       setFormError(false);
//       setName("");
//       setCategory("");
//       setBreed("");
//       setAge("");
//       setGender("");
//       setPicture(null);
//       setLocation("");
//       setJustification("");
//       setEmail("");
//       setPhone("");
      
//       setFileName("");
//       togglePopup();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   return (
//     <div>
//       <section className="container my-5">
//         <div className="text-center mb-4">
//           <h2 className="fw-bold text-warning">Post a Pet for Adoption</h2><hr />
//           <img src={assets.postPet} alt="Pet Looking for a Home" className="img-fluid w-50 mt-3 rounded " />
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           className="p-4 border rounded shadow-sm bg-light"
//         >
//           <div className="row">
//             {/* Name */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Name</label>
//               <input type="text" value={user.name} className="form-control" readOnly />
//             </div>

//             {/* Category */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Category</label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="form-select"
//               >
//                 <option value="None">None</option>
//                 <option value="Dog">Dog</option>
//                 <option value="Cat">Cat</option>
//                 <option value="Rabbit">Rabbit</option>
//                 <option value="Bird">Bird</option>
//                 <option value="Fish">Fish</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Breed */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Breed</label>
//               <input
//                 type="text"
//                 value={breed}
//                 onChange={(e) => setBreed(e.target.value)}
//                 className="form-control"
//               />
//             </div>

//             {/* Age */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Pet Age</label>
//               <input
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 className="form-control"
//               />
//             </div>

//             {/* Gender */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Gender</label>
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="form-select"
//               >
//                 <option value="None">None</option>
//                 <option value="M">Male</option>
//                 <option value="F">Female</option>
//                 <option value="U">Other</option>
//               </select>
//             </div>

//             {/* Picture */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Picture</label>
//               <label className="form-control d-flex justify-content-between align-items-center">
//                 <span>{fileName || "Choose a Picture"}</span>
//                 <input
//                   className="d-none"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//                 <i className="fa fa-upload"></i>
//               </label>
//             </div>

//             {/* Location */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Location</label>
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="form-control"
//               />
//             </div>  

//             {/* Justification */}
//             <div className="col-12 mb-3">
//               <label className="form-label fw-bold">Justification for giving a pet</label>
//               <textarea
//                 rows="4"
//                 value={justification}
//                 onChange={(e) => setJustification(e.target.value)}
//                 className="form-control"
//               ></textarea>
//             </div>

//             <h4 className="mt-3">Contact Information</h4>

//             {/* Email */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Email</label>
//               <input type="text" value={user.email} className="form-control" readOnly />
//             </div>

//             {/* Phone */}
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Phone Number</label>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//           </div>

//           {/* Errors */}
//           {emailError && (
//             <p className="text-danger fw-semibold">Please provide a valid email address.</p>
//           )}
//           {formError && (
//             <p className="text-danger fw-semibold">Please fill out all fields correctly.</p>
//           )}

//           {/* Submit button */}
//           <div className='d-flex justify-content-center'>
//             <button
//               type="submit"
//               className="btn btn-warning rounded-pill text-white btn-lg px-4 py-2 mt-3"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Submit Your Pet"}
//             </button>
//           </div>


//           {/* Popup */}
//           {showPopup && (
//             <div className="alert alert-success mt-4 d-flex justify-content-between align-items-center">
//               <span>Application Submitted! We'll get in touch with you soon</span>
//               <button onClick={togglePopup} className="btn btn-sm btn-success">
//                 <i className="fa fa-times"></i>
//               </button>
//             </div>
//           )}
//         </form>
//       </section>
//     </div>
//   )
// }

// export default PostPetSection

import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAuthContext } from '../../hooks/useAuthContext'

const PostPetSection = () => {

  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("None");
  const [location, setLocation] = useState("");
  const [justification, setJustification] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");

  const [formError, setFormError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    console.log("Selected File:", selectedFile);

    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
      setFormError(false);
    }
  };

  // 🔥 SUBMIT FUNCTION WITH DEBUG
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ===== EXACT DEBUG YOU ASKED =====
    console.log("SUBMIT CLICKED");

    console.log({
      category,
      breed,
      age,
      gender,
      location,
      justification,
      phone,
      picture
    });
    // =================================

    if (
      !name ||
      category === "None" ||
      !breed ||
      !age ||
      gender === "None" ||
      !location ||
      !justification ||
      !email ||
      !phone ||
      !picture
    ) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("breed", breed);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("location", location);
      formData.append("description", justification);
      formData.append("email", email);
      formData.append("phone", phone);

      // IMAGE FILE
      formData.append("file", picture);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pets/submit`,
        {
          method: "POST",
          body: formData
        }
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || "Failed to submit");
      }

      // SUCCESS
      setShowPopup(true);
      setFormError(false);

      // RESET
      setCategory("None");
      setBreed("");
      setAge("");
      setGender("None");
      setPicture(null);
      setLocation("");
      setJustification("");
      setPhone("");
      setFileName("");

    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="container my-5">

        <div className="text-center mb-4">
          <h2 className="fw-bold text-warning">
            Post a Pet for Adoption
          </h2>
          <hr />

          <img
            src={assets.postPet}
            className="img-fluid w-50 mt-3 rounded"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow-sm bg-light"
        >

          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Name</label>
              <input
                value={user?.name}
                className="form-control"
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option>None</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Rabbit</option>
                <option>Bird</option>
                <option>Fish</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Breed</label>
              <input
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-select"
              >
                <option>None</option>
                <option>M</option>
                <option>F</option>
                <option>U</option>
              </select>
            </div>

            {/* IMAGE INPUT */}
            <div className="col-md-6 mb-3">
              <label>Picture</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />

              {fileName && (
                <small className="text-success">
                  Selected: {fileName}
                </small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label>Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-12 mb-3">
              <label>Justification</label>
              <textarea
                rows="4"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                value={user?.email}
                className="form-control"
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
              />
            </div>

          </div>

          {formError && (
            <p className="text-danger">
              Please fill all fields + image
            </p>
          )}

          <div className='d-flex justify-content-center'>
            <button
              type="submit"
              className="btn btn-warning text-white"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Your Pet"}
            </button>
          </div>

          {showPopup && (
            <div className="alert alert-success mt-4">
              Application Submitted! We'll contact you soon.
            </div>
          )}

        </form>
      </section>
    </div>
  )
}

export default PostPetSection;
