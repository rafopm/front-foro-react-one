import Navbar from "./Navbar";
import NavbarForo from "./NavbarForo";
import Footer from "./Footer";
import Header from "./Header";
import Banner from "./Banner";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <Banner />
      
      <div >
        <div >

          <div >
            {children}
          </div>
        </div>
      </div>
      <div >
            <Footer />
          </div>
    </div>
  );
}
