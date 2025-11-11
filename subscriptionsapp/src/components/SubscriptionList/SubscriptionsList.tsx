import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../subscriptions/subscriptionSlice';
import type { RootState, AppDispatch } from '../../store/store';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import styles from './SubscriptionsList.module.css';

const SubscriptionsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.subscriptions
  );

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Subscriptions</h1>
      <div className={styles.cardsContainer}>
        {data.map((sub) => (
          <SubscriptionCard key={sub.id} subscription={sub} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsList;
