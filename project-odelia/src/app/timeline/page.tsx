import Timeline from '@/components/features/Timeline';

export const metadata = {
  title: 'Our Journey - Project Odelia',
  description: 'Choose a chapter to continue our adventure together',
};

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-parchment-100 via-parchment-200 to-parchment-100">
      <Timeline />
    </main>
  );
}
