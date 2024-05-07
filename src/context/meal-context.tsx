import React from 'react';

import { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MealProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  strArea: string;
  strTags: string;
  extendedIngredients: string;
  strYoutube: string;
  strMeasure: string;
}

interface MealContextType {
  mealsData: MealProps[];
  setMealsData: (data: MealProps[]) => void;
  searchMeal: (searchTerm: string) => void;
  searchResults: MealProps[];
  loading: boolean;
  addFavorite: (mealId: string) => void;
  favoriteMeals: MealProps[];
}

export const MealContext = createContext<MealContextType>(
  {} as MealContextType,
);

// Url for all Meals
const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
// Url for a single Meal

export function MealProvider({ children }: { children: ReactNode }) {
  const [mealsData, setMealsData] = useState<MealProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<MealProps[]>([]);
  const [favoriteMeals, setFavoriteMeals] = useState<MealProps[]>([]);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setMealsData(data.meals);

      console.log(data.meals);
    } catch (error) {
      console.error('Error de resposta!', error);
      setMealsData([]);
    } finally {
      setLoading(false);
    }
  };

  const searchMeal = async (searchTerm: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`

      );

      setSearchResults(data.meals as MealProps[]);
    } catch (error) {
      console.error('Error de resposta!', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }

  const addFavorite = (mealId: string) => {
    const meal = mealsData.find((meal) => meal.idMeal === mealId);
    const alreadyMeal = mealsData.find((meal) => meal.idMeal === mealId);
    if(alreadyMeal) {
      return;
    }

    const updateFavorite = [...mealsData, meal];

    setFavoriteMeals(updateFavorite as MealProps[]);

    console.log(updateFavorite);

    AsyncStorage.setItem('favoriteMeals', JSON.stringify(updateFavorite));
  }

  useEffect(() => {
    if (mealsData.length > 0) {
      return;
    }

    console.log(mealsData);

    fetchData(allMeals);
  }, []);

  return (
    <MealContext.Provider
      value={{
        mealsData,
        setMealsData,
        searchMeal,
        searchResults,
        loading,
        addFavorite,
        favoriteMeals,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
