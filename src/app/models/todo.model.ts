export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export type CategoryType = 'Work' | 'Personal' | 'Fitness' | 'Study' | 'Ideas' | 'General';

export type FilterStatus = 'all' | 'active' | 'completed' | 'starred';

export type SortOption = 'priority' | 'dueDate' | 'title' | 'createdAt';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
  priority: PriorityLevel;
  category: CategoryType;
  dueDate?: string; // YYYY-MM-DD
  createdAt: number; // timestamp
  completedAt?: number; // timestamp
  subtasks: SubTask[];
  tags?: string[];
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  starred: number;
  highPriority: number;
  percentage: number;
}
