import { useMemo, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import { TasksScreen } from '@studio/ui/native';
import type { TaskFilter, TaskListItem, TaskSummary } from '@studio/ui/native';

type TaskModel = {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  priority?: 'low' | 'medium' | 'high';
  due?: string;
  completed: boolean;
};

const todayIso = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const daysFromToday = (days: number) => {
  const d = new Date(todayIso());
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const initialTasks: TaskModel[] = [
  {
    id: 'task-1',
    title: 'Design inbox zero flow',
    description: 'Draft screen components and sync with Storybook reviewers.',
    tag: 'Design',
    priority: 'high',
    due: daysFromToday(1),
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Implement share sheet',
    description: 'Hook Expo share intent to the UI-only share component.',
    tag: 'Mobile',
    priority: 'medium',
    due: daysFromToday(3),
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Wire auth state',
    description: 'Keep reducers and Supabase client in app land.',
    tag: 'Infra',
    priority: 'high',
    due: daysFromToday(-1),
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Polish paywall copy',
    description: 'Use UI-only paywall to validate typography choices.',
    tag: 'Content',
    priority: 'low',
    completed: true,
  },
  {
    id: 'task-5',
    title: 'Storybook visual pass',
    description: 'Snapshot new variants for regression testing.',
    tag: 'QA',
    priority: 'medium',
    due: daysFromToday(0),
    completed: false,
  },
];

const toStartOfDay = (iso?: string) => {
  if (!iso) return undefined;
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatDueLabel = (iso?: string) => {
  const dueDate = toStartOfDay(iso);
  if (!dueDate) return undefined;

  const now = new Date(todayIso());
  const diffDays = Math.round(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  return `Due in ${diffDays}d`;
};

const isOverdue = (iso?: string) => {
  const dueDate = toStartOfDay(iso);
  if (!dueDate) return false;
  return dueDate.getTime() < new Date(todayIso()).getTime();
};

const isDueSoon = (iso?: string) => {
  const dueDate = toStartOfDay(iso);
  if (!dueDate) return false;
  const now = new Date(todayIso());
  const diffDays = Math.round(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffDays >= 0 && diffDays <= 2;
};

export default function TasksRoute() {
  const [tasks, setTasks] = useState<TaskModel[]>(initialTasks);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TaskFilter['status']>('all');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const summary: TaskSummary = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const overdue = tasks.filter(
      (task) => !task.completed && isOverdue(task.due),
    ).length;
    const dueSoon = tasks.filter(
      (task) => !task.completed && isDueSoon(task.due),
    ).length;

    return { total, completed, overdue, dueSoon };
  }, [tasks]);

  const filteredTasks: TaskListItem[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return tasks
      .filter((task) => {
        if (status === 'completed' && !task.completed) return false;
        if (status === 'active' && task.completed) return false;
        if (trimmed) {
          const haystack =
            `${task.title} ${task.description ?? ''} ${task.tag ?? ''}`.toLowerCase();
          if (!haystack.includes(trimmed)) return false;
        }
        return true;
      })
      .map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        tag: task.tag,
        priority: task.priority,
        dueLabel: formatDueLabel(task.due),
        completed: task.completed,
      }));
  }, [query, status, tasks]);

  const handleToggleTask = (id: string, next: boolean) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: next } : task,
      ),
    );
  };

  const handleAddTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: TaskModel = {
      id: `task-${Date.now()}`,
      title: trimmed,
      description: note.trim() || undefined,
      tag: 'Demo',
      priority: 'low',
      due: daysFromToday(2),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setTitle('');
    setNote('');
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <TasksScreen
        summary={summary}
        filter={{
          query,
          status,
          onChangeQuery: setQuery,
          onChangeStatus: setStatus,
        }}
        tasks={filteredTasks}
        newTask={{
          title,
          note,
          onChangeTitle: setTitle,
          onChangeNote: setNote,
          onSubmit: handleAddTask,
        }}
        onToggleTask={handleToggleTask}
        onClearCompleted={handleClearCompleted}
        onPressTask={(task) => {
          setTitle(task.title);
          setNote(task.description ?? '');
        }}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
