import { Injectable, signal, computed, effect } from '@angular/core';
import { TodoItem, FilterStatus, CategoryType, SortOption, TodoStats, PriorityLevel, SubTask } from '../models/todo.model';

const STORAGE_KEY = 'taskflow_todos_v1';
const THEME_KEY = 'taskflow_theme';

const INITIAL_TODOS: TodoItem[] = [
  {
    id: '1',
    title: 'Complete Angular Todo App Architecture',
    description: 'Implement Angular Signals, responsive UI, glassmorphism aesthetics, and localStorage sync.',
    completed: false,
    starred: true,
    priority: 'urgent',
    category: 'Work',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 2,
    subtasks: [
      { id: '101', title: 'Setup Signal state store', completed: true },
      { id: '102', title: 'Design modern dark glass UI', completed: true },
      { id: '103', title: 'Add subtask drawer and category filters', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Morning 5K Jog & Stretching',
    description: 'Maintain cardio routine at the local park around 6:30 AM.',
    completed: true,
    starred: false,
    priority: 'high',
    category: 'Fitness',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 24,
    completedAt: Date.now() - 3600000 * 12,
    subtasks: [
      { id: '201', title: 'Hydrate 500ml water', completed: true },
      { id: '202', title: '5km park running', completed: true }
    ]
  },
  {
    id: '3',
    title: 'Brainstorm AI Assistant UI Design Features',
    description: 'Explore futuristic dashboard layout concepts, glow borders, and floating widgets.',
    completed: false,
    starred: true,
    priority: 'medium',
    category: 'Ideas',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 5,
    subtasks: [
      { id: '301', title: 'Collect Pinterest moodboard', completed: true },
      { id: '302', title: 'Draft Figma wireframe components', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Read 2 Chapters of Clean Architecture',
    description: 'Focus on Dependency Inversion Principle and Component Cohesion rules.',
    completed: false,
    starred: false,
    priority: 'low',
    category: 'Study',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 8,
    subtasks: []
  }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Primary Signals
  readonly todos = signal<TodoItem[]>(this.loadTodosFromStorage());
  readonly statusFilter = signal<FilterStatus>('all');
  readonly categoryFilter = signal<CategoryType | 'All'>('All');
  readonly searchQuery = signal<string>('');
  readonly sortBy = signal<SortOption>('priority');
  readonly isDarkMode = signal<boolean>(this.loadThemeFromStorage());

  constructor() {
    // Auto sync to localStorage whenever todos change
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
      } catch (err) {
        console.error('Failed to save todos to localStorage:', err);
      }
    });

    // Auto sync theme to document body
    effect(() => {
      const dark = this.isDarkMode();
      if (dark) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
      try {
        localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
      } catch (err) {
        console.error('Failed to save theme setting:', err);
      }
    });
  }

  private loadTodosFromStorage(): TodoItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse stored todos, using default initial data.', e);
    }
    return INITIAL_TODOS;
  }

  private loadThemeFromStorage(): boolean {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    } catch (e) {}
    return true; // Default dark mode
  }

  // Computed Stats
  readonly stats = computed<TodoStats>(() => {
    const list = this.todos();
    const total = list.length;
    const completed = list.filter(t => t.completed).length;
    const active = total - completed;
    const starred = list.filter(t => t.starred).length;
    const highPriority = list.filter(t => !t.completed && (t.priority === 'urgent' || t.priority === 'high')).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, active, starred, highPriority, percentage };
  });

  // Categories count computed map
  readonly categoryCounts = computed(() => {
    const counts: Record<string, number> = { All: this.todos().length };
    const categories: CategoryType[] = ['Work', 'Personal', 'Fitness', 'Study', 'Ideas', 'General'];
    categories.forEach(cat => counts[cat] = 0);
    
    this.todos().forEach(todo => {
      counts[todo.category] = (counts[todo.category] || 0) + 1;
    });
    return counts;
  });

  // Filtered and Sorted Todos
  readonly filteredTodos = computed(() => {
    let list = [...this.todos()];
    const status = this.statusFilter();
    const category = this.categoryFilter();
    const query = this.searchQuery().trim().toLowerCase();
    const sort = this.sortBy();

    // 1. Status Filter
    if (status === 'active') {
      list = list.filter(t => !t.completed);
    } else if (status === 'completed') {
      list = list.filter(t => t.completed);
    } else if (status === 'starred') {
      list = list.filter(t => t.starred);
    }

    // 2. Category Filter
    if (category !== 'All') {
      list = list.filter(t => t.category === category);
    }

    // 3. Search Query Filter
    if (query) {
      list = list.filter(t => 
        t.title.toLowerCase().includes(query) ||
        (t.description && t.description.toLowerCase().includes(query)) ||
        t.subtasks.some(st => st.title.toLowerCase().includes(query))
      );
    }

    // 4. Priority Rank Weight Map
    const priorityWeight: Record<PriorityLevel, number> = {
      urgent: 4,
      high: 3,
      medium: 2,
      low: 1
    };

    // 5. Sorting
    list.sort((a, b) => {
      // Starred items always sit near top if status isn't completed
      if (a.starred !== b.starred) {
        return a.starred ? -1 : 1;
      }

      if (sort === 'priority') {
        const weightDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
        if (weightDiff !== 0) return weightDiff;
        return b.createdAt - a.createdAt;
      } else if (sort === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      } else if (sort === 'title') {
        return a.title.localeCompare(b.title);
      } else { // createdAt
        return b.createdAt - a.createdAt;
      }
    });

    return list;
  });

  // Actions
  toggleTheme() {
    this.isDarkMode.update(prev => !prev);
  }

  addTodo(data: {
    title: string;
    description?: string;
    priority: PriorityLevel;
    category: CategoryType;
    dueDate?: string;
    subtasks?: string[];
  }) {
    const newTodo: TodoItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      title: data.title.trim(),
      description: data.description?.trim(),
      completed: false,
      starred: false,
      priority: data.priority || 'medium',
      category: data.category || 'Work',
      dueDate: data.dueDate || undefined,
      createdAt: Date.now(),
      subtasks: (data.subtasks || [])
        .filter(st => st.trim().length > 0)
        .map((st, index) => ({
          id: `${Date.now()}_st_${index}`,
          title: st.trim(),
          completed: false
        }))
    };

    this.todos.update(current => [newTodo, ...current]);
  }

  toggleTodo(id: string) {
    this.todos.update(current =>
      current.map(todo => {
        if (todo.id === id) {
          const nextCompleted = !todo.completed;
          return {
            ...todo,
            completed: nextCompleted,
            completedAt: nextCompleted ? Date.now() : undefined
          };
        }
        return todo;
      })
    );
  }

  toggleStar(id: string) {
    this.todos.update(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, starred: !todo.starred } : todo
      )
    );
  }

  deleteTodo(id: string) {
    this.todos.update(current => current.filter(todo => todo.id !== id));
  }

  updateTodo(id: string, updates: Partial<TodoItem>) {
    this.todos.update(current =>
      current.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  }

  addSubtask(todoId: string, title: string) {
    if (!title.trim()) return;
    const newSubtask: SubTask = {
      id: `${Date.now()}_st_${Math.random().toString(36).substring(2, 5)}`,
      title: title.trim(),
      completed: false
    };

    this.todos.update(current =>
      current.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: [...todo.subtasks, newSubtask]
          };
        }
        return todo;
      })
    );
  }

  toggleSubtask(todoId: string, subtaskId: string) {
    this.todos.update(current =>
      current.map(todo => {
        if (todo.id === todoId) {
          const updatedSubtasks = todo.subtasks.map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          // Check if all subtasks completed
          const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every(s => s.completed);
          return {
            ...todo,
            subtasks: updatedSubtasks,
            completed: allDone ? true : todo.completed
          };
        }
        return todo;
      })
    );
  }

  deleteSubtask(todoId: string, subtaskId: string) {
    this.todos.update(current =>
      current.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.filter(st => st.id !== subtaskId)
          };
        }
        return todo;
      })
    );
  }

  clearCompleted() {
    this.todos.update(current => current.filter(todo => !todo.completed));
  }

  resetToDefaults() {
    this.todos.set(INITIAL_TODOS);
  }

  exportData(): string {
    return JSON.stringify(this.todos(), null, 2);
  }

  importData(jsonContent: string): boolean {
    try {
      const parsed = JSON.parse(jsonContent);
      if (Array.isArray(parsed)) {
        this.todos.set(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON for todo import', e);
    }
    return false;
  }
}
