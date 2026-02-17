import { useState } from "react";
import { toast } from "sonner";
import { useCreateHabit } from "../../hooks/habits";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { validateHabitTitle } from "../../utils/validators";

type CreateHabitModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateHabitModal({ isOpen, onClose }: CreateHabitModalProps) {
  const [title, setTitle] = useState("");
  const createHabit = useCreateHabit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = validateHabitTitle(title);
    if (titleError) { toast.error(titleError); return; }

    createHabit.mutate(
      { title: title.trim() },
      {
        onSuccess: () => {
          setTitle("");
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a new habit">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="habit-title" className="text-sm text-zinc-400">
            Habit name
          </label>
          <input
            id="habit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Exercise for 30 minutes"
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!title.trim() || createHabit.isPending}
          >
            {createHabit.isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
