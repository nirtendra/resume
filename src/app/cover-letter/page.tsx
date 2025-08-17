'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { AppLayout } from '@/components/AppLayout';
import { Skeleton } from '@/components/ui/skeleton';
import CoverLetterClient from '@/components/CoverLetterClient';

export default function CoverLetterPage() {
  const { user, isLoading } = useRequireAuth();

  if (isLoading || !user) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-8 w-1/2" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <CoverLetterClient user={user} />
    </AppLayout>
  );
}
