function NavComands({ estadoMenuLateral, clickHome, clickBusca, clickAcesso, clickGuide, clickSettings }) {
    const baseClasses =
        "bg-gradient-to-b from-[#004B24] via-[#00582A] to-[#0EB860] h-[90%] flex flex-col justify-between py-6 transition-all duration-300 fixed";

    return (
        <>
            {/* Menu Fechado */}
            {estadoMenuLateral === "close" && (
                <nav className={`${baseClasses} w-16 items-center`}>
                    <div className="flex flex-col items-center gap-6 flex-1 justify-center">
                        <i
                            className="fa-solid fa-house text-white text-2xl cursor-pointer mt-6"
                            onClick={clickHome}
                        ></i>
                        <div className="w-8 border-t border-white"></div>
                        <i
                            className="fa-solid fa-magnifying-glass text-white text-2xl cursor-pointer"
                            onClick={clickBusca}
                        ></i>
                        <div className="w-8 border-t border-white"></div>

                        {/* Ícone de Controle de Acesso */}
                        <i
                            className="fa-solid fa-user-lock text-white text-2xl cursor-pointer"
                            onClick={clickAcesso}
                            title="Controle de Acesso"
                        ></i>
                    </div>

                    <div className="flex flex-col items-center gap-5 mb-4">
                        <div
                            className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center cursor-pointer"
                            onClick={clickGuide}
                        >
                            <span className="text-sm text-white font-bold">?</span>
                        </div>
                        <i
                            className="fa-solid fa-gear text-white text-xl cursor-pointer"
                            onClick={clickSettings}
                        ></i>
                    </div>
                </nav>
            )}

            {/* Menu Aberto */}
            {estadoMenuLateral === "open" && (
                <nav className={`${baseClasses} w-64 px-4 flex flex-col justify-between items-stretch`}>
                    {/* Bloco que ocupa toda a altura e centraliza o conteúdo */}
                    <div className="flex flex-col flex-1 items-start justify-center gap-6">
                        <div className="flex items-center gap-4 cursor-pointer text-white" onClick={clickHome}>
                            <i className="fa-solid fa-house text-2xl" />
                            <span className="text-lg">Início</span>
                        </div>

                        <div className="w-full border-t border-white" />

                        <div className="flex items-center gap-4 cursor-pointer text-white" onClick={clickBusca}>
                            <i className="fa-solid fa-magnifying-glass text-2xl" />
                            <span className="text-lg">Pesquisar</span>
                        </div>

                        <div className="w-full border-t border-white" />

                        {/* Item de Controle de Acesso */}
                        <div className="flex items-center gap-4 cursor-pointer text-white" onClick={clickAcesso}>
                            <i className="fa-solid fa-user-lock text-2xl" />
                            <span className="text-lg">Acesso</span>
                        </div>
                    </div>

                    {/* Rodapé do menu */}
                    <div className="flex flex-col items-start gap-5 mb-4">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={clickGuide}>
                            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                                <span className="text-sm text-white font-bold">?</span>
                            </div>
                            <span className="text-sm text-white">Guia</span>
                        </div>

                        <div className="flex items-center gap-4 cursor-pointer" onClick={clickSettings}>
                            <i className="fa-solid fa-gear text-2xl text-white" />
                            <span className="text-lg text-white">Configurar</span>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default NavComands;