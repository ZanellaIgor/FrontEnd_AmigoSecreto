'use client';

import { Button } from '@/app/components/admin/Button';
import { InputField } from '@/app/components/admin/InputField';
import { login } from '@/app/components/api/admin';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [passwordInput, setPassordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const handleLoginButton = async () => {
    setLoading(true);
    try {
      if (passwordInput) {
        setWarning('');
        const token = await login(passwordInput);
        if (!token) {
          throw new Error('Token não obtido');
        } else {
          setCookie('token', token);
          router.push('/admin');
        }
      } else {
        throw new Error('Senha não informada');
      }
    } catch (error) {
      setWarning('Erro ao tentar autenticação, tente mais tarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center py-4">
      <p className="text-lg">Qual a Senha Secreta?</p>
      <div className="mx-auto max-w-lg">
        <InputField
          type="password"
          value={passwordInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassordInput(e.target.value)
          }
          placeholder="Digite Sua Senha"
          disabled={loading}
        />
        <Button onClick={handleLoginButton} value="Entrar" />

        {warning && <div>{warning}</div>}
      </div>
    </div>
  );
};

export default Page;
