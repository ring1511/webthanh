import BackToTop from "../BackToTop/BackToTop";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function LayoutPc({ children }) {
  return (
    <div>
      <BackToTop />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutPc;
