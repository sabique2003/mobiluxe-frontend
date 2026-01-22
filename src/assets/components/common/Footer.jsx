import './Footer.css'

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <span>About</span>
        <span>Support</span>
        <span>Privacy</span>
        <span>Terms</span>
        <span className="version">v1.0.0</span>
      </div>

      <p className="mb-0">
        © {new Date().getFullYear()} <strong>Mobiluxe</strong>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
