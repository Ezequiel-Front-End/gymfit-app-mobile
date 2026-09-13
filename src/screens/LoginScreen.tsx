import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { GoogleIcon } from '../components/GoogleIcon';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onGoToSignup: () => void;
  onBack?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onGoToSignup,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Por favor, digite seu e-mail.');
      return;
    }
    if (!password) {
      setErrorMessage('Por favor, digite sua senha.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 400);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('atleta.google@gymfit.com');
    }, 500);
  };

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[#060608] flex flex-col justify-center overflow-y-auto no-scrollbar select-none px-6 py-8">
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center">
        {/* Header Title: Exact match to design 02 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="font-display font-black italic text-4xl uppercase text-white tracking-tight leading-none">
            Entrar
          </h2>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="text-zinc-400 text-sm">Novo por aqui?</span>
            <button
              type="button"
              onClick={onGoToSignup}
              className="text-[#D4FF00] text-sm font-bold hover:underline cursor-pointer"
            >
              Criar conta
            </button>
          </div>
        </motion.div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Email Input */}
          <div className="flex items-center gap-3 bg-[#111114] border border-zinc-800/90 focus-within:border-[#D4FF00] rounded-2xl px-4 py-3.5 transition">
            <Mail className="w-5 h-5 text-zinc-500 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              autoComplete="email"
              className="bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-500 w-full"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center gap-3 bg-[#111114] border border-zinc-800/90 focus-within:border-[#D4FF00] rounded-2xl px-4 py-3.5 transition">
            <Lock className="w-5 h-5 text-zinc-500 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              autoComplete="current-password"
              className="bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-500 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-zinc-400 hover:text-zinc-200 transition shrink-0 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Error notice if any */}
          {errorMessage && (
            <p className="text-xs text-rose-400 font-medium px-1 -mt-1">
              {errorMessage}
            </p>
          )}

          {/* Primary Action Button: Lime pill "Entrar" */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
            className="mt-3 w-full h-[52px] rounded-full bg-[#D4FF00] hover:bg-[#ddff22] text-black font-black italic text-base uppercase tracking-wide flex items-center justify-center transition shadow-lg cursor-pointer"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </motion.button>

          {/* Divider "ou" */}
          <div className="flex items-center my-2.5">
            <div className="flex-1 h-[1px] bg-zinc-850" />
            <span className="px-3 text-xs text-zinc-500 font-medium lowercase">
              ou
            </span>
            <div className="flex-1 h-[1px] bg-zinc-850" />
          </div>

          {/* Social Google Button */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileTap={{ scale: 0.98 }}
            className="w-full h-[52px] rounded-full border border-zinc-750 bg-transparent hover:bg-zinc-900/60 text-white font-bold text-sm flex items-center justify-center gap-3 transition cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span>Continuar com Google</span>
          </motion.button>
        </form>
      </div>
    </div>
  );
};
