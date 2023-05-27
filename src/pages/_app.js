import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from "@/context/CategoryContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Component {...pageProps} />
      </CategoryProvider>
    </AuthProvider>
  );
}
