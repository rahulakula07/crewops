import React, { useState, useEffect } from "react";
import { db } from "../../../../fbconfig";
import { getDatabase, ref, get } from "firebase/database";
import { Skeleton, Box } from "@mui/material"; // Import Skeleton and Box components from MUI

const Employer = () => {
  const [employers, setEmployers] = useState([]);
  const [showEmployers, setShowEmployers] = useState(false);

  // Fetch employers from Firebase
  const fetchEmployers = async () => {
    try {
      const employersRef = ref(db, "users/employers");
      const snapshot = await get(employersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const employersList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setEmployers(employersList);
      } else {
        setEmployers([]);
      }
      setShowEmployers(true);
    } catch (error) {
      console.error("Error fetching employers:", error);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  return (
    <div className="d-flex">
      <div className="p-4 w-100">
        <h4 className="text-dark mb-3" style={{ color: "white" }}>
          Employers List
        </h4>
        {!showEmployers ? (
          // Show skeleton loader while data is loading
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" sx={{ marginTop: 1 }} />
            <Skeleton variant="text" width="70%" sx={{ marginTop: 1 }} />
            <Skeleton variant="text" width="75%" sx={{ marginTop: 1 }} />
          </Box>
        ) : (
          employers.length > 0 ? (
            <ul className="list-group">
              {employers.map((employer) => (
                <li
                  key={employer.id}
                  className="list-group-item p-2 border rounded shadow-sm my-2"
                >
                  <strong>{employer.name}</strong> - {employer.email}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No employers found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Employer;
