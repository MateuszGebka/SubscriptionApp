import React from 'react';
import { useDispatch } from 'react-redux';
import { cancelSubscription } from '../../subscriptions/subscriptionSlice';
import type { Subscription } from '../../subscriptions/subscriptionSlice';
import styles from './SubscriptionCard.module.css';
import type { AppDispatch } from '../../store/store';

interface Props {
  subscription: Subscription;
}

const SubscriptionCard: React.FC<Props> = ({ subscription }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id, offerTitle, status, price, currency, nextPaymentDate } = subscription;
  const formattedDate = new Date(nextPaymentDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);

  const handleCancel = () => {
    dispatch(cancelSubscription(id));
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{offerTitle}</h2>
      <div className={styles.info}>
      <p className={styles.status}>
        Status: <span>{status}</span>
      </p>
      <p className={styles.price}>
        Price: {formattedPrice}
      </p>
      <p className={styles.date}>Renews on: {status === 'cancelled' ? '-||-' : formattedDate}</p>
      </div>
      <button
        className={styles.cancelButton}
        onClick={handleCancel}
        disabled={status === 'cancelled'}
      >
        {status === 'cancelled' ? 'Cancelled' : 'Cancel'}
      </button>
    </div>
  );
};

export default SubscriptionCard;
