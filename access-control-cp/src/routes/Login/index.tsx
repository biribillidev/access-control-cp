import { Link } from "react-router-dom";

export default function Login(){
    
    
    return(
        <main>
            <h1>Realize seu login</h1>
            <div>
                <form action="">
                    <div>
                        <label>Nome de Usuário: </label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" />
                    </div>
                    <div>
                        <button><Link to="/cadastro">Cadastro</Link></button>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
