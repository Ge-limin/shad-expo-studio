import type { ReactNode } from 'react';

import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { Badge } from '../common/badge';
import { Button } from '../common/button';
import { Card } from '../common/card';
import { TextField } from '../common/text-field';

export type TaskListItem = {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  dueLabel?: string;
  priority?: 'low' | 'medium' | 'high';
  completed: boolean;
};

export type TaskSummary = {
  total: number;
  completed: number;
  dueSoon: number;
  overdue: number;
};

export type TaskFilter = {
  query: string;
  status: 'all' | 'active' | 'completed';
  onChangeQuery: (value: string) => void;
  onChangeStatus: (status: TaskFilter['status']) => void;
};

export type NewTaskForm = {
  title: string;
  note?: string;
  onChangeTitle: (value: string) => void;
  onChangeNote?: (value: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
};

export type TasksScreenProps = {
  summary: TaskSummary;
  filter: TaskFilter;
  tasks: TaskListItem[];
  newTask: NewTaskForm;
  onToggleTask: (id: string, next: boolean) => void;
  onClearCompleted: () => void;
  onPressTask?: (task: TaskListItem) => void;
  actionSlot?: ReactNode;
};

const FILTERS: { label: string; value: TaskFilter['status'] }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressBar,
          { width: `${Math.min(Math.max(percent, 0), 100)}%` },
        ]}
      />
    </View>
  );
}

function TaskRow({
  task,
  onToggle,
  onPress,
}: {
  task: TaskListItem;
  onToggle: (next: boolean) => void;
  onPress?: () => void;
}) {
  const priorityColor =
    task.priority === 'high'
      ? '#f97316'
      : task.priority === 'medium'
        ? '#22c55e'
        : '#94a3b8';

  return (
    <View style={[styles.taskRow, task.completed && styles.taskRowCompleted]}>
      <Switch
        value={task.completed}
        onValueChange={onToggle}
        trackColor={{ false: '#1f2937', true: '#10b981' }}
      />
      <View style={styles.taskContent}>
        <Text
          numberOfLines={2}
          style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted,
          ]}
          onPress={onPress}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text numberOfLines={2} style={styles.taskDescription}>
            {task.description}
          </Text>
        ) : null}
        <View style={styles.taskMeta}>
          {task.priority ? (
            <View style={styles.metaPill}>
              <View
                style={[styles.metaDot, { backgroundColor: priorityColor }]}
              />
              <Text style={styles.metaText}>
                {task.priority === 'high'
                  ? 'High priority'
                  : task.priority === 'medium'
                    ? 'Medium priority'
                    : 'Low priority'}
              </Text>
            </View>
          ) : null}
          {task.dueLabel ? (
            <Badge label={task.dueLabel} tone="warning" />
          ) : null}
          {task.tag ? <Badge label={task.tag} tone="info" /> : null}
        </View>
      </View>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Nothing here yet</Text>
      <Text style={styles.emptySubtitle}>
        Add a task above and keep logic in the app shell while this UI handles
        the layout.
      </Text>
    </View>
  );
}

export function TasksScreen({
  summary,
  filter,
  tasks,
  newTask,
  onToggleTask,
  onClearCompleted,
  onPressTask,
  actionSlot,
}: TasksScreenProps) {
  const completionPct =
    summary.total === 0
      ? 0
      : Math.round((summary.completed / summary.total) * 100);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Task planner</Text>
          <Text style={styles.subtitle}>
            Presentational-only screen that stays reusable. State, data, and
            side effects live in the consuming app.
          </Text>
        </View>
        {actionSlot}
      </View>

      <Card title="Progress" description="Snapshot of your workload.">
        <View style={styles.statsRow}>
          <SummaryStat
            label="Open"
            value={`${summary.total - summary.completed}`}
          />
          <SummaryStat label="Completed" value={`${summary.completed}`} />
          <SummaryStat label="Due soon" value={`${summary.dueSoon}`} />
          <SummaryStat label="Overdue" value={`${summary.overdue}`} />
        </View>
        <View style={styles.progressRow}>
          <ProgressBar percent={completionPct} />
          <Text style={styles.progressLabel}>{completionPct}% done</Text>
        </View>
      </Card>

      <Card
        title="Create a task"
        description="Container owns validation and submission."
      >
        <View style={styles.form}>
          <TextField
            label="Title"
            placeholder="Design the onboarding flow"
            value={newTask.title}
            onChangeText={newTask.onChangeTitle}
          />
          {typeof newTask.note !== 'undefined' && newTask.onChangeNote ? (
            <TextField
              label="Notes"
              placeholder="Optional notes visible in the list"
              value={newTask.note}
              onChangeText={newTask.onChangeNote}
              multiline
              inputStyle={{ minHeight: 80, textAlignVertical: 'top' }}
            />
          ) : null}
          <View style={styles.formActions}>
            <Button
              label={newTask.submitting ? 'Adding...' : 'Add task'}
              onPress={newTask.onSubmit}
              disabled={!newTask.title || newTask.submitting}
            />
            <Button
              label="Clear completed"
              variant="outline"
              onPress={onClearCompleted}
              disabled={summary.completed === 0}
            />
          </View>
        </View>
      </Card>

      <Card
        title="Filters"
        description="Search and filter are controlled from the container."
      >
        <TextField
          label="Search"
          placeholder="Search by title or tag"
          value={filter.query}
          onChangeText={filter.onChangeQuery}
        />
        <View style={styles.filtersRow}>
          {FILTERS.map((item) => (
            // Variant stays minimal; text/style tweaked for contrast on dark surfaces.
            <Button
              key={item.value}
              label={item.label}
              variant={filter.status === item.value ? 'solid' : 'outline'}
              onPress={() => filter.onChangeStatus(item.value)}
              size="sm"
              style={[
                styles.filterButton,
                filter.status !== item.value && styles.filterButtonInactive,
              ]}
              textStyle={[
                styles.filterButtonText,
                filter.status !== item.value && styles.filterButtonTextInactive,
              ]}
            />
          ))}
        </View>
      </Card>

      <Card
        title="Tasks"
        description="UI-only list; interactions are passed in via props."
      >
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <View style={styles.tasksList}>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onToggle={(next) => onToggleTask(task.id, next)}
                onPress={onPressTask ? () => onPressTask(task) : undefined}
              />
            ))}
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 20,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e2e8f0',
  },
  subtitle: {
    fontSize: 15,
    color: '#cbd5e1',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  stat: {
    backgroundColor: '#0b1222',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e2e8f0',
  },
  statLabel: {
    fontSize: 13,
    color: '#94a3b8',
  },
  progressRow: {
    marginTop: 14,
    gap: 8,
  },
  progressTrack: {
    backgroundColor: '#0b1222',
    borderColor: '#1f2937',
    borderWidth: 1,
    height: 12,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#22c55e',
  },
  progressLabel: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  form: {
    gap: 12,
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  filterButton: {
    minWidth: 90,
    backgroundColor: '#111827',
    borderColor: '#334155',
  },
  filterButtonInactive: {
    backgroundColor: '#0b1222',
  },
  filterButtonText: {
    color: '#e2e8f0',
  },
  filterButtonTextInactive: {
    color: '#cbd5e1',
  },
  tasksList: {
    gap: 12,
  },
  taskRow: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#0b1222',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'flex-start',
  },
  taskRowCompleted: {
    borderColor: '#0f172a',
    opacity: 0.85,
  },
  taskContent: {
    flex: 1,
    gap: 6,
  },
  taskTitle: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '700',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  taskDescription: {
    color: '#94a3b8',
    fontSize: 14,
  },
  taskMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: '#1f2937',
    borderWidth: 1,
  },
  metaDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  metaText: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
  },
  empty: {
    padding: 16,
    backgroundColor: '#0b1222',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 14,
    gap: 6,
  },
  emptyTitle: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
});
