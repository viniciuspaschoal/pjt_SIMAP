import { useState } from "react";

function Geral({ onApplyFilters }) {

    const anos = [2023, 2024, 2025];
    const [anoSelecionado, setAnoSelecionado] = useState(null);

    const [openAno, setOpenAno] = useState(false);
    const [openEscola, setOpenEscola] = useState(false);

    const [checkboxEscola, setCheckboxEscola] = useState({
        analia: { label: "EMEFEI ANÁLIA", value: "EMEFEI ANÁLIA DE LUCCA FURLAN", selected: false },
        outra1: { label: "Outra Escola 1", selected: false },
        outra2: { label: "Outra Escola 2", selected: false },
        outra3: { label: "Outra Escola 3", selected: false },
    });

    // atualiza checkbox de escola
    const toggleEscola = (key) => {
        setCheckboxEscola((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                selected: !prev[key].selected
            }
        }));
    };

    const temAlgumaEscola = Object.values(checkboxEscola).some(e => e.selected);
    const podeBuscar = anoSelecionado && temAlgumaEscola;

    const montarJsonGeral = () => {
        const escolasSelecionadas = Object.values(checkboxEscola)
            .filter(e => e.selected)
            .map(e => e.value || e.label)

        const jsonGeral = {
            anoLetivo: [String(anoSelecionado)],
            escolas: escolasSelecionadas,
            series: [],
            turmas: [],
            diagnosticos: {}
        };

        console.log("JSON geral: ", jsonGeral);

        return jsonGeral;
    }

    return (
        <div className="min-h-[90vh] w-full flex items-center justify-center bg-slate-100 p-4">

            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8 space-y-8">

                {/* TÍTULOS */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Filtragem Geral</h1>
                    <p className="text-slate-600 pt-2">Escolha ano e escola(s) para continuar</p>
                </div>

                {/* DROPDOWNS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* ANO LETIVO */}
                    <div className="relative">
                        <p className="font-medium text-slate-700 mb-2">Ano letivo:</p>

                        <div
                            onClick={() => setOpenAno(!openAno)}
                            className="border border-slate-300 rounded-lg p-3 cursor-pointer 
                                       hover:border-green-600 transition flex justify-between items-center"
                        >
                            <span>{anoSelecionado ?? "Selecione um ano"}</span>
                            <span className="text-slate-500">▼</span>
                        </div>

                        {openAno && (
                            <div className="absolute left-0 right-0 mt-2 bg-white 
                                            shadow-md rounded-lg border border-slate-200 z-10">
                                {anos.map((ano) => (
                                    <div
                                        key={ano}
                                        onClick={() => {
                                            setAnoSelecionado(ano);
                                            setOpenAno(false);
                                        }}
                                        className="p-3 hover:bg-green-50 cursor-pointer"
                                    >
                                        {ano}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ESCOLAS */}
                    <div className="relative">
                        <p className="font-medium text-slate-700 mb-2">Escolas:</p>

                        <div
                            onClick={() => setOpenEscola(!openEscola)}
                            className="border border-slate-300 rounded-lg p-3 cursor-pointer 
                                       hover:border-green-600 transition flex justify-between items-center"
                        >
                            <span>
                                {temAlgumaEscola
                                    ? `${Object.values(checkboxEscola).filter(x => x.selected).length} selecionada(s)`
                                    : "Selecione uma ou mais escolas"}
                            </span>
                            <span className="text-slate-500">▼</span>
                        </div>

                        {openEscola && (
                            <div className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-lg 
                                            border border-slate-200 z-10 max-h-60 overflow-y-auto">

                                {Object.entries(checkboxEscola).map(([key, escola]) => (
                                    <label
                                        key={key}
                                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-green-50"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={escola.selected}
                                            onChange={() => toggleEscola(key)}
                                            className="h-5 w-5"
                                        />
                                        <span>{escola.label}</span>
                                    </label>
                                ))}

                            </div>
                        )}

                        {/* Escolas selecionadas abaixo */}
                        {temAlgumaEscola && (
                            <div className="mt-2 text-xs text-slate-500">
                                Selecionadas:{" "}
                                {Object.values(checkboxEscola)
                                    .filter((e) => e.selected)
                                    .map((e) => e.label)
                                    .join(", ")}
                            </div>
                        )}
                    </div>



                </div>

                {/* BOTÃO */}
                <div className="flex justify-center pt-4">
                    <button
                        disabled={!podeBuscar}
                        onClick={() => {
                            const json = montarJsonGeral();
                            onApplyFilters && onApplyFilters(json);
                        }}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg"
                    >
                        Realizar busca
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Geral;
