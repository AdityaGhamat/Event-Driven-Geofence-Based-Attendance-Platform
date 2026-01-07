import {
  daysFirstAlphabet,
  type DayNumberFirstAlphabet,
} from "../constants/days";
import type { IWorkingDaySelectorProps } from "../types/index";
const WorkingDaysSelector = ({
  canEdit,
  onToggle,
  selectedDays,
}: IWorkingDaySelectorProps) => {
  const fullWeek: DayNumberFirstAlphabet[] = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex flex-wrap gap-4">
      {fullWeek.map((day) => {
        const isActive = selectedDays.includes(day);

        return (
          <button
            type="button"
            key={day}
            onClick={() => onToggle!(day)}
            disabled={!canEdit}
            className={`
                w-12 h-12 rounded-lg font-bold text-xl transition-all border
                flex items-center justify-center relative
                ${
                  isActive
                    ? "bg-purple-500 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)] translate-y-0.5"
                    : "bg-[#2b2538] border-white/10 text-neutral-500 hover:border-purple-400/30"
                }
                ${!canEdit && "cursor-default opacity-80"}
              `}
          >
            {daysFirstAlphabet[day]}

            {isActive && (
              <span className="absolute -bottom-2 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_5px_#a855f7]"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default WorkingDaysSelector;
