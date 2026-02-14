import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import BlurText from "../../components/ui/blur-text-animation";
import { Button } from "../../components/ui/button";
import { useCurrentUser } from "../../hooks/auth";
import CreateHabitModal from "../../components/habits/CreateHabitModal";
import { WeekTable } from "../../components/habits/WeekTable";

export const Route = createFileRoute("/_app/habits")({
  component: HabitsPage,
});

function HabitsPage() {
  const { data: me } = useCurrentUser();
  const userId = me?.user?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!userId) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-zinc-400">Loading habits...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <BlurText
        text="Motivation is what gets you started. Habit is what keeps you going."
        delay={200}
        animateBy="words"
        direction="top"
        className="text-3xl sm:text-5xl lg:text-7xl font-bold flex justify-center text-center"
      />

      <div className="flex justify-end">
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          Create habit
        </Button>
      </div>

      <WeekTable userId={userId} />

      <CreateHabitModal
        userId={userId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
