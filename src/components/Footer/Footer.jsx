import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container text-white py-5">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-4">
            <h2 className="footer-title">
              <span className="footer-icon">⚙</span> NexWork
            </h2>
            <p className="footer-text">Join our newsletter to stay up to date on features and releases.</p>
            <div className="input-group">
              <input type="email" className="form-control footer-input" placeholder="Enter your email" />
              <button className="btn ">Subscribe</button>
            </div>
            <p className="footer-policy">By subscribing you agree to our <span className="footer-link">Privacy Policy</span> and consent to receive updates.</p>
          </div>

          {/* Middle Section - Navigation */}
          <div className="col-md-4">
            <h3 className="footer-subtitle">Navigate</h3>
            <ul className="footer-list">
              {["Home", "Lessons", "Support", "Teachers", "Tutorials", "Log in", "Sign up"].map((item) => (
                <li key={item} className="footer-item">{item}</li>
              ))}
            </ul>
          </div>

          {/* Right Section - Other Links & Socials */}
          <div className="col-md-4">
            <h3 className="footer-subtitle">Other links</h3>
            <ul className="footer-list">
              {["404", "401", "Styleguide", "Licenses", "User account", "Reset password", "Access denied"].map((item) => (
                <li key={item} className="footer-item">{item}</li>
              ))}
            </ul>
            <h3 className="footer-subtitle mt-4">Follow us</h3>
            <div className="footer-socials">
              {[FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaYoutube].map((Icon, index) => (
                <Icon key={index} className="footer-icon-social" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© NexWork. All rights reserved.</p>
          <div className="footer-links">
            {["Privacy Policy", "Terms of Service", "Cookies Policy", "Crafted by Akula Rahul ↗", "Powered by NexWork ↗"].map((item, index) => (
              <p key={index} className="footer-bottom-link">{item}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
