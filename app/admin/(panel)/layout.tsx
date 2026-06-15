import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AdminShell } from '@/app/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Amigo Secreto - Admin',
};

export default function PanelLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
