import WaterBackground from '@/components/ui/WaterBackground';
import ParchmentCard from '@/components/ui/ParchmentCard';
import QuestionInterface from '@/components/features/QuestionInterface';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      {/* Animated Water Background */}
      <WaterBackground />

      {/* Main Content Card */}
      <ParchmentCard className="mt-8">
        <QuestionInterface />
      </ParchmentCard>
    </main>
  );
}
