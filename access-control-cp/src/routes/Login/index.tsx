// src/routes/Login/index.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { TipoUser } from "../../types/tipoUser";

type FormData = {
  nomeUsuario: string;
  email: string;
};

const API_URL = "http://localhost:3001";
const AUTH_KEY = "auth";

export default function Login() {
  const navigate = useNavigate();
  const [erro, setErro] = useState<string>("");

  const { register,handleSubmit,formState: { errors }} = useForm<FormData>({ mode: "onSubmit" });

  const onSubmit = async ({ nomeUsuario, email }: FormData) => {
    try {
      setErro("");

      // Consulta ao endpoint filtrando pelos campos do formulário
      const qs = new URLSearchParams({ nomeUsuario, email }).toString();
      const resp = await fetch(`${API_URL}/usuarios?${qs}`);
      if (!resp.ok) throw new Error("Falha ao consultar o servidor");

      const lista: TipoUser[] = await resp.json();

    
      if (lista.length > 0) {
        const usuario = lista[0];

        // Simula autenticação
        const payload = {
          userId: usuario.id,
          nome: usuario.nome,
          nomeUsuario: usuario.nomeUsuario,
          email: usuario.email,
          loggedAt: new Date().toISOString()
        };

        localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
        navigate("/home", { replace: true });
      } else {
        setErro("Usuário ou e-mail não encontrados.");
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="nomeUsuario">Nome de Usuário</label>
        <input
          id="nomeUsuario"
          type="text"
          {...register("nomeUsuario", {
            required: "O nome de usuário é obrigatório",
            minLength: { value: 3, message: "Mínimo de 3 caracteres" }
          })}
        />
        {errors.nomeUsuario && <p>{errors.nomeUsuario.message}</p>}
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "O e-mail é obrigatório",
            maxLength: { value: 150, message: "Máximo de 150 caracteres"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {erro && <small>{erro}</small>}
     <div>
        <button><Link to="/cadastro">Cadastro</Link></button>
     </div>
     <div>
      <button type="submit">Entrar</button>
    </div>
    </form>
  );
}
