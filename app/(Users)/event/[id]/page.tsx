import { Search } from '@/app/components/site/Seach';
import { redirect } from 'next/navigation';
import { getEvents } from '../../../components/api/site';

type Props = { params: { id: string } };

const Page = async ({ params }: Props) => {
  const eventItem = await getEvents(parseInt(params.id));
  if (!eventItem || !eventItem.status) return redirect('/');
  return (
    <main className="text-center mx-auto max-w-lg p-5">
      <header>
        <h2 className="text-2xl text-yellow-400">Amigo Secreto</h2>
        <h1 className="text-3xl mt-5 mb-2">{eventItem.title}</h1>
        <h3 className="text-sm mb-5">{eventItem.description}</h3>
      </header>
      <Search id={eventItem.id} />
    </main>
  );
};

export default Page;
