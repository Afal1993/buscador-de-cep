import React,{ useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import "./App.css";

const App = () => {
    
    const [ input, setInput ] = useState("");
    const [ cep, setCep ] = useState({});
    
    async function handleSearch() {
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
                onChange={(e) => setInput(e.target.value)}    
                />

                <button 
                className="container__btn-search" 
                onClick={(handleSearch)}>
                    <FiSearch size={25} color="#FFFFFF"/>
                </button>
            </div>
            
            {Object.keys(cep).length > 0 && (
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