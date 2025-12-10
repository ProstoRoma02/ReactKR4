import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage.js';
import { useDebouncedValue } from './useDebouncedValue.js';
import { defaultTechnologies } from '../data/defaultTechnologies.js';

const STATUS_FLOW = ['not-started', 'in-progress', 'completed'];

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useLocalStorage('technologies', defaultTechnologies);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  const updateStatus = useCallback(
    (id, newStatus) => {
      setTechnologies((prev) =>
        prev.map((tech) => (tech.id === id ? { ...tech, status: newStatus } : tech)),
      );
    },
    [setTechnologies],
  );

  const cycleStatus = useCallback(
    (id) => {
      setTechnologies((prev) =>
        prev.map((tech) => {
          if (tech.id !== id) return tech;
          const currentIndex = STATUS_FLOW.indexOf(tech.status);
          const nextStatus = STATUS_FLOW[(currentIndex + 1) % STATUS_FLOW.length];
          return { ...tech, status: nextStatus };
        }),
      );
    },
    [setTechnologies],
  );

  const updateNotes = useCallback(
    (id, newNotes) => {
      setTechnologies((prev) =>
        prev.map((tech) => (tech.id === id ? { ...tech, notes: newNotes } : tech)),
      );
    },
    [setTechnologies],
  );

  const addTechnology = useCallback(
    (tech) => {
      setTechnologies((prev) => [
        ...prev,
        {
          ...tech,
          id: tech.id ?? Date.now(),
          status: tech.status || 'not-started',
          notes: tech.notes || '',
        },
      ]);
    },
    [setTechnologies],
  );

  const updateTechnology = useCallback(
    (payload) => {
      setTechnologies((prev) =>
        prev.map((tech) => (tech.id === payload.id ? { ...tech, ...payload } : tech)),
      );
    },
    [setTechnologies],
  );

  const calculateProgress = useCallback(() => {
    if (!technologies.length) return 0;
    const completed = technologies.filter((tech) => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  }, [technologies]);

  const filteredTechnologies = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return technologies.filter((tech) => {
      const matchesSearch =
        !query ||
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query);

      const matchesStatus = filterStatus === 'all' || tech.status === filterStatus;
      const matchesCategory = categoryFilter === 'all' || tech.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, debouncedSearch, filterStatus, technologies]);

  const markAllCompleted = useCallback(() => {
    setTechnologies((prev) => prev.map((tech) => ({ ...tech, status: 'completed' })));
  }, [setTechnologies]);

  const resetAllStatuses = useCallback(() => {
    setTechnologies((prev) => prev.map((tech) => ({ ...tech, status: 'not-started' })));
  }, [setTechnologies]);

  const exportTechnologies = useCallback(() => {
    const dataStr = JSON.stringify(technologies, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const anchor = document.createElement('a');
    anchor.href = url;
    const date = new Date().toISOString().split('T')[0];
    anchor.download = `technologies-${date}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [technologies]);

  const importTechnologies = useCallback(
    (items, options = { replace: true }) => {
      console.log('Импорт технологий:', items, 'Опции:', options);
      
      if (!Array.isArray(items)) {
        throw new Error('Файл должен содержать массив технологий');
      }
      
      if (items.length === 0) {
        throw new Error('Файл не содержит технологий для импорта');
      }
      
      const normalized = items.map((item, index) => {
        console.log(`Обрабатываем элемент ${index}:`, item);
        return {
          id: item.id ?? Date.now() + index,
          title: item.title?.trim() || `Без названия ${index + 1}`,
          description: item.description || '',
          status: STATUS_FLOW.includes(item.status) ? item.status : 'not-started',
          notes: item.notes || '',
          category: item.category || 'other',
          difficulty: item.difficulty || 'beginner',
          deadline: item.deadline || '',
          resources: Array.isArray(item.resources) ? item.resources : [],
        };
      });

      console.log('Нормализованные данные:', normalized);

      setTechnologies((prev) => {
        if (options.replace === false) {
          const existingIds = new Set(prev.map((tech) => tech.id));
          const withoutDuplicates = normalized.filter((item) => !existingIds.has(item.id));
          console.log('Добавляем без дубликатов:', withoutDuplicates);
          return [...prev, ...withoutDuplicates];
        }
        console.log('Заменяем все технологии');
        return normalized;
      });
    },
    [setTechnologies],
  );

  return {
    technologies,
    filteredTechnologies,
    filteredCount: filteredTechnologies.length,
    totalCount: technologies.length,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    categoryFilter,
    setCategoryFilter,
    updateStatus,
    updateTechnology,
    updateNotes,
    cycleStatus,
    addTechnology,
    calculateProgress,
    markAllCompleted,
    resetAllStatuses,
    exportTechnologies,
    importTechnologies,
  };
};

