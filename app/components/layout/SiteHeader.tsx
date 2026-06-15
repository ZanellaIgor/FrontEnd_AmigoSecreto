import { pingAdmin } from '@/lib/api/server';
import { SiteHeaderClient } from './SiteHeaderClient';

export const SiteHeader = async () => {
  const logged = await pingAdmin();

  return <SiteHeaderClient logged={logged} />;
};
