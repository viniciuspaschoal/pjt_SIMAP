import React, { useState } from "react";
import TabelaProjeto from "./TabelaProjeto"; // Certifique-se que o caminho está certo

export default function TableProjetoRecomposicao({ dados }) {
    const [currentTableIndex, setCurrentTableIndex] = useState(0);

    // Proteção caso dados venha null ou vazio
    if (!dados || dados.length === 0) {
        return <div className="p-4 text-center">Nenhum dado disponível para exibição.</div>;
    }

    const nextTable = () => {
        if (currentTableIndex < dados.length - 1) {
            setCurrentTableIndex(currentTableIndex + 1);
        }
    };

    const prevTable = () => {
        if (currentTableIndex > 0) {
            setCurrentTableIndex(currentTableIndex - 1);
        }
    };

    // Identificador visual de qual página estamos (ex: Turma 1 de 2)
    const currentData = dados[currentTableIndex];

    return (
        <div className="flex flex-col items-center w-full">

            <div className="w-full mb-4 mt-4 px-2">
                <div className="border-l-[6px] border-[#1b5e3e] pl-4">
                    <h1 className="text-2xl md:text-2xl font-bold text-gray-800 tracking-tight leading-tight">
                        PROJETO DE RECOMPOSIÇÃO DAS APRENDIZAGENS
                    </h1>
                    <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                        Grupos filtrados
                    </p>
                </div>
            </div>

            {/* Componente da Tabela (Recebe UM objeto de turma por vez) */}
            <TabelaProjeto dados={currentData} />

            {/* Navegação entre turmas (Só aparece se tiver mais de 1 turma) */}
            {dados.length > 1 && (
                <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg shadow-sm">
                    <button
                        onClick={prevTable}
                        disabled={currentTableIndex === 0}
                        className={`px-4 py-2 rounded font-bold text-white transition-colors ${currentTableIndex === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#1b5e3e] hover:bg-[#144a2f]'
                            }`}
                    >
                        ← Anterior
                    </button>

                    <span className="font-semibold text-gray-700">
                        Turma {currentTableIndex + 1} de {dados.length}
                    </span>

                    <button
                        onClick={nextTable}
                        disabled={currentTableIndex === dados.length - 1}
                        className={`px-4 py-2 rounded font-bold text-white transition-colors ${currentTableIndex === dados.length - 1
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#1b5e3e] hover:bg-[#144a2f]'
                            }`}
                    >
                        Próxima →
                    </button>
                </div>
            )}
        </div>
    );
}