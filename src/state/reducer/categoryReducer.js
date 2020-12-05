import { createSlice } from '@reduxjs/toolkit';

// User slice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    selectedCategory: null,
    categoryAdding: false,
    categoriesLoading: false,
    refreshCategories: false,
  },
  reducers: {
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setCategoryAdding: (state, { payload }) => {
      state.categoryAdding = payload;
    },
    setCategoriesLoading: (state, { payload }) => {
      state.categoriesLoading = payload;
    },
    setRefreshCategories: (state, { payload }) => {
      state.refreshCategories = payload;
    },
  },
});

export const {
  setCategories,
  setSelectedCategory,
  setCategoryAdding,
  setCategoriesLoading,
  setRefreshCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
