import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Amigo Secreto - Admin',
};
const Layout = ({ children }: Props) => {
  return (
    <div>
      <header className="bg-gray-800 text-center py">
        <h3 className="text-3xl">Amigo Secreto</h3>
        <h4 className="text-base">Admin</h4>
      </header>
      <main className="mx-auto w-full max-w-3xl p-3">{children}</main>
    </div>
  );
};

export default Layout;
