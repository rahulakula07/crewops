// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { getDatabase, ref, get } from "firebase/database";
// import { author } from "../../fbconfig";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const [user, loading] = useAuthState(author);
//   const [role, setRole] = useState(null);
//   const [checkingRole, setCheckingRole] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       if (!user) return;

//       const db = getDatabase();
//       const paths = ["users/employers", "users/managers"];

//       for (let path of paths) {
//         const snapshot = await get(ref(db, path));
//         const data = snapshot.val();
//         if (data) {
//           for (let key in data) {
//             if (data[key].email === user.email) {
//               setRole(data[key].role || (path.includes("managers") ? "manager" : "employer"));
//               setCheckingRole(false);
//               return;
//             }
//           }
//         }
//       }

//       setRole("unknown");
//       setCheckingRole(false);
//     };

//     if (user) {
//       fetchUserRole();
//     } else {
//       setCheckingRole(false);
//     }
//   }, [user]);

//   if (loading || checkingRole) return <div>Loading...</div>;

//   if (!user) return <Navigate to="/Login" state={{ from: location }} replace />;

//   // if (allowedRoles && !allowedRoles.includes(role)) {
//   //   return <Navigate to="/" replace />;
//   // }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDatabase, ref, get } from "firebase/database";
import { author } from "../../fbconfig";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const [user, loading] = useAuthState(author);
  const [role, setRole] = useState(null);
  const [isFetchingRole, setIsFetchingRole] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) return;

      try {
        const db = getDatabase();
        const userPaths = ["users/employers", "users/managers"];

        for (const path of userPaths) {
          const snapshot = await get(ref(db, path));
          const data = snapshot.val();

          if (data) {
            for (const key in data) {
              if (data[key].email === user.email) {
                const fetchedRole = data[key].role || (path.includes("managers") ? "manager" : "employer");
                setRole(fetchedRole);
                setIsFetchingRole(false);
                return;
              }
            }
          }
        }

        // If no match found
        setRole("unknown");
        setIsFetchingRole(false);
      } catch (error) {
        console.error("Error fetching role:", error);
        setIsFetchingRole(false);
      }
    };

    if (user && loading === false) {
      fetchRole();
    } else if (!user && loading === false) {
      setIsFetchingRole(false);
    }
  }, [user, loading]);

  if (loading || isFetchingRole) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


