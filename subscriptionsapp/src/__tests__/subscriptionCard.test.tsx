import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from '../subscriptions/subscriptionSlice';
import type { Subscription } from '../subscriptions/subscriptionSlice';
import SubscriptionCard from '../components/SubscriptionCard/SubscriptionCard';

const renderWithStore = (subscription: Subscription) => {
  const store = configureStore({
    reducer: { subscriptions: subscriptionsReducer },
    preloadedState: {
      subscriptions: {
        data: [subscription],
        loading: false,
        error: null,
      },
    },
  });

  render(
    <Provider store={store}>
      <SubscriptionCard subscription={subscription} />
    </Provider>
  );

  return { store };
};

describe('SubscriptionCard', () => {
  const mockSub: Subscription = {
    id: 'S123',
    offerTitle: 'Test Plan',
    status: 'active',
    price: 10.5,
    currency: 'USD',
    nextPaymentDate: '2025-11-15T10:00:00Z',
  };

  it('renders subscription info', () => {
    renderWithStore(mockSub);
    expect(screen.getByText('Test Plan')).toBeInTheDocument();
    expect(screen.getByText(/Price:/)).toHaveTextContent('$10.50');
  });

it('cancels the subscription when the button is clicked', () => {
  const { store } = renderWithStore(mockSub);
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton);

  const updatedSub = store.getState().subscriptions.data[0];

  render(
    <Provider store={store}>
      <SubscriptionCard subscription={updatedSub} />
    </Provider>
  );

  const updatedButton = screen.getByRole('button', { name: /cancelled/i });
  expect(updatedButton).toBeDisabled();
  expect(updatedButton).toHaveTextContent('Cancelled');
});
});
