import React, { useState,useEffect } from "react";
import { db } from "../../../../fbconfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";



const Employer = () => {
    const [employers, setEmployers] = useState([]);
    const [showEmployers, setShowEmployers] = useState(false);
  
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
      
        {showEmployers && (
          <div className="p-4 w-100">
            <h4 className="text-dark mb-3" style={{color:"white"}}>Employers List</h4>
            {employers.length > 0 ? (
              <ul className="list-group">
                {employers.map((employer) => (
                  <li key={employer.id} className="list-group-item p-2 border rounded shadow-sm my-2">
                    <strong>{employer.name}</strong> - {employer.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No employers found.</p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default Employer;
  