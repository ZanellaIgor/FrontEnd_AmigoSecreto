'use client';

import { FaLink, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { useConfirm } from '@/app/components/providers/ConfirmProvider';
import { Event } from '@/lib/types/Event';
import { deleteEvent } from '@/lib/api/admin';
import { ItemButton } from '../ItemButton';

type Props = {
  item: Event;
  refreshAction: () => void;
  openModal: (event: Event) => void;
};

export const EventItem = ({ item, refreshAction, openModal }: Props) => {
  const { confirm } = useConfirm();

  const handleEditButton = () => {
    openModal(item);
  };

  const handleDeleteButton = async () => {
    const confirmed = await confirm({
      title: 'Excluir evento',
      message: `Tem certeza que deseja excluir "${item.title}"? Esta ação não pode ser desfeita.`,
      confirmLabel: 'Excluir',
      destructive: true,
    });

    if (!confirmed) return;

    const deleted = await deleteEvent(item.id);
    if (deleted) {
      toast.success('Evento excluído');
      refreshAction();
    } else {
      toast.error('Não foi possível excluir o evento');
    }
  };

  return (
    <div className="mb-3 flex flex-col gap-3 rounded-xl border border-gray-700/80 bg-gray-900/60 p-4 md:flex-row md:items-center">
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium text-white">{item.title}</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              item.status
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {item.status ? 'Liberado' : 'Rascunho'}
          </span>
          {item.grouped && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-400">
              Com grupos
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-1">
        {item.status && (
          <div className="rounded border border-dashed border-amber-400/40">
            <ItemButton
              IconElement={FaLink}
              label="Link do Evento"
              href={`/event/${item.id}`}
              target="_blank"
            />
          </div>
        )}
        <ItemButton
          IconElement={FaRegEdit}
          label="Editar"
          onClick={handleEditButton}
        />
        <ItemButton
          IconElement={FaRegTrashAlt}
          label="Excluir"
          onClick={handleDeleteButton}
        />
      </div>
    </div>
  );
};

export const EventItemSkeleton = () => {
  return (
    <div className="mb-3 h-16 w-full animate-pulse rounded-lg bg-linear-to-r from-gray-800 to-gray-900" />
  );
};

export const EventItemNotFound = () => {
  return (
    <div className="py-8 text-center text-gray-500">
      Nenhum evento encontrado. Crie o primeiro evento com o botão +.
    </div>
  );
};
