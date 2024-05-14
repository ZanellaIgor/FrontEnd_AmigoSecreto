import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { PersonComplete } from '../../types/PersonComplete';
import { ItemButton } from '../ItemButton';
import { deletePerson } from '../../api/admin';

type Props = {
  item: PersonComplete;
  refreschAction: () => void;
  onEdit: (person: PersonComplete) => void;
};
export const PersonItem = ({ item, refreschAction, onEdit }: Props) => {
  const handleDeleteButton = async () => {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      await deletePerson(item.id_event, item.id_group, item.id);
      refreschAction();
    }
  };
  return (
    <div className="border border-gray-700 bg-700 bg-gray-900 rounded p-3 mb-3 flex items-center">
      <div className="flex-1">
        {item.name} (CPF: {item.cpf})
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
    <div
      className="w-full h-16 bg-gray-700 rounded mb-3
    bg-gradient-to-r from-gray-900 to-gray-950  animate-pulse"
    />
  );
};

export const PersonItemNotFound = () => {
  return (
    <div className="text-center p-y4 text-gray-500">
      Não há grupos pessoas nesse grupo.
    </div>
  );
};
