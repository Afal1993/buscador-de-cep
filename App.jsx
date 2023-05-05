import React,{ useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api"; {/* Importando a api axios para fzr requisições http  */}
import "./App.css";

const App = () => {
    
    const [ input, setInput ] = useState(""); {/* input é o nome do estado q carrega o valor q é "",  
                                                  setInput é a função criada p/ alterar o valor do estado */}
    const [ cep, setCep ] = useState({}); {/* mesma coisa aqui, porém passando um objeto vazio q será preenchido com o json*/}
    
    async function handleSearch() { {/* função criada e usada no button p/ ao clicar receber o valor do input */}
        if( input === "") {
            alert("Preencha algum CEP!");
        }
        try {
            const response = await api.get(`${input}/json`);
            setCep(response.data);
            setInput("");

        } catch {
            alert("Ops! Erro ao buscar.");
            setInput("");
        }
    }
    
    return (
        <div className="container">
            <h1>BUSCADOR CEP</h1>
            
            <div className="container__input">
                <input 
                type="text"
                placeholder="Digite seu cep..."
                value={input}
                onChange={(e) => setInput(e.target.value)}   //onChange cria uma função q muda o valor do input através do e(event).target.value  
                />

                <button 
                className="container__btn-search" 
                onClick={(handleSearch)}> {/* handleSearch: função criada e usada no button p/ ao clicar receber o valor do input */}
                    <FiSearch size={25} color="#FFFFFF"/>
                </button>
            </div>
            
            {Object.keys(cep).length > 0 && ( //método criado para saber se o valor de cep é maior q zero, se for ele mostrará a <main></main>, caso for menor a mesma some.
                <main className="main">
                    <h2>CEP: {cep.cep}</h2>

                    <span>Logradouro: {cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>Bairro: {cep.bairro}</span>
                    <span>{cep.localidade} - {cep.uf}</span>

                </main>
            )}

        </div>
    )
}

export default App;