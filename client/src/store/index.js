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
  fetchLogout: async (token) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await axios({
        method: 'get',
        url: '/logout',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.error) {
        set({
          loading: false,
          error: 'something went wrong',
        });
      } else {
        set({
          loading: false,
          token: null,
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
          error: 'something went wrong',
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
        error: 'something went wrong',
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
          error: data.error.name,
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
        error: err.name,
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
  length: '',
  aLength: '',
  fetchProducts: async (token, type, updateFilter, sort, currentLimit, page) => {
    try {
      const sortBy = sort.join();
      console.log(sortBy);
      const { data } = await axios({
        method: 'get',
        url: '/products',
        params: {
          types: type.value === 'none' ? null : type.value,
          updated: updateFilter.value === 'none' ? null : updateFilter.value,
          sort: sort.length ? sortBy : null,
          limit: currentLimit.value === 'none' ? null : currentLimit.value,
          page,
        },
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
  fetchProductsLength: async (token, type, updateFilter, sort) => {
    try {
      const sortBy = sort.join();
      console.log(sortBy);
      const { data } = await axios({
        method: 'get',
        url: '/products',
        params: {
          types: type.value === 'none' ? null : type.value,
          updated: updateFilter.value === 'none' ? null : updateFilter.value,
          sort: sort.length ? sortBy : null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      set({
        length: data.results,
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

let GetSingleProduct = (set) => ({
  loading: true,
  product: {},
  error: null,
  fetchProduct: async (token, id) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/product/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        loading: false,
        product: data.data,
      });
    } catch (err) {
      set({
        loading: false,
        error: 'Something went wrong',
      });
    }
  },
});

GetSingleProduct = devtools(GetSingleProduct);

export const useGetSingleProduct = create(GetSingleProduct);

let GetWeedEndData = (set) => ({
  weedEndData: {},
  addData: (key, val) => {
    // eslint-disable-next-line prefer-const
    let a = {};
    a[key] = val;
    a = { ...a };

    set((state) => ({
      weedEndData: {
        ...state.weedEndData,
        ...a,
      },
    }));
  },
});

GetWeedEndData = devtools(GetWeedEndData);

export const useGetWeedEndData = create(GetWeedEndData);

let fieldStore = (set) => ({
  loading: true,
  fields: [],
  error: null,
  fetchFields: async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: '/fields',
      });

      set({
        loading: false,
        fields: data.data,
      });
    } catch (err) {
      set({
        loading: false,
        error: 'Something went wrong',
      });
    }
  },
});

fieldStore = devtools(fieldStore);

export const useFieldStore = create(fieldStore);
