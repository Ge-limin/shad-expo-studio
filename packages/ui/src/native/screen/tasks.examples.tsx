import React, { useEffect, useMemo, useState } from 'react';

import { View } from 'react-native';

import { TasksScreen } from './tasks';
import type { TaskFilter, TaskListItem, TaskSummary } from './tasks';

const baseTasks: TaskListItem[] = [
  {
    id: '1',
    title: 'Design inbox zero flow',
    description: 'Draft screen components and sync with Storybook reviewers.',
    tag: 'Design',
    priority: 'high',
    dueLabel: 'Due tomorrow',
    completed: false,
  },
  {
    id: '2',
    title: 'Implement share sheet',
    description: 'Hook Expo share intent to the UI-only share component.',
    tag: 'Mobile',
    priority: 'medium',
    dueLabel: 'Due in 3d',
    completed: false,
  },
  {
    id: '3',
    title: 'Wire auth state',
    description: 'Keep reducers and Supabase client in app land.',
    tag: 'Infra',
    priority: 'high',
    dueLabel: '1d overdue',
    completed: false,
  },
  {
    id: '4',
    title: 'Polish paywall copy',
    description: 'Use UI-only paywall to validate typography choices.',
    tag: 'Content',
    priority: 'low',
    completed: true,
  },
];

const getSummary = (tasks: TaskListItem[]): TaskSummary => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueLabel?.includes('overdue'),
  ).length;
  const dueSoon = tasks.filter(
    (t) =>
      !t.completed &&
      (t.dueLabel?.includes('today') || t.dueLabel?.includes('tomorrow')),
  ).length;
  return { total, completed, overdue, dueSoon };
};

export const storyMeta = {
  componentName: 'TasksScreen',
  title: 'auto/TasksScreen',
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
        <Story />
      </View>
    ),
  ],
};

export const storyExamples = {
  Interactive: {
    render: function Render() {
      const [tasks, setTasks] = useState<TaskListItem[]>(baseTasks);
      const [query, setQuery] = useState('');
      const [status, setStatus] = useState<TaskFilter['status']>('all');
      const [title, setTitle] = useState('');
      const [note, setNote] = useState('');

      const summary = useMemo(() => getSummary(tasks), [tasks]);

      const filtered = useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        return tasks.filter((task) => {
          if (status === 'completed' && !task.completed) return false;
          if (status === 'active' && task.completed) return false;
          if (trimmed) {
            const haystack =
              `${task.title} ${task.description ?? ''} ${task.tag ?? ''}`.toLowerCase();
            if (!haystack.includes(trimmed)) return false;
          }
          return true;
        });
      }, [query, status, tasks]);

      return (
        <TasksScreen
          summary={summary}
          filter={{
            query,
            status,
            onChangeQuery: setQuery,
            onChangeStatus: setStatus,
          }}
          tasks={filtered}
          newTask={{
            title,
            note,
            onChangeTitle: setTitle,
            onChangeNote: setNote,
            onSubmit: () => {
              if (!title.trim()) return;
              setTasks((prev) => [
                {
                  id: `${Date.now()}`,
                  title: title.trim(),
                  description: note.trim() || undefined,
                  tag: 'Demo',
                  priority: 'low',
                  completed: false,
                },
                ...prev,
              ]);
              setTitle('');
              setNote('');
            },
          }}
          onToggleTask={(id, next) => {
            setTasks((prev) =>
              prev.map((task) =>
                task.id === id ? { ...task, completed: next } : task,
              ),
            );
          }}
          onClearCompleted={() => {
            setTasks((prev) => prev.filter((task) => !task.completed));
          }}
          onPressTask={(task) => {
            setTitle(task.title);
            setNote(task.description ?? '');
          }}
        />
      );
    },
  },
  WithControls: {
    args: {
      filterQuery: '',
      filterStatus: 'all' as TaskFilter['status'],
    },
    argTypes: {
      filterStatus: {
        control: { type: 'radio' },
        options: ['all', 'active', 'completed'],
        name: 'Filter status',
      },
      filterQuery: {
        control: { type: 'text' },
        name: 'Filter query',
      },
    },
    render: function RenderControls({ filterQuery, filterStatus }) {
      const [tasks, setTasks] = useState<TaskListItem[]>(baseTasks);
      const [query, setQuery] = useState(filterQuery);
      const [status, setStatus] = useState<TaskFilter['status']>(filterStatus);
      const [title, setTitle] = useState('');
      const [note, setNote] = useState('');

      useEffect(() => setQuery(filterQuery), [filterQuery]);
      useEffect(() => setStatus(filterStatus), [filterStatus]);

      const summary = useMemo(() => getSummary(tasks), [tasks]);

      const filtered = useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        return tasks.filter((task) => {
          if (status === 'completed' && !task.completed) return false;
          if (status === 'active' && task.completed) return false;
          if (trimmed) {
            const haystack =
              `${task.title} ${task.description ?? ''} ${task.tag ?? ''}`.toLowerCase();
            if (!haystack.includes(trimmed)) return false;
          }
          return true;
        });
      }, [query, status, tasks]);

      return (
        <TasksScreen
          summary={summary}
          filter={{
            query,
            status,
            onChangeQuery: setQuery,
            onChangeStatus: setStatus,
          }}
          tasks={filtered}
          newTask={{
            title,
            note,
            onChangeTitle: setTitle,
            onChangeNote: setNote,
            onSubmit: () => {
              if (!title.trim()) return;
              setTasks((prev) => [
                {
                  id: `${Date.now()}`,
                  title: title.trim(),
                  description: note.trim() || undefined,
                  tag: 'Demo',
                  priority: 'low',
                  completed: false,
                },
                ...prev,
              ]);
              setTitle('');
              setNote('');
            },
          }}
          onToggleTask={(id, next) => {
            setTasks((prev) =>
              prev.map((task) =>
                task.id === id ? { ...task, completed: next } : task,
              ),
            );
          }}
          onClearCompleted={() => {
            setTasks((prev) => prev.filter((task) => !task.completed));
          }}
          onPressTask={(task) => {
            setTitle(task.title);
            setNote(task.description ?? '');
          }}
        />
      );
    },
  },
};
