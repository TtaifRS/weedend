import create from 'zustand';
import axios from 'axios';
import { persist, devtools } from 'zustand/middleware';

// eslint-disable-next-line no-underscore-dangle
const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

let tokenStore = (set) => ({
  token: '',
  loading: true,
  error: null,
  fetchLogin: async (email, password) => {
    try {
      const { data } = await axiosInstance({
        method: 'post',
        url: '/login',
        data: {
          email,
          password,
        },
      });

      set({
        loading: false,
        token: data.token,
        error: null,
      });
    } catch (err) {
      set({
        error: 'There was an error, Please try again',
        loading: true,
      });
    }
  },
  fetchLogout: async (token) => {
    try {
      const { data } = await axiosInstance({
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
          loading: true,
          token: '',
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
  loading: true,
  error: null,
  fetchUser: async (token) => {
    try {
      set({
        loading: true,
      });
      const { data } = await axiosInstance({
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
      set({
        loading: true,
      });
      const { data } = await axiosInstance({
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
      set({
        loading: true,
      });
      const sortBy = sort.join();
      const { data } = await axiosInstance({
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
  fetchProductsLength: async (token, type, updateFilter) => {
    try {
      const { data } = await axiosInstance({
        method: 'get',
        url: '/products',
        params: {
          types: type.value === 'none' ? null : type.value,
          updated: updateFilter.value === 'none' ? null : updateFilter.value,
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
      set({
        loading: true,
        product: {},
      });
      const { data } = await axiosInstance({
        method: 'get',
        url: `/product/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        loading: false,
        product: data.data,
        error: null,
      });
    } catch (err) {
      set({
        loading: true,
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
  resetWeedEndData: () => {
    set(() => ({
      weedEndData: {},
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
      set({
        loading: true,
      });
      const { data } = await axiosInstance({
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

let producerStore = (set) => ({
  loading: true,
  producers: {},
  singleProducer: {},
  error: null,
  fetchProducers: async () => {
    try {
      set({
        loading: true,
      });
      const { data } = await axiosInstance({
        method: 'get',
        url: '/producers/',
      });

      set({
        loading: false,
        producers: data.data,
      });
    } catch (err) {
      set({
        loading: false,
        error: 'Something went wrong',
      });
    }
  },

  fetchSingleProducer: async (id) => {
    try {
      set({
        loading: true,
      });
      const { data } = await axiosInstance({
        method: 'get',
        url: `/producer/${id}`,
      });

      set({
        loading: false,
        singleProducer: data.data,
      });
    } catch (err) {
      set({
        loading: false,
        error: 'Something went wrong',
      });
    }
  },
  fetchProducerUpdate: async (id, data) => {
    try {
      set({
        loading: true,
      });
      const { p } = await axiosInstance({
        method: 'put',
        url: `/update/producer/${id}`,
        data,
      });

      set({
        loading: false,
        singleProducer: p.data,
      });
    } catch (err) {
      set({
        loading: false,
        errorUpdate: err,
      });
    }
  },
});

producerStore = devtools(producerStore);

export const useProducerStore = create(producerStore);

let producerByTypeStore = (set) => ({
  loading: true,
  producerByType: {},
  producerNameByType: [],
  error: null,

  fetchProducersByType: async (type) => {
    if (type) {
      try {
        set({
          loading: true,
        });
        const { data } = await axiosInstance({
          method: 'get',
          url: `/producers/types/?${type}=true`,
        });

        const nameData = data.data.map((producer, i) => ({ id: i, label: producer.producerName, value: producer.producerName }));
        set({
          loading: false,
          producerByType: data.data,
          producerNameByType: nameData,
        });
      } catch (err) {
        set({
          loading: false,
          error: 'Something went wrong',
        });
      }
    }
  },
});

producerByTypeStore = devtools(producerByTypeStore);

export const useProducerByTypeStore = create(producerByTypeStore);
