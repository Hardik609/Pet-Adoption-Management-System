import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

function AdoptForm(props) {
  const { user } = useAuthContext();

  const [email, setEmail] = useState(user?.email || "");
  const [phoneNo, setPhoneNo] = useState("");
  const [livingSituation, setLivingSituation] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [familyComposition, setFamilyComposition] = useState("");

  const [formError, setFormError] = useState(false);
  const [ErrPopup, setErrPopup] = useState(false);
  const [SuccPopup, setSuccPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !phoneNo ||
      !livingSituation ||
      !previousExperience ||
      !familyComposition
    ) {
      setFormError(true);
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ CORRECT ENDPOINT
      const response = await fetch(
        `http://localhost:8080/adoptions/${props.pet.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            phoneNo,
            livingSituation,
            previousExperience,
            familyComposition,
            petId: props.pet.id,   // ✅ correct field
          }),
        }
      );

      if (!response.ok) {
        setErrPopup(true);
      } else {
        setSuccPopup(true);
      }
    } catch (err) {
      console.log("Adoption error:", err);
      setErrPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card shadow-lg">
        {/* Header */}
        <div className="card-header bg-warning text-white text-center">
          <h4>Pet Adoption Application</h4>
        </div>

        <div className="card-body">
          {/* Pet Details */}
          <div className="row mb-4">
            <div className="col-md-4 text-center">
              <img
                // ✅ CORRECT IMAGE FIELD
                src={`http://localhost:8080/${props.pet.image_url}`}
                alt={props.pet.name}
                className="img-fluid rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-8">
              <h5 className="text-warning">{props.pet.name}</h5>

              <p>
                <b>Breed:</b> {props.pet.breed}
              </p>

              <p>
                <b>Age:</b> {props.pet.age}
              </p>

              <p>
                <b>Gender:</b> {props.pet.gender}
              </p>
            </div>
          </div>

          {/* Alerts */}
          {formError && (
            <div className="alert alert-danger">
              Please fill out all fields.
            </div>
          )}

          {ErrPopup && (
            <div className="alert alert-danger">
              Oops!... Connection Error.
            </div>
          )}

          {SuccPopup && (
            <div className="alert alert-success">
              Adoption request for <b>{props.pet.name}</b> submitted successfully!
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone No</label>
              <input
                type="text"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Pet Living Situation</label>
              <input
                type="text"
                className="form-control"
                value={livingSituation}
                onChange={(e) => setLivingSituation(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Previous Pet Experience</label>
              <input
                type="text"
                className="form-control"
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Any Other Pets</label>
              <input
                type="text"
                className="form-control"
                value={familyComposition}
                onChange={(e) => setFamilyComposition(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button disabled={isSubmitting} className="btn btn-warning">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={props.closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm;
