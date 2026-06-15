'use client';

import { Button } from '@/app/components/ui/Button';
import { InputField } from '@/app/components/ui/InputField';
import { login } from '@/lib/api/admin';
import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!passwordInput) {
        setError('Informe a senha');
        return;
      }

      const token = await login(passwordInput);
      if (!token) {
        setError('Senha incorreta ou servidor indisponível');
        toast.error('Não foi possível autenticar');
        return;
      }

      setCookie('token', token, { path: '/' });
      toast.success('Login realizado');
      router.refresh();
      router.push('/admin');
    } catch {
      setError('Erro ao tentar autenticação, tente mais tarde');
      toast.error('Erro ao tentar autenticação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-700/80 bg-gray-900/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-white">Área do organizador</h2>
      <p className="mt-1 text-sm text-gray-400">
        Senha no formato{' '}
        <span className="font-mono text-amber-400">DDMMAAAA</span> (data de hoje)
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-1">
        <InputField
          type="password"
          name="password"
          label="Senha"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Ex.: 15062026"
          disabled={loading}
          errorMessage={error}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          value="Entrar"
          loading={loading}
          disabled={loading}
          className="mt-2"
        />
      </form>
    </div>
  );
};

export default Page;
