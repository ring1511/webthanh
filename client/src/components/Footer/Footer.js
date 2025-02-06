import "../../assets/styles/Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="main-footer">
        <div className="contact">Về chúng tôi</div>
        <div className="copyright">
          © Copyright 2025 - Privacy Policy - Terms of Service
          <br /> Operated by{" "}
          <a
            href="https://www.facebook.com/ring1511/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ color: "#ff13a9", fontWeight: 700 }}>Ring</span>
          </a>
          , All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
