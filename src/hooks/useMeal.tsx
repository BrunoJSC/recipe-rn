import { useContext } from 'react';
import { MealContext } from '@/context/meal-context';

export const useMeal = () => {
  const context = useContext(MealContext);

  if (!context) {
    throw new Error('useMealHook must be used within a MealProvider');
  }

  return context;
};
