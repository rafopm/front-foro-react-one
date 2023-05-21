import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function NavbarForo() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/forum">Todos</Link>
        </li>
        

      </ul>
    </nav>
  );
}
