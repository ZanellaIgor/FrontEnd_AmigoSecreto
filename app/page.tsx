import { redirect } from 'next/navigation';
import { pingAdmin } from './components/api/server';

const Page = async () => {
  const logged = await pingAdmin();
  if (!logged) return redirect('/admin/login');
  if (logged) redirect('admin');
  return <div></div>;
};
export default Page;
