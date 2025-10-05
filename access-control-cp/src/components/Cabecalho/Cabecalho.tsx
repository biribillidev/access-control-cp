import { useEffect, useState } from "react";

export default function Cabecalho() {
  const [user, setUser] = useState<{ nome: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        if (parsed.nome && parsed.email) {
          setUser({ nome: parsed.nome, email: parsed.email });
        }
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <header> Cp Front</header>

      {user && (
        <p className="user-info">
          {user.nome} • {user.email}
        </p>
      )}
    </>
  );
}
