import Navbar from "./Navbar";
import NavbarForo from "./NavbarForo";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <NavbarForo />
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
