import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer, { fetchSubscriptions } from '../subscriptions/subscriptionSlice';
import SubscriptionsList from '../components/SubscriptionList/SubscriptionsList';

test('loads and displays subscriptions', async () => {
  const store = configureStore({
    reducer: { subscriptions: subscriptionsReducer },
  });

  render(
    <Provider store={store}>
      <SubscriptionsList />
    </Provider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await store.dispatch(fetchSubscriptions());
  await waitFor(() => {
    expect(screen.getByText(/Premium Monthly/i)).toBeInTheDocument();
  });
});
