import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { TipoUser } from "../../types/tipoUser"

export default function Cadastro(){
  const API_URL = "http://localhost:3001/usuarios"
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<TipoUser>({
    mode: "onChange"
  });

  const onSubmit = async (data: TipoUser) => {
    try {
      const query = new URLSearchParams({
        nomeUsuario: data.nomeUsuario,
        email: data.email
      }).toString();

      const checkResposta = await fetch(`${API_URL}?${query}`);
      const usuarioExistente: TipoUser[] = await checkResposta.json();

      if (usuarioExistente.length > 0) {
        alert("Já existe um usuário com esse nome de usuário ou e-mail!");
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar")
      }

      alert("Cadastro realizado com sucesso!")
      navigate("/login");
    } catch (error) {
      alert("Erro ao realizar cadastro, tente novamente.")
      console.error("Erro ao fazer o cadastro: ", error)
    }
  }
    return(
        <main>
            <h1>Realize seu Cadastro</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nome: </label>
                        <input type="text" {...register("nome", { required: true, maxLength: 100 })} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "nome-error" : undefined} />
                        {errors.nome && <p id="nome-error" className="mt-1 text-sm text-red-500">{errors.nome.message}</p>}
                    </div>
                    <div>
                        <label>Nome de Usuário</label>
                        <input type="text" {...register("nomeUsuario", { required: true, maxLength: 100 })} aria-invalid={!!errors.nomeUsuario} aria-describedby={errors.nomeUsuario ? "nomeUsuario-error" : undefined} />
                        {errors.nomeUsuario && <p id="nomeUsuario-error" className="mt-1 text-sm text-red-500">{errors.nomeUsuario.message}</p>}
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email"{...register("email", { required: true, maxLength: 150 })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
