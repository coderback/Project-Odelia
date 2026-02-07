import Timeline from '@/components/features/Timeline';

export const metadata = {
  title: 'Our Journey - Project Odelia',
  description: 'Choose a chapter to continue our adventure together',
};

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50">
      <Timeline />
    </main>
  );
}
