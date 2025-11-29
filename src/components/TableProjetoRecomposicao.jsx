import React, { useState, useEffect } from "react";
import TabelaProjeto from "./TabelaProjeto";

export default function TableProjetoRecomposicao({ dados }) {
    const [currentTableIndex, setCurrentTableIndex] = useState(0);
    const [dadosSalvos, setDadosSalvos] = useState([]);

    const [modo, setModo] = useState("carrossel");


    /* -----------------------------------------------------------
     * 1) CARREGAR DADOS DO SESSION STORAGE AO MONTAR
     * ----------------------------------------------------------- */
    useEffect(() => {
        const dadosSession = sessionStorage.getItem("dados_projeto");
        const paginaSession = sessionStorage.getItem("pagina_atual");

        if (dadosSession) {
            const dadosRecuperados = JSON.parse(dadosSession);
            setDadosSalvos(dadosRecuperados);

            // restaura página atual
            if (paginaSession) {
                setCurrentTableIndex(Number(paginaSession));
            }
        }
    }, []);

    /* -----------------------------------------------------------
     * 2) SE RECEBER DADOS VIA API, SALVA NO SESSION STORAGE
     * ----------------------------------------------------------- */
    useEffect(() => {
        if (dados && dados.length > 0) {
            // salva dados completos
            sessionStorage.setItem("dados_projeto", JSON.stringify(dados));
            setDadosSalvos(dados);

            // se estava vazio antes, volta pra página 0
            setCurrentTableIndex(0);
            sessionStorage.setItem("pagina_atual", 0);
        }
    }, [dados]);

    /* -----------------------------------------------------------
     * 3) SALVAR A PÁGINA ATUAL SEMPRE QUE TROCAR
     * ----------------------------------------------------------- */
    useEffect(() => {
        sessionStorage.setItem("pagina_atual", currentTableIndex);
    }, [currentTableIndex]);

    // --------------------------------------------------------------------
    // Dados finais a serem usados (API > sessionStorage)
    // --------------------------------------------------------------------
    const listaFinal = dadosSalvos.length > 0 ? dadosSalvos : dados;

    if (!listaFinal || listaFinal.length === 0) {
        return <div className="p-4 text-center">Nenhum dado disponível para exibição.</div>;
    }

    const nextTable = () => {
        if (currentTableIndex < listaFinal.length - 1) {
            setCurrentTableIndex(currentTableIndex + 1);
        }
    };

    const prevTable = () => {
        if (currentTableIndex > 0) {
            setCurrentTableIndex(currentTableIndex - 1);
        }
    };

    const currentData = listaFinal[currentTableIndex];

    return (
        <div className="flex flex-col items-center w-full overflow-y-auto max-h-[90vh]">

            <div className="flex items-center gap-[40vw] w-full pl-[2.5vw] mt-4 mb-6">

                {/* Título */}
                <div className="border-l-[6px] border-[#1b5e3e] pl-[2.5vw]">
                    <h1 className="text-[1.3rem] font-bold text-gray-800 tracking-tight leading-tight">
                        PROJETO DE RECOMPOSIÇÃO DAS APRENDIZAGENS
                    </h1>
                    <p className="text-[0.9rem] font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                        Grupos filtrados
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex items-center gap-3 select-none">
                    <span className={`font-semibold ${modo === "carrossel" ? "text-[#1b5e3e]" : "text-gray-500"}`}>
                        Carrossel
                    </span>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={modo === "lista"}
                            onChange={() => setModo(modo === "carrossel" ? "lista" : "carrossel")}
                        />
                        <div className="w-12 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#1b5e3e] 
                rounded-full peer peer-checked:bg-[#1b5e3e] transition-all"></div>

                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow 
                peer-checked:translate-x-6 transition-all"></div>
                    </label>

                    <span className={`font-semibold ${modo === "lista" ? "text-[#1b5e3e]" : "text-gray-500"}`}>
                        Lista
                    </span>
                </div>

            </div>




            {/* Navegação entre turmas */}
            {modo === "carrossel" && (
                <>
                    <TabelaProjeto dados={currentData} />

                    {listaFinal.length > 1 && (
                        <div className="flex items-center gap-4 bg-gray-100 rounded-lg shadow-sm mt-6">

                            <button
                                onClick={prevTable}
                                disabled={currentTableIndex === 0}
                                className={`px-4 py-2 rounded font-bold text-white transition-colors ${currentTableIndex === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#1b5e3e] hover:bg-[#144a2f]"
                                    }`}
                            >
                                ← Anterior
                            </button>

                            <span className="font-semibold text-gray-700">
                                Turma {currentTableIndex + 1} de {listaFinal.length}
                            </span>

                            <button
                                onClick={nextTable}
                                disabled={currentTableIndex === listaFinal.length - 1}
                                className={`px-4 py-2 rounded font-bold text-white transition-colors ${currentTableIndex === listaFinal.length - 1
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#1b5e3e] hover:bg-[#144a2f]"
                                    }`}
                            >
                                Próxima →
                            </button>

                        </div>
                    )}
                </>
            )}

            {modo === "lista" && (
                <div
                    className="flex flex-col items-center gap-8 w-full px-[2vw] pb-6 rounded-lg shadow-sm pl-[3vw]"
                >
                    {listaFinal.map((turma, index) => (
                        <div key={index}>
                            <TabelaProjeto dados={turma} />
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}
