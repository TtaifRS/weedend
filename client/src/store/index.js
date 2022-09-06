import create from 'zustand';
import axios from 'axios';
import { persist, devtools } from 'zustand/middleware';

let tokenStore = (set) => ({
  token: '',
  loading: false,
  error: null,
  fetchLogin: async (email, password) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await axios({
        method: 'post',
        url: '/login',
        data: {
          email,
          password,
        },
      });
      if (data.error) {
        set({
          loading: false,
          error: 'Email or Password is wrong!',
        });
      } else {
        set({
          loading: false,
          token: data.token,
        });
      }
    } catch (err) {
      set({
        error: 'There was an error, Please try again',
        loading: false,
      });
    }
  },

});

tokenStore = devtools(tokenStore);
tokenStore = persist(tokenStore, { name: 'token' });

export const useTokenStore = create(tokenStore);

let userStore = (set) => ({
  user: {
    name: '',
    email: '',
    role: '',
  },
  loading: false,
  error: null,
  fetchUser: async (token) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: '/profile',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.error) {
        set({
          loading: false,
          error: 'Email or Password is wrong!',
        });
      } else {
        set({
          loading: false,
          user: {
            name: data.data.name,
            email: data.data.email,
            role: data.data.roles,
          },
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: 'Something went wrong',
      });
    }
  },
});

userStore = devtools(userStore);

export const useUserStore = create(userStore);

let statsStore = (set) => ({
  byCategory: [],
  numberOfUpdatedProduct: [],
  updatePerDay: [],
  currentMonth: [],
  previousMonth: [],
  currentWeek: [],
  previousWeek: [],
  total: 0,
  loading: true,
  error: null,
  fetchStats: async (token) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: '/product/stats',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.error) {
        set({
          loading: false,
          error: 'Email or Password is wrong!',
        });
      } else {
        const {
          byCategory,
          currentMonth,
          currentWeek,
          numberOfUpdatedProduct,
          previousMonth,
          previousWeek,
          updatePerDay,
        } = data.message[0];
        set({
          loading: false,
          byCategory,
          currentMonth,
          currentWeek,
          numberOfUpdatedProduct,
          previousMonth,
          previousWeek,
          updatePerDay,
          total: data.length,
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: 'Something went wrong',
      });
    }
  },
});

statsStore = devtools(statsStore);

export const useStatsStore = create(statsStore);

let productStore = (set) => ({
  loading: true,
  products: {},
  error: null,
  fetchProducts: async (token) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: '/products',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        loading: false,
        products: data.data,
      });
    } catch (err) {
      set({
        loading: false,
        error: 'Something went wrong',
      });
    }
  },
});

productStore = devtools(productStore);

export const useProductStore = create(productStore);
