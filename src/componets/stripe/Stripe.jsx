import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../paymentform/PaymentForm';
import PaymentService from '../../service/paymentservice';
import { useParams } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import classnames from 'classnames';
import styles from './stripe.module.css';

const key = "pk_test_51NPswVCJHB936fBLgsjvr0gBO8ONopcLXznF4YTKHtojDURGD0bk9o8PMtm4RbjDFxYyON5TtB1fNInH1EnojAip00Y2uumIsq" 

const stripePromise = loadStripe(key);

const Stripe = () => {
  const [clientSecret, setClientSecret] = useState(null);
    const { cid } = useParams();
   
  useEffect(() => {
    const getClientSecret = async () => {
      const service = new PaymentService();
      service.createPaymentIntent({ cartId: cid, callbackSuccess: callbackSuccessPaymentIntent, callbackError: callbackErrorPaymentIntent });
    };
    

    cid && getClientSecret();
  }, [cid]);

  const callbackSuccessPaymentIntent = (res) => {
      setClientSecret(res.data.payload.client_secret);
  };

  const callbackErrorPaymentIntent = (err) => {
    console.log(err);
  };
  return (
    <>
      <div className='vh-100'>
        <div className={styles.container}>
          <h3 className="text-center mt-5">Ingrese los Datos para Generar la compra</h3>
      </div>
        <div className='mt-5'>
          <div className={classnames([styles.container, styles.highlighted])}>
          <Wrapper hidden={!clientSecret || !stripePromise}>
            <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
              <PaymentForm />
            </Elements>
          </Wrapper>
        </div>
        </div>
      </div>
    </>
  );
};
export default Stripe;
