import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { mockSubscriptions } from './mock-data';

export interface Subscription {
  id: string;
  offerTitle: string;
  status: string;
  price: number;
  currency: string;
  nextPaymentDate: string;
}

interface SubscriptionsState {
  data: Subscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async () => {
    return new Promise<Subscription[]>((resolve) => {
      setTimeout(() => {
        resolve(mockSubscriptions);
      }, 1000);
    });
  }
);

// mock error fetch
// export const fetchSubscriptions = createAsyncThunk(
//   'subscriptions/fetchSubscriptions',
//   async () => {
//     return new Promise<Subscription[]>((_, reject) => {
//       setTimeout(() => {
//         reject(new Error('Failed to fetch subscriptions.'));
//       }, 1000);
//     });
//   }
// );

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    cancelSubscription: (state, action: PayloadAction<string>) => {
      const sub = state.data.find((s) => s.id === action.payload);
      if (sub) {
        sub.status = 'cancelled';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load subscriptions';
      });
  },
});

export const { cancelSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
