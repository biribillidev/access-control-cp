import Login from "../routes/Login";
import Cabecalho from "../components/Cabecalho/Cabecalho";
import Rodape from "../components/Rodape/Rodape";
export default function App(){

  return(
    <div className="container">
      <Cabecalho/>
      <Login/>
      <Rodape/>
    </div>
  );
}