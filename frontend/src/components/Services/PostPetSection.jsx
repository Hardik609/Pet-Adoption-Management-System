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
      
    if (!user?.token) {
      console.error("User not authenticated");
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
          headers: {
            Authorization: `Bearer ${user.token}`
          },
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
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
              <input value={email} className="form-control" readOnly />
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
