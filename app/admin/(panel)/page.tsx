import { redirect } from 'next/navigation';
import { pingAdmin } from '@/lib/api/server';
import { AdminPage } from '@/app/components/admin/AdminPage';

const Page = async () => {
  const logged = await pingAdmin();
  if (!logged) return redirect('/admin/login');
  return <AdminPage />;
};

export default Page;
