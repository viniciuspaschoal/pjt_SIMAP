const ExitConfirmOverlay = ({ onStay, onDiscard }) => {
    return (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-fadeIn">

                {/* Título mais amigável */}
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                    Você tem alterações pendentes não aplicadas
                </h2>

                {/* Texto mais humanizado */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Existem alterações não salvas.
                    <br />
                    Tem certeza de que deseja descartá-las e sair da tela?
                </p>

                {/* Botões */}
                <div className="flex gap-4">
                    <button
                        onClick={onStay}
                        className="flex-1 py-2 bg-[#05c361] text-black rounded-lg 
                                   hover:bg-[#00ae54] transition-all duration-200"
                    >
                        Continuar aqui
                    </button>

                    <button
                        onClick={onDiscard}
                        className="flex-1 py-2 bg-red-600 text-white rounded-lg 
                                   hover:bg-red-700 transition-all duration-200"
                    >
                        Sair mesmo assim
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ExitConfirmOverlay;
