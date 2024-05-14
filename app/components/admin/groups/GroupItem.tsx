import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Group } from '../../types/Group';
import { ItemButton } from '../ItemButton';
import { deleteGroup } from '../../api/admin';

type Props = {
  item: Group;
  refreshAction: () => void;
  onEdit: (group: Group) => void;
};

export const GroupItem = ({ item, refreshAction, onEdit }: Props) => {
  const handleDeleteButton = async () => {
    if (confirm('Tem certeza que deseja excluir este grupo?')) {
      await deleteGroup(item.id_event, item.id);
      refreshAction();
    }
  };
  return (
    <div className="border border-gray-700 bg-700 bg-gray-900 rounded p-3 mb-3  flex items-center">
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
    <div
      className="w-full h-16 bg-gray-700 rounded mb-3
    bg-gradient-to-r from-gray-900 to-gray-950  animate-pulse"
    />
  );
};

export const GroupItemNotFound = () => {
  return (
    <div className="text-center p-y4 text-gray-500">
      Não há grupos neste evento.
    </div>
  );
};
