import { redirect } from 'next/navigation';
import { getEvents } from '../../../components/api/site';
import { Search } from '@/app/components/site/Seach';

type Props = { params: { id: string } };

const Page = async ({ params }: Props) => {
  const eventItem = await getEvents(parseInt(params.id));
  console.log(eventItem);
  if (!eventItem || !eventItem.status) return redirect('/');
  console.log(eventItem);
  return (
    <main className="text-center mx-auto max-w-lg p-5">
      <header>
        <h2 className="text-2xl text-yellow-400">Amigo Secreto</h2>
        <h1 className="text-3xl mt-5 mb-2">{eventItem.title}</h1>
        <h3 className="text-sm mb-5">{eventItem.description}</h3>
      </header>
      <Search id={eventItem.id} />
      <footer className="mt-5 text-sm">Adaptado por Igor Zanella</footer>
    </main>
  );
};

export default Page;
