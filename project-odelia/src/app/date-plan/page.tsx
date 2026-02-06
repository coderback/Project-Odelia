import DatePlanHub from '@/components/features/DatePlanHub';

export const metadata = {
  title: 'Plan Our Date - Project Odelia',
  description: 'Choose our perfect date together',
};

export default function DatePlanPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-parchment-100 via-parchment-200 to-parchment-100">
      <DatePlanHub />
    </main>
  );
}
