import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const uid = currentUser.uid;
        const userRef = ref(db, `users/${uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.name) {
            setUserName(data.name);
          } else {
            setUserName(currentUser.email); // fallback
          }
        });
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleIconClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#">HRbes</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#">Demo</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Free Figma File</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Usability</a></li>

              {/* Mobile View Buttons */}
              {!user ? (
                <>
                  <li className="nav-item d-lg-none mt-2">
                    <Link to="/Signup" className="buy-now">Sign up</Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link to="/Login" className="buy-now">Login</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item d-lg-none mt-2 text-white" onClick={handleIconClick}>
                  <FaUserCircle className="me-2" />
                  {userName}
                  {showLogout && (
                    <div>
                      <button className="buy-now mt-2" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </li>
              )}
            </ul>

            {/* Desktop View Buttons */}
            {!user ? (
              <div className="d-none d-lg-flex ms-3">
                <Link to="/Signup" className="buy-now me-2">Sign up</Link>
                <Link to="/Login" className="buy-now">Login</Link>
              </div>
            ) : (
              <div className="d-none d-lg-flex align-items-center text-white ms-3" onClick={handleIconClick} style={{ cursor: 'pointer' }}>
                <FaUserCircle className="me-2" size={24} />
                {userName}
                {showLogout && (
                  <button className="buy-now ms-3" onClick={handleLogout}>Logout</button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;


