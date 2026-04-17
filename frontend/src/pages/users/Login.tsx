import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.access);
            localStorage.setItem('username', username);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Identifiants incorrects. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060B1A] flex items-center justify-center px-4 font-sans">

            {/* Fond décoratif */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/30">
                            GN
                        </div>
                        <div className="text-left">
                            <h1 className="text-white font-black text-2xl italic uppercase tracking-tighter leading-none">
                                Portail<span className="text-blue-500">Web</span>
                            </h1>
                            <span className="text-white/40 text-[9px] font-bold tracking-[0.4em] uppercase">
                                République de Guinée
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                        <ShieldCheck size={14} className="text-blue-500" />
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                            Accès Administrateur Sécurisé
                        </span>
                    </div>
                </div>

                {/* Carte de connexion */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10">
                    <h2 className="text-white font-black text-3xl uppercase italic tracking-tighter mb-2">
                        Connexion
                    </h2>
                    <p className="text-white/40 text-sm font-medium mb-10">
                        Entrez vos identifiants pour accéder au tableau de bord.
                    </p>

                    {error && (
                        <div className="mb-6 px-5 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                            <p className="text-red-400 text-[11px] font-black uppercase tracking-widest">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nom d'utilisateur */}
                        <div className="space-y-2">
                            <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] ml-2">
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                placeholder="admin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                            />
                        </div>

                        {/* Mot de passe */}
                        <div className="space-y-2">
                            <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] ml-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-5 pr-14 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Bouton */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Vérification...
                                </span>
                            ) : 'Accéder au tableau de bord'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-widest mt-8">
                    © 2026 Direction du Numérique — République de Guinée
                </p>
            </div>
        </div>
    );
};

export default Login;
