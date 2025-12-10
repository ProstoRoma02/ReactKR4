import { useCallback } from 'react';
import { useApi } from './useApi.js';

const API_URL = 'https://mocki.io/v1/3f61dd04-df9e-4479-80b4-0d9d0d2c932a';

export const useTechnologiesApi = () => {
  const { data, loading, error, refetch } = useApi(API_URL, {}, { immediate: false });

  const fetchTechnologies = useCallback(async () => {
    try {
      const result = await refetch();
      if (Array.isArray(result) && result.length > 0) {
        return result;
      }
      
      // Fallback данные если API недоступен или пуст
      return [
        {
          id: 301,
          title: "Vite",
          description: "Быстрый инструмент сборки для современной веб-разработки",
          status: "not-started",
          category: "frontend",
          difficulty: "intermediate",
          resources: ["https://vitejs.dev/guide/"]
        },
        {
          id: 302,
          title: "Prisma",
          description: "ORM нового поколения для Node.js и TypeScript",
          status: "not-started", 
          category: "database",
          difficulty: "intermediate",
          resources: ["https://www.prisma.io/docs/"]
        },
        {
          id: 303,
          title: "Astro",
          description: "Статический генератор сайтов с островной архитектурой",
          status: "not-started",
          category: "frontend", 
          difficulty: "advanced",
          resources: ["https://docs.astro.build/"]
        }
      ];
    } catch (err) {
      console.warn('API недоступен, используем fallback данные:', err);
      // Возвращаем fallback данные при ошибке
      return [
        {
          id: 301,
          title: "Vite",
          description: "Быстрый инструмент сборки для современной веб-разработки",
          status: "not-started",
          category: "frontend",
          difficulty: "intermediate",
          resources: ["https://vitejs.dev/guide/"]
        },
        {
          id: 302,
          title: "Prisma", 
          description: "ORM нового поколения для Node.js и TypeScript",
          status: "not-started",
          category: "database",
          difficulty: "intermediate", 
          resources: ["https://www.prisma.io/docs/"]
        }
      ];
    }
  }, [refetch]);

  const addTechnology = useCallback(async (techData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(techData),
      });

      if (!response.ok) {
        throw new Error('Не удалось добавить технологию');
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  return {
    technologies: Array.isArray(data) ? data : [],
    loading,
    error,
    fetchTechnologies,
    addTechnology,
    refetch,
  };
};

