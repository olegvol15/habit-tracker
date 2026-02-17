import { useEffect, useRef, useState } from "react";
import { useEditHabit, useDeleteHabit } from "../../hooks/habits";
import { validateHabitTitle } from "../../utils/validators";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Trash2, Edit } from "lucide-react";

export default function HabitRow({
  habit,
  editHabit,
  deleteHabit,
  children,
}: {
  habit: { id: number; title: string };
  editHabit: ReturnType<typeof useEditHabit>;
  deleteHabit: ReturnType<typeof useDeleteHabit>;
  children: React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [draft, setDraft] = useState(habit.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed === habit.title) { setEditing(false); return; }

    const titleError = validateHabitTitle(trimmed);
    if (titleError) { toast.error(titleError); return; }

    editHabit.mutate({ habitId: habit.id, title: trimmed });
    setEditing(false);
  };

  return (
    <tr>
      <td className="py-2 pr-8 text-base font-medium text-white max-w-[160px] sm:max-w-[220px]">
        <div className="flex items-center gap-0.5">
          {editing ? (
            <input
              ref={inputRef}
              size={Math.max(draft.length, 1)}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") {
                  setDraft(habit.title);
                  setEditing(false);
                }
              }}
              className="min-w-0 max-w-full bg-transparent border-b border-zinc-500 text-sm text-white outline-none py-0.5"
            />
          ) : (
            <span className="truncate">{habit.title}</span>
          )}
          <DropdownMenu
            items={[
              {
                label: "Edit",
                icon: <Edit size={14} />,
                variant: "default",
                onClick: () => {
                  setDraft(habit.title);
                  setEditing(true);
                },
              },
              {
                label: "Delete",
                icon: <Trash2 size={14} />,
                variant: "danger",
                onClick: () => setConfirmDelete(true),
              },
            ]}
          />
        </div>
      </td>
      {children}

      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete habit">
        <p className="text-sm text-zinc-300 mb-6">
          Are you sure you want to delete "{habit.title}"? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteHabit.mutate(habit.id, {
                onSuccess: () => toast.success(`"${habit.title}" deleted`),
              });
              setConfirmDelete(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </tr>
  );
}