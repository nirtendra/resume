'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { AppLayout } from '@/components/AppLayout';
import { Skeleton } from '@/components/ui/skeleton';
import InterviewPrepClient from '@/components/InterviewPrepClient';

export default function InterviewPrepPage() {
  const { user, isLoading } = useRequireAuth();

  if (isLoading || !user) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <InterviewPrepClient />
    </AppLayout>
  );
}
