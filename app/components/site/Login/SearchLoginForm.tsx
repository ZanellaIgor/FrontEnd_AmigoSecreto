'use client';
import React, { useEffect, useState } from 'react';
import { escapeCPF } from '../../utils/functions/escapeCPF';
import { useRouter, redirect } from 'next/navigation';
import { InputField } from '../../admin/InputField';
import { Button } from '../../admin/Button';
import { z } from 'zod';
import {
  ErrorItem,
  getErrosFromZod,
} from '../../utils/functions/getErrorsFromZod';
import { getEventByPerson } from '../../api/site';

export const SearchLoginForm = () => {
  const [cpfInput, setCpfInput] = useState<string>('');
  const [numberEventInput, setNumberEventInput] = useState<string>('');
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleClick = (path: string, redirect = false) => {
    setErrors([]);
    if (!cpfInput.trim() && !numberEventInput.trim()) {
      return setErrors([
        {
          field: 'numberEventInput',
          message: 'CPF ou número do evento devem ser prenchidos',
        },
        {
          field: 'cpfInput',
          message: 'CPF ou número do evento devem ser prenchidos',
        },
      ]);
    }
    if (redirect) {
      return router.push(path);
    }
  };

  const testess = async () => {
    try {
      const json = await getEventByPerson('65265078919');
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    testess();
  }, []);
  return (
    <div className="text-center mx-auto max-w-lg p-5 mt-5">
      <label htmlFor="cpfInput" className="mb3-3 text-xl">
        Qual seu CPF?
      </label>
      <InputField
        type="text"
        name="cpfInput"
        inputMode="numeric"
        autoFocus
        value={cpfInput}
        onChange={(e) => setCpfInput(escapeCPF(e.target.value))}
        disabled={loading}
        errorMessage={errors.find((item) => item.field === 'cpfInput')?.message}
      />

      <Button
        onClick={() => handleClick(`/event/${numberEventInput}`)}
        disabled={loading}
        value={loading ? 'Buscando...' : 'Buscar'}
      />

      <label htmlFor="numberEventInput" className="mb3-3 text-xl">
        Número do Evento:
        <InputField
          name="numberEventInput"
          inputMode="numeric"
          value={numberEventInput}
          onChange={(e) => setNumberEventInput(e.target.value)}
          disabled={loading}
          errorMessage={
            errors.find((item) => item.field === 'numberEventInput')?.message
          }
        />
      </label>
      <Button
        onClick={() => handleClick(`/event/${numberEventInput}`, true)}
        disabled={loading}
        value={loading ? 'Buscando...' : 'Buscar'}
      />
    </div>
  );
};
