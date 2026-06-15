'use client';

import { FormEvent, useId, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';
import { Event } from '@/lib/types/Event';
import {
  ErrorItem,
  getErrorsFromZod,
} from '@/lib/utils/getErrorsFromZod';
import { Button } from '@/app/components/ui/Button';
import { FormSection } from '@/app/components/ui/FormSection';
import { InputField } from '@/app/components/ui/InputField';
import { SwitchField } from '@/app/components/ui/SwitchField';
import { TextAreaField } from '@/app/components/ui/TextAreaField';

export type EventFormValues = {
  title: string;
  description: string;
  grouped: boolean;
  status: boolean;
};

type Props = {
  mode: 'create' | 'edit';
  initial?: Event;
  submitLabel: string;
  onSubmit: (values: EventFormValues) => Promise<boolean>;
};

const eventSchema = z.object({
  title: z.string().trim().min(1, 'Informe o título do evento'),
  description: z.string().trim().min(1, 'Informe a descrição do evento'),
  grouped: z.boolean(),
  status: z.boolean(),
});

export const EventForm = ({ mode, initial, submitLabel, onSubmit }: Props) => {
  const formId = useId();
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [grouped, setGrouped] = useState(initial?.grouped ?? false);
  const [status, setStatus] = useState(initial?.status ?? false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fieldError = (field: string) =>
    errors.find((item) => item.field === field)?.message;

  const handleCopyLink = async () => {
    if (!initial) return;

    const url = `${window.location.origin}/event/${initial.id}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copiado');
    } catch {
      toast.error('Não foi possível copiar o link');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const data = eventSchema.safeParse({
      title,
      description,
      grouped,
      status,
    });

    if (!data.success) {
      setErrors(getErrorsFromZod(data.error));
      return;
    }

    setLoading(true);
    const success = await onSubmit(data.data);
    setLoading(false);

    if (!success) return;
  };

  return (
    <form id={formId} className="space-y-5" onSubmit={handleSubmit}>
      {mode === 'edit' && initial && (
        <div className="flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status do evento
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  status
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {status
                  ? 'Liberado para participantes'
                  : 'Rascunho — oculto no link'}
              </span>
              {grouped && (
                <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-400">
                  Sorteio por grupos
                </span>
              )}
            </div>
          </div>

          {status && (
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-500/20"
            >
              <FaCopy aria-hidden className="text-xs" />
              Copiar link
            </button>
          )}
        </div>
      )}

      <FormSection
        title="Identificação"
        description="Nome e descrição exibidos para os participantes."
      >
        <InputField
          id={`${formId}-title`}
          name="title"
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex.: Natal da família"
          disabled={loading}
          autoFocus={mode === 'create'}
          maxLength={80}
          errorMessage={fieldError('title')}
        />
        <TextAreaField
          id={`${formId}-description`}
          name="description"
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex.: Sorteio do Natal em casa da vó, valor máximo R$ 80"
          rows={3}
          disabled={loading}
          maxLength={300}
          errorMessage={fieldError('description')}
        />
      </FormSection>

      <FormSection
        title="Configurações"
        description={
          mode === 'create'
            ? 'Você pode alterar essas opções depois de criar o evento.'
            : 'Defina como o sorteio funciona e quando fica visível.'
        }
      >
        <SwitchField
          id={`${formId}-grouped`}
          label="Sorteio por grupos"
          hint="Cada grupo sorteia apenas entre seus próprios participantes."
          checked={grouped}
          disabled={loading}
          onChange={setGrouped}
        />

        {mode === 'edit' && (
          <>
            <div className="border-t border-gray-800" />
            <SwitchField
              id={`${formId}-status`}
              label="Liberar evento"
              hint="Quando ativo, participantes consultam o resultado pelo link com CPF."
              checked={status}
              disabled={loading}
              onChange={setStatus}
            />
          </>
        )}
      </FormSection>

      <div className="flex justify-end gap-3 border-t border-gray-800 pt-4">
        <Button
          type="submit"
          value={submitLabel}
          loading={loading}
          disabled={loading}
          fullWidth={false}
          className="min-w-40"
        />
      </div>
    </form>
  );
};
