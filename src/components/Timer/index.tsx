import { useContext } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { secondsToMinutes } from '../../utils/secondsToMinutes';
import { TimerComponentProps } from './types';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { TimerProps } from '../../shared-types/pomodoro';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';

export const Timer = ({ timer, label }: TimerComponentProps) => {
  const { pomodoro } = useContext(PomodoroContext);
  const { pomodoroTime, shortRestTime, longRestTime, cycles } = pomodoro;
  const timerContext = { pomodoroTime, shortRestTime, longRestTime, cycles };
  const { tasks } = useContext(TasksContext);
  const controlerTimer = timerContext[label as keyof TimerProps];
  const timerPercentage = (timer / controlerTimer) * 100;
  const bgCicleProgressBar =
    pomodoro.theme === 'darkTheme'
      ? '#202020'
      : pomodoro.theme === 'blueTheme'
      ? '#151434'
      : '#212034';

  const currentDay = getCurrentDayOfWeek();

  const pathColor = () => {
    if (pomodoro.theme === 'defaultTheme' || !pomodoro.theme) return '#7564e2';
    if (pomodoro.theme === 'blueTheme') return '#5B74E3';
    if (pomodoro.theme === 'darkTheme') return '#f6f6f6';
  };

  const targetTasks = pomodoro.routineMode
    ? tasks.filter((task) => task.day === currentDay)
    : tasks.filter((task) => task.day === undefined);

  return (
    <div className="mx-2 w-full max-w-xs">
      <CircularProgressbarWithChildren
        strokeWidth={4}
        background
        backgroundPadding={3}
        value={timerPercentage}
        styles={buildStyles({
          backgroundColor: bgCicleProgressBar,
          pathColor: pathColor(),
          strokeLinecap: 'round',
        })}
        className="h-full w-full drop-shadow-lg"
      >
        <div className="flex h-[90%] w-[90%] flex-col items-center justify-center gap-2 rounded-full border-[2px] border-skin-border-timer shadow-shadowAllSides shadow-skin-shadow-primary">
          <span className="font-sans text-7xl font-semibold max-[320px]:text-6xl">
            {secondsToMinutes(timer)}
          </span>
          <p className="font-semibold">
            {label === 'pomodoroTime' ? 'Time to work' : 'Break to rest'}
          </p>
          {targetTasks.map(
            (task, index) =>
              task.inFocus && (
                <a
                  href="#tasks"
                  key={index}
                  className="max-w-[160px] truncate font-semibold
                  max-[350px]:max-w-[130px]"
                >
                  <span className="font-bold">Focused:</span> #{index + 1}{' '}
                  {task.name}
                </a>
              ),
          )}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
