'use client';

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { useConfirm } from '@/app/components/providers/ConfirmProvider';
import { PersonComplete } from '@/lib/types/PersonComplete';
import { deletePerson } from '@/lib/api/admin';
import { ItemButton } from '../ItemButton';

type Props = {
  item: PersonComplete;
  refreschAction: () => void;
  onEdit: (person: PersonComplete) => void;
};

const maskCpf = (cpf: string) => {
  if (cpf.length < 11) return cpf;
  return `***.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-**`;
};

export const PersonItem = ({ item, refreschAction, onEdit }: Props) => {
  const { confirm } = useConfirm();

  const handleDeleteButton = async () => {
    const confirmed = await confirm({
      title: 'Excluir pessoa',
      message: `Tem certeza que deseja excluir "${item.name}"?`,
      confirmLabel: 'Excluir',
      destructive: true,
    });

    if (!confirmed) return;

    const deleted = await deletePerson(item.id_event, item.id_group, item.id);
    if (deleted) {
      toast.success('Pessoa excluída');
      refreschAction();
    } else {
      toast.error('Não foi possível excluir a pessoa');
    }
  };

  return (
    <div className="mb-3 flex items-center rounded-lg border border-gray-700 bg-gray-900 p-3">
      <div className="flex-1">
        {item.name}{' '}
        <span className="text-sm text-gray-400">(CPF: {maskCpf(item.cpf)})</span>
      </div>
      <ItemButton
        IconElement={FaRegEdit}
        label="Editar"
        onClick={() => onEdit(item)}
      />
      <ItemButton
        IconElement={FaRegTrashAlt}
        label="Deletar"
        onClick={handleDeleteButton}
      />
    </div>
  );
};

export const PersonItemSkeleton = () => {
  return (
    <div className="mb-3 h-16 w-full animate-pulse rounded-lg bg-linear-to-r from-gray-800 to-gray-900" />
  );
};

export const PersonItemNotFound = () => {
  return (
    <div className="py-8 text-center text-gray-500">
      Não há pessoas neste grupo.
    </div>
  );
};
