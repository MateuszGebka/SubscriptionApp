import subscriptionsReducer, {
  cancelSubscription,
  fetchSubscriptions,
} from '../subscriptions/subscriptionSlice';
import { mockSubscriptions } from '../subscriptions/mock-data';

describe('subscriptionsSlice', () => {
  it('should handle initial state', () => {
    const state = subscriptionsReducer(undefined, { type: '@@INIT' });
    expect(state.data).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle fetchSubscriptions.fulfilled', () => {
    const action = { type: fetchSubscriptions.fulfilled.type, payload: mockSubscriptions };
    const state = subscriptionsReducer(undefined, action);
    expect(state.data).toHaveLength(mockSubscriptions.length);
    expect(state.loading).toBe(false);
  });

  it('should handle cancelSubscription', () => {
    const activeState = {
      data: [mockSubscriptions[0]],
      loading: false,
      error: null,
    };
    const action = cancelSubscription(mockSubscriptions[0].id);
    const state = subscriptionsReducer(activeState, action);
    expect(state.data[0].status).toBe('cancelled');
  });
});
