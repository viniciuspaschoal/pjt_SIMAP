import { useEffect, useState, useMemo } from "react";
import { 
  Users, 
  UserPlus, 
  Search, 
  Shield, 
  CheckCircle, 
  UserX, 
  Loader2,
  Save 
} from "lucide-react";

import {
  listarUsuarios,
  listarPendentes,
  ativarUsuario,
  desativarUsuario,
  alterarCargo
} from "../services/adminService";

export default function AdminUsuarios() {

    // =======================
    // 1. Estados e Dados
    // =======================
    const [usuarios, setUsuarios] = useState([]);
    const [pendentes, setPendentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("ativos");
    const [searchTerm, setSearchTerm] = useState("");
    
    // Estado para "Draft" (mudanças não salvas)
    const [cargosTemporarios, setCargosTemporarios] = useState({});

    // =======================
    // 2. Lógica de Permissão (Do seu código)
    // =======================
    
    // Recupera usuário logado
    const userLogado = JSON.parse(localStorage.getItem("user"));
    const minhaRole = userLogado?.role || "USUARIO";

    const HIERARQUIA = {
        SUPER_ADMIN: 5,
        GESTAO: 4,
        DIRECAO_ESCOLAR: 3,
        COORDENACAO_ESCOLAR: 2,
        USUARIO: 1
    };

    const CARGOS_DISPONIVEIS = [
        { value: "USUARIO", label: "Professor" },
        { value: "COORDENACAO_ESCOLAR", label: "Coordenação" },
        { value: "DIRECAO_ESCOLAR", label: "Direção" },
        { value: "GESTAO", label: "Gestão" },
        { value: "SUPER_ADMIN", label: "Super Admin" }
    ];

    // Validação de Hierarquia
    function podeAlterarCargo(roleAdmin, roleAlvo, novoCargo) {
        if (roleAdmin === "SUPER_ADMIN") return true;

        const poderAdmin = HIERARQUIA[roleAdmin] || 0;
        const poderAlvo = HIERARQUIA[roleAlvo] || 0;
        const poderNovo = HIERARQUIA[novoCargo] || 0;

        // Regras de negócio
        if (roleAlvo === "SUPER_ADMIN") return false; // Ninguém mexe no Super Admin
        if (poderNovo > poderAdmin) return false;     // Não pode promover acima de si mesmo
        if (poderAlvo >= poderAdmin) return false;    // Não pode mexer em alguém de nível igual ou maior

        return true;
    }

    // =======================
    // 3. Carregamento e Ações
    // =======================
    async function carregarTudo() {
        setLoading(true);
        try {
            const [ativosResp, pendentesResp] = await Promise.all([
                listarUsuarios(),
                listarPendentes()
            ]);

            // Filtragem segura
            const ativos = ativosResp.data?.filter(u => u.ativo === true) || [];
            
            setUsuarios(ativos);
            setPendentes(pendentesResp.data || []);
            setCargosTemporarios({}); // Limpa edições pendentes
        } catch (err) {
            console.error(err);
            alert("Erro ao carregar dados.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarTudo();
    }, []);

    // Filtro de Busca
    const dadosFiltrados = useMemo(() => {
        const lista = activeTab === "ativos" ? usuarios : pendentes;
        if (!searchTerm) return lista;

        const termo = searchTerm.toLowerCase();
        return lista.filter(u => 
            (u.nome && u.nome.toLowerCase().includes(termo)) ||
            (u.email && u.email.toLowerCase().includes(termo))
        );
    }, [usuarios, pendentes, activeTab, searchTerm]);

    // Manipuladores de Ação
    const handleSelectChange = (id, novoCargo) => {
        setCargosTemporarios(prev => ({ ...prev, [id]: novoCargo }));
    };

    const salvarAlteracaoCargo = async (id) => {
        const novoCargo = cargosTemporarios[id];
        if (!novoCargo) return;

        try {
            await alterarCargo(id, novoCargo);
            
            // Remove do estado temporário e recarrega
            const clone = { ...cargosTemporarios };
            delete clone[id];
            setCargosTemporarios(clone);
            
            carregarTudo();
        } catch (error) {
            console.error("Erro ao alterar cargo", error);
            alert("Erro ao salvar o cargo.");
        }
    };

    const handleAtivar = async (id) => {
        try { await ativarUsuario(id); carregarTudo(); } catch (e) { console.error(e); }
    };

    const handleDesativar = async (id) => {
        if(!confirm("Tem certeza que deseja desativar este usuário?")) return;
        try { await desativarUsuario(id); carregarTudo(); } catch (e) { console.error(e); }
    };

    // Componente Visual Avatar
    const Avatar = ({ nome }) => (
        <div className="h-10 w-10 min-w-[2.5rem] rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shadow-sm">
            {nome ? nome.charAt(0).toUpperCase() : "?"}
        </div>
    );

    // =======================
    // 4. Renderização
    // =======================
    return (
        <div className="min-h-[90vh] bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Cabeçalho e Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Controle de Acesso</h1>
                        <p className="text-gray-500 mt-1">Gerencie sua equipe, cargos e aprovações.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 w-full md:w-auto">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Users size={20} /></div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">Ativos</p>
                                <p className="text-xl font-bold text-gray-900">{usuarios.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 w-full md:w-auto">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><UserPlus size={20} /></div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">Pendentes</p>
                                <p className="text-xl font-bold text-gray-900">{pendentes.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Painel Principal */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    
                    {/* Toolbar (Abas e Busca) */}
                    <div className="border-b border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white z-10">
                        <div className="flex bg-gray-100 p-1 rounded-lg self-start">
                            <button onClick={() => setActiveTab("ativos")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "ativos" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Usuários Ativos</button>
                            <button onClick={() => setActiveTab("pendentes")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === "pendentes" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                Pendentes {pendentes.length > 0 && (<span className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{pendentes.length}</span>)}
                            </button>
                        </div>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" />
                        </div>
                    </div>

                    {/* Lista com Scroll */}
                    <div className="relative min-h-[300px]">
                        {loading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-white/90 z-20 backdrop-blur-sm">
                                <Loader2 className="animate-spin mb-2 text-emerald-600" size={32} />
                                <span className="text-sm font-medium text-gray-600">Carregando dados...</span>
                            </div>
                        )}

                        {!loading && dadosFiltrados.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <div className="bg-gray-50 p-4 rounded-full mb-3"><Search size={32} /></div>
                                <p>Nenhum resultado encontrado.</p>
                            </div>
                        ) : (
                            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                <div className="divide-y divide-gray-100">
                                    {dadosFiltrados.map((u) => {
                                        // Verifica status de edição
                                        const cargoAtual = cargosTemporarios[u.id] || u.role || "USUARIO";
                                        const temAlteracao = cargosTemporarios[u.id] && cargosTemporarios[u.id] !== u.role;

                                        return (
                                            <div key={u.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                                
                                                {/* Info Usuário */}
                                                <div className="flex items-center gap-4">
                                                    <Avatar nome={u.nome} />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{u.nome}</p>
                                                        <p className="text-sm text-gray-500">{u.email}</p>
                                                    </div>
                                                </div>

                                                {/* Ações */}
                                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                                    {activeTab === "ativos" ? (
                                                        <>
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative">
                                                                    <Shield className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                                                    
                                                                    <select
                                                                        value={cargoAtual}
                                                                        onChange={(e) => handleSelectChange(u.id, e.target.value)}
                                                                        className={`pl-8 pr-8 py-1.5 border rounded-md text-sm focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm transition-all appearance-none ${
                                                                            temAlteracao 
                                                                                ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium" 
                                                                                : "bg-white border-gray-200 text-gray-700"
                                                                        }`}
                                                                    >
                                                                        {CARGOS_DISPONIVEIS.map((cargo) => {
                                                                            // APLICAÇÃO DA LÓGICA DE PERMISSÃO
                                                                            const permitido = podeAlterarCargo(minhaRole, u.role, cargo.value);
                                                                            
                                                                            return (
                                                                                <option 
                                                                                    key={cargo.value} 
                                                                                    value={cargo.value}
                                                                                    disabled={!permitido}
                                                                                    className={!permitido ? "text-gray-300 bg-gray-50 italic" : "text-gray-900"}
                                                                                >
                                                                                    {cargo.label} {!permitido && "(Indisponível)"}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                </div>

                                                                {/* Botão Salvar (Só aparece se mudou e tem permissão) */}
                                                                {temAlteracao && (
                                                                    <button
                                                                        onClick={() => salvarAlteracaoCargo(u.id)}
                                                                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all animate-in fade-in zoom-in duration-200"
                                                                        title="Salvar alteração"
                                                                    >
                                                                        <Save size={16} />
                                                                    </button>
                                                                )}
                                                            </div>

                                                            <div className="h-6 w-px bg-gray-200 mx-1"></div>

                                                            <button onClick={() => handleDesativar(u.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Revogar Acesso">
                                                                <UserX size={18} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button onClick={() => handleAtivar(u.id)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95">
                                                            <CheckCircle size={16} /> Aprovar Acesso
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Rodapé */}
                    <div className="bg-gray-50 border-t border-gray-200 p-3 text-center text-xs text-gray-500 font-medium">
                        Mostrando {dadosFiltrados.length} registro(s)
                    </div>
                </div>
            </div>
        </div>
    );
}