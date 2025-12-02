// Importa as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuração do Firebase (a mesma que você já tem)
const firebaseConfig = {
  apiKey: "AIzaSyAavTyEu845YbftmoR4YuBW21o7Yjn1Ey0",
  authDomain: "simap-31bcc.firebaseapp.com",
  projectId: "simap-31bcc",
  storageBucket: "simap-31bcc.firebasestorage.app",
  messagingSenderId: "1005263314504",
  appId: "1:1005263314504:web:8aa852729ac03af04fc27d",
  measurementId: "G-5L45GHM5RY"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Exporta o serviço de autenticação
export const auth = getAuth(app);

// 🔥 Provider do Google (OBRIGATÓRIO para abrir o popup)
export const googleProvider = new GoogleAuthProvider();
