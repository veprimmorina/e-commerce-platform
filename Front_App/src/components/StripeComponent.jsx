import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';

export default class StripeComponent extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const { stripe, elements } = this.props;
    
        if (elements == null) {
          return;
        }
    
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
    
        if (error) {
          console.log('Error:', error);
          // Handle the error accordingly
        } else {
          console.log('Payment Method:', paymentMethod);
          // Access the card information from paymentMethod.card
          const { brand, last4, exp_month, exp_year } = paymentMethod.card;
          console.log('Card Info:', paymentMethod.card);
        }
      };

  render() {
    const {stripe} = this.props;
    return (
     <>
        <CardElement />
        <button disabled={!stripe} onClick={this.handleSubmit}>
          Pay
        </button>
        </>
    );
  }
}
