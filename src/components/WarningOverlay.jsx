const WarningOverlay = ({ onRetry, onBack }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="flex flex-col items-center text-center bg-white p-10 rounded-xl shadow-2xl max-w-md mx-4 animate-fadeIn">

                {/* Ícone */}
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                    <svg
                        className="h-8 w-8 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z"
                        />
                    </svg>
                </div>

                {/* Título */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Ops! Algo deu errado.
                </h2>

                {/* Texto */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Não foi possível carregar os dados.  
                    Por favor, verifique sua conexão ou tente novamente.
                </p>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">

                    <button
                        onClick={onRetry}
                        className="w-full px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-200"
                    >
                        Tentar Novamente
                    </button>

                    <button
                        onClick={onBack}
                        className="w-full px-6 py-3 rounded-lg bg-transparent text-gray-700 font-semibold border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                    >
                        Voltar à Busca
                    </button>

                </div>

            </div>
        </div>
    );
};

export default WarningOverlay;
