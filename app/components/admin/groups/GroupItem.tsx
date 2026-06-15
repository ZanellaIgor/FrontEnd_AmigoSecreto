'use client';

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { useConfirm } from '@/app/components/providers/ConfirmProvider';
import { Group } from '@/lib/types/Group';
import { deleteGroup } from '@/lib/api/admin';
import { ItemButton } from '../ItemButton';

type Props = {
  item: Group;
  refreshAction: () => void;
  onEdit: (group: Group) => void;
};

export const GroupItem = ({ item, refreshAction, onEdit }: Props) => {
  const { confirm } = useConfirm();

  const handleDeleteButton = async () => {
    const confirmed = await confirm({
      title: 'Excluir grupo',
      message: `Tem certeza que deseja excluir o grupo "${item.name}"?`,
      confirmLabel: 'Excluir',
      destructive: true,
    });

    if (!confirmed) return;

    const deleted = await deleteGroup(item.id_event, item.id);
    if (deleted) {
      toast.success('Grupo excluído');
      refreshAction();
    } else {
      toast.error('Não foi possível excluir o grupo');
    }
  };

  return (
    <div className="mb-3 flex items-center rounded-lg border border-gray-700 bg-gray-900 p-3">
      <div className="flex-1">{item.name}</div>
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

export const GroupItemSkeleton = () => {
  return (
    <div className="mb-3 h-16 w-full animate-pulse rounded-lg bg-linear-to-r from-gray-800 to-gray-900" />
  );
};

export const GroupItemNotFound = () => {
  return (
    <div className="py-8 text-center text-gray-500">
      Não há grupos neste evento.
    </div>
  );
};
