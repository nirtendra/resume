'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { AppLayout } from '@/components/AppLayout';
import ResumeBuilderClient from '@/components/ResumeBuilderClient';
import { Skeleton } from '@/components/ui/skeleton';

export default function ResumeBuilderPage() {
  const { user, isLoading } = useRequireAuth();

  if (isLoading || !user) {
    return (
       <AppLayout>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <Skeleton className="h-10 w-1/3 mb-4" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
            </div>
            <div>
                 <Skeleton className="h-[70vh] w-full" />
            </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ResumeBuilderClient />
    </AppLayout>
  );
}
