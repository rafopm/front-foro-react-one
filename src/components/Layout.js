import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
