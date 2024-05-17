import { SearchLoginForm } from '@/app/components/site/Login/SearchLoginForm';

const Page = async () => {
  return (
    <>
      <header className="bg-gray-800 text-center py-3">
        <h3 className="text-3xl">Amigo Secreto</h3>
      </header>
      <SearchLoginForm />
    </>
  );
};

export default Page;
