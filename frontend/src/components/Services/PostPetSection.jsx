import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAuthContext } from '../../hooks/useAuthContext'

const PostPetSection = () => {
  const { user } = useAuthContext();
  // eslint-disable-next-line no-unused-vars
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("None");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (!isSubmitting) {
      setEmailError(false);
      setAgeError(false);
      setFormError(false);
    }
  }, [isSubmitting]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

    if (
      !name ||
      category === "None" ||
      !breed ||
      !age ||
      gender === "None" ||
      !location ||
      !description ||
      !email ||
      !phone ||
      ageError
    ) {
      setFormError(true);
      return;
    }
      
    if (!user?.token) {
      console.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("phone", phone);

    if (picture) {
      formData.append("file", picture);
    }


    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pets/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setShowPopup(true);
      setFormError(false);

      setName("");
      setCategory("None");
      setBreed("");
      setAge("");
      setGender("None");
      setPicture(null);
      setLocation("");
      setDescription("");
      setPhone("");
      setFileName("");

    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="container my-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-warning">Post a Pet for Adoption</h2><hr />
          <img src={assets.postPet} alt="Pet Looking for a Home" className="img-fluid w-50 mt-3 rounded " />
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="p-4 border rounded shadow-sm bg-light"
        >
          <div className="row">
            {/* Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
            </div>

            {/* Category */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="None">None</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Fish</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Breed */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Breed</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="form-control"
              />
            </div>

            {/* Age */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Pet Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-control"
              />
            </div>

            {/* Gender */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-select"
              >
                <option value="None">None</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="U">Other</option>
              </select>
            </div>

            {/* Picture */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Picture</label>
              <label className="form-control d-flex justify-content-between align-items-center">
                <span>{fileName || "Choose a Picture"}</span>
                <input
                  className="d-none"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <i className="fa fa-upload"></i>
              </label>
            </div>

            {/* Location */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
              />
            </div>  

            {/* description */}
            <div className="col-12 mb-3">
              <label className="form-label fw-bold">Description for giving a pet</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              ></textarea>
            </div>

            <h4 className="mt-3">Contact Information</h4>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="text" value={user.email} className="form-control" readOnly />
            </div>

            {/* Phone */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {/* Errors */}
          {emailError && (
            <p className="text-danger fw-semibold">Please provide a valid email address.</p>
          )}
          {formError && (
            <p className="text-danger fw-semibold">Please fill out all fields correctly.</p>
          )}

          {/* Submit button */}
          <div className='d-flex justify-content-center'>
            <button
              type="submit"
              className="btn btn-warning rounded-pill text-white btn-lg px-4 py-2 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Your Pet"}
            </button>
          </div>


          {/* Popup */}
          {showPopup && (
            <div className="alert alert-success mt-4 d-flex justify-content-between align-items-center">
              <span>Application Submitted! We'll get in touch with you soon</span>
              <button onClick={togglePopup} className="btn btn-sm btn-success">
                <i className="fa fa-times"></i>
              </button>
            </div>
          )}
        </form>
      </section>
    </div>
  )
}

export default PostPetSection
