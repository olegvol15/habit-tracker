import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import BlurText from "../../components/ui/blur-text-animation";
import { Button } from "../../components/ui/button";
import CreateHabitModal from "../../components/habits/CreateHabitModal";
import { WeekTable } from "../../components/habits/WeekTable";

export const Route = createFileRoute("/_app/habits")({
  component: HabitsPage,
});

function HabitsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 px-2 py-6 sm:p-6">
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

      <WeekTable />

      <CreateHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
