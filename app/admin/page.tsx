import { redirect } from 'next/navigation';
import { pingAdmin } from '../components/api/server';

const Page = async () => {
  const logged = await pingAdmin();
  if (!logged) return redirect('/admin/login');
  return (
    <div>
      <h1 className="text-center text-3xl">Admin</h1>
    </div>
  );
};

export default Page;
