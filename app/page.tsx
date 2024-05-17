'use client';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <div>
      <header className="bg-gray-800 text-center py-3">
        <h3 className="text-3xl">Amigo Secreto</h3>
      </header>
      <div className="flex flex-col items-center mt-8">
        <h4 className="text-3xl">Qual seu perfil de usuário?</h4>
        <div className="mx-auto max-w-lg mt-5">
          <button
            onClick={() => handleClick('/login')}
            className="my-3 p-3 rounded bg-gray-700 text-white text-center w-full font-bold hover:bg-gray-600 border-b-4 border-white/10"
          >
            Faço parte de um Grupo
          </button>
          <button
            onClick={() => handleClick('/admin/login')}
            className="my-3 p-3 rounded bg-gray-700 text-white text-center w-full font-bold hover:bg-gray-600 border-b-4 border-white/10"
          >
            Sou Administrador
          </button>
        </div>
      </div>
    </div>
  );
};
export default Page;
