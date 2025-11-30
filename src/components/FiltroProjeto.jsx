import { useState, useMemo } from "react";
import { aplicarFiltrosProjeto } from '../services/projetoService';

// Ícones SVG
const Icon = ({ name, className }) => {
    const icons = {
        search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
        filter: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />,
        trash: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
        check: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            {icons[name]}
        </svg>
    );
};

export default function FiltroProjeto({ onApplyFilters }) {

    // =====================
    // LISTAS FIXAS
    // =====================
    const escolas = ["EMEFEI ANÁLIA DE LUCCA FURLAN"];
    const grupos = ["ALF", "ALF/MAT1", "MAT1", "LP2", "LP2/MAT2", "MAT2"];
    const professores = ["Roseli Almeida da Silva", "Professor B", "Professor C"];
    const turnos = ["MANHÃ", "TARDE", "VESPERTINO"];
    const anosLetivos = ["2023", "2024", "2025"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    // =====================
    // ESTADOS
    // =====================
    const [selEscolas, setSelEscolas] = useState([]);
    const [selGrupos, setSelGrupos] = useState([]);
    const [selProfessores, setSelProfessores] = useState([]);
    const [selTurnos, setSelTurnos] = useState([]);
    const [selAno, setSelAno] = useState([]);
    const [selMes, setSelMes] = useState([]);

    // Filtros obrigatórios:
    const obrigatorios = ["Ano Letivo", "Escolas"];
    const filtrosValidos = selAno.length > 0 && selEscolas.length > 0;

    const [showTooltip, setShowTooltip] = useState(false);

    // =====================
    // TOGGLES
    // =====================
    const toggleItem = (list, setList, item) =>
        list.includes(item) ? setList(list.filter(i => i !== item)) : setList([...list, item]);

    const toggleAll = (items, selected, setSelected) =>
        setSelected(selected.length === items.length ? [] : items);

    // =====================
    // APLICAR FILTROS
    // =====================
    const aplicarFiltros = async () => {
        const filtros = {
            escolas: selEscolas,
            grupoProjeto: selGrupos,
            professores: selProfessores,
            turnosProjeto: selTurnos,
            anoLetivo: selAno,
            meses: selMes
        };

        try {
            const response = await aplicarFiltrosProjeto(filtros);
            onApplyFilters(response.data, filtros);
        } catch (error) {
            console.error("Erro ao aplicar filtros:", error);
        }
    };

    // =====================
    // COMPONENTE DE LISTA
    // =====================
    const FilterListSection = ({ title, items, selected, setSelected, itemTextClass = "text-base" }) => {
        const [searchTerm, setSearchTerm] = useState("");

        const filteredItems = useMemo(
            () => items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())),
            [items, searchTerm]
        );

        const isAllSelected = selected.length === items.length;

        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[250px]">
                <div className="p-3 border-b bg-slate-50/60 shrink-0">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base uppercase tracking-wide text-slate-700">
                            {title}
                            {obrigatorios.includes(title) && <span className="text-red-600 ml-1">*</span>}
                        </h3>

                        {selected.length > 0 && (
                            <button onClick={() => setSelected([])} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                                <Icon name="trash" className="w-3 h-3" /> Limpar
                            </button>
                        )}
                    </div>

                    <div className="relative mt-2">
                        <Icon name="search" className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />

                        <input
                            type="text"
                            placeholder={`Buscar ${title.toLowerCase()}...`}
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-emerald-500/30 focus:border-emerald-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 p-3 space-y-1 overflow-y-auto custom-scroll">
                    {searchTerm === "" && (
                        <label className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="checkbox" checked={isAllSelected} onChange={() => toggleAll(items, selected, setSelected)} />
                            <span className="font-medium text-sm text-slate-600">
                                {isAllSelected ? "Desmarcar Todas" : "Selecionar Todas"}
                            </span>
                        </label>
                    )}

                    {filteredItems.map(item => {
                        const isSelected = selected.includes(item);

                        return (
                            <label key={item} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" checked={isSelected} onChange={() => toggleItem(selected, setSelected, item)} />
                                <span className={`${itemTextClass} ${isSelected ? "font-semibold text-emerald-700" : "text-slate-700"}`}>
                                    {item}
                                </span>
                            </label>
                        );
                    })}

                    {filteredItems.length === 0 && <p className="text-sm text-center text-slate-400 py-4">Nenhum item encontrado.</p>}
                </div>
            </div>
        );
    };

    // =====================
    // COMPONENTE DE TAGS
    // =====================
    const TagSection = ({ title, items, selected, setSelected, gridCols, className = "", itemTextClass = "text-xs" }) => (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 shrink-0 ${className}`}>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-base uppercase tracking-wide text-slate-700">
                    {title}
                    {obrigatorios.includes(title) && <span className="text-red-600 ml-1">*</span>}
                </h3>

                {selected.length > 0 && (
                    <button onClick={() => setSelected([])} className="text-sm text-red-500 hover:text-red-600">
                        Limpar
                    </button>
                )}
            </div>

            <div className={`grid ${gridCols} gap-2`}>
                {items.map(item => {
                    const isSelected = selected.includes(item);

                    return (
                        <button
                            key={item}
                            onClick={() => toggleItem(selected, setSelected, item)}
                            className={`
                                px-3 py-2 rounded-lg font-medium border transition-all
                                ${itemTextClass}
                                ${isSelected
                                    ? "bg-emerald-500 text-white border-emerald-500 shadow"
                                    : "bg-white text-slate-600 border-slate-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-400"
                                }
                            `}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    // =====================
    // RENDER
    // =====================
    return (
        <div className="h-[90vh] flex flex-col overflow-hidden">

            {/* HEADER */}
            <div className="shrink-0 px-8 pt-6 pb-4 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">

                    {/* TITULO */}
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                            <Icon name="filter" className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Filtrar Projetos de Recomposição</h1>
                            <p className="text-sm text-slate-500">Selecione os filtros para buscar os grupos de Projetos de Recomposição.</p>
                        </div>
                    </div>

                    {/* BOTÃO */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                if (!filtrosValidos) {
                                    setShowTooltip(true);
                                    setTimeout(() => setShowTooltip(false), 2500);
                                    return;
                                }
                                aplicarFiltros();
                            }}
                            className={`
            px-6 py-3 font-semibold rounded-xl flex items-center gap-2 transition-all
            ${filtrosValidos
                                    ? "bg-[#0a7c41] hover:bg-[#004d25] text-white transform hover:scale-105"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                                }
        `}
                        >
                            <Icon name="search" className="w-4 h-4" />
                            Buscar Projetos
                        </button>

                        {showTooltip && (
                            <div className="absolute right-0 mt-2 w-max bg-red-100 border border-red-300 
            text-red-700 text-xs px-3 py-2 rounded shadow animate-fadeIn z-50">
                                <span className="font-semibold">Para buscar, preencha pelo menos:</span>
                                <br />• Ano Letivo
                                <br />• Escola
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* MAIN */}
            <div className="flex-1 overflow-hidden mx-8 bg-gray-100 max-h-[75vh] p-2 pb-3 rounded-md border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

                    {/* COLUNA ESQUERDA */}
                    <div className="lg:col-span-4 h-full overflow-y-auto custom-scroll pr-2 flex flex-col gap-4">

                        <TagSection
                            title="Ano Letivo"
                            items={anosLetivos}
                            selected={selAno}
                            setSelected={setSelAno}
                            gridCols="grid-cols-1"
                            itemTextClass="text-base font-bold"
                        />

                        <TagSection
                            title="Meses"
                            items={meses}
                            selected={selMes}
                            setSelected={setSelMes}
                            gridCols="grid-cols-3"
                            itemTextClass="text-base"
                        />

                        <TagSection
                            title="Turno"
                            items={turnos}
                            selected={selTurnos}
                            setSelected={setSelTurnos}
                            gridCols="grid-cols-1"
                            itemTextClass="text-sm"
                        />
                    </div>

                    {/* COLUNA DIREITA */}
                    <div className="lg:col-span-8 h-full overflow-y-auto custom-scroll flex flex-col gap-4">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[300px]">
                            <FilterListSection
                                title="Escolas"
                                items={escolas}
                                selected={selEscolas}
                                setSelected={setSelEscolas}
                                itemTextClass="text-base"
                            />

                            <FilterListSection
                                title="Professores"
                                items={professores}
                                selected={selProfessores}
                                setSelected={setSelProfessores}
                                itemTextClass="text-base"
                            />
                        </div>

                        <div className="shrink-0">
                            <TagSection
                                title="Grupos"
                                items={grupos}
                                selected={selGrupos}
                                setSelected={setSelGrupos}
                                gridCols="grid-cols-3 md:grid-cols-6"
                                itemTextClass="text-base"
                            />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}
