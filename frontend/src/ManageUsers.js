import React, { useEffect, useState } from "react";
import "./dashboard.css";

function ManageUsers() {
  const [internalFaculties, setInternalFaculties] = useState([]);
  const [otherFaculties, setOtherFaculties] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const internal = [];
        const others = [];

        data.forEach((user) => {
          const clg = (user.clgName || "").toLowerCase();
          if (clg.includes("global academy of technology") || clg === "gat") {
            internal.push(user);
          } else {
            others.push(user);
          }
        });

        setInternalFaculties(internal);
        setOtherFaculties(others);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSelect = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  const renderTable = (users) => (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>College</th>
          <th>Department</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Select as QP Setter</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => {
          const isSelected = selectedEmails.includes(u.email);
          return (
            <tr key={u.email}>
              <td>{u.name}</td>
              <td>{u.clgName}</td>
              <td>{u.deptName}</td>
              <td>{u.email}</td>
              <td>{u.phoneNo}</td>
              <td>
                <button
                  className={`qp-select-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelect(u.email)}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="manage-users">
      <h2>Internal Faculties List</h2>
      {renderTable(internalFaculties)}

      <h2 style={{ marginTop: "30px" }}>Other Faculties</h2>
      {renderTable(otherFaculties)}
    </div>
  );
}

export default ManageUsers;
