import { useState } from "react";
import "./Main.css";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  clgName: "",
  deptName: "",
  email: "",
  phoneNo: "",
};

function App() {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.clgName) {
      errors.clgName = "College Name is Required";
    }
    if (!values.deptName) {
      errors.deptName = "Dept. Name is Required";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phoneNo) {
      errors.phoneNo = "Phone No is required!";
    } else if (values.phoneNo.length !== 10) {
      errors.phoneNo = "Phone No must be 10 digits!";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      // Validation passed, proceed to backend submission
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })
      .then((res) => res.text())
      .then((data) => {
        console.log("Registered successfully:", data);
        setIsSubmit(true);

         // Clear the form immediately
        setFormValues(initialValues);
        //toast.success("Registered successfully. An email has been sent. Please login.");

          setTimeout(() => {
            navigate("/login/faculty");
          }, 3000);
      })
.catch((err) => {
  console.error("Registration failed:", err);
  setIsSubmit(false);
});


    }
  };

  return (
    <>
      <div className="bgImg"></div>

       {isSubmit && Object.keys(formErrors).length === 0 && (
  <div className="success-toast">
    Registration Successful<br />
    Email is sent, please login through that
  </div>
)} 




      {!isSubmit || Object.keys(formErrors).length !== 0 ? (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <label>Name:</label>
                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                />
                <p>{formErrors.username}</p>
              </div>

              <div className="field">
                <label>College Name:</label>
                <input
                  type="text"
                  name="clgName"
                  value={formValues.clgName}
                  onChange={handleChange}
                />
                <p>{formErrors.clgName}</p>
              </div>

              <div className="field">
                <label>Department Name:</label>
                <input
                  type="text"
                  name="deptName"
                  value={formValues.deptName}
                  onChange={handleChange}
                />
                <p>{formErrors.deptName}</p>
              </div>

              <div className="field">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <p>{formErrors.email}</p>
              </div>

              <div className="field">
                <label>Phone No:</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formValues.phoneNo}
                  onChange={handleChange}
                />
                <p>{formErrors.phoneNo}</p>
              </div>

              <button type="submit" className="fluid ui button blue">
                Register
              </button>
            </div>
          </form>

          <div className="text">
            <p>
              Already registered? <Link to="/login/faculty">Login here</Link>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
  
}

export default App;  