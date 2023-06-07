import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DTest from './components/Dashboard/DTest';
import Product from './components/Product';
import ProductDetails from './components/ProductDetails';
import { Provider } from 'react-redux';
import store from './store';
import Checkout from './components/Checkout';
import SuccessMessage from './components/SuccessMessage';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import EmailSent from './components/EmailSent';
import ForgetPasword from './components/ForgotPasword';
import NotFoundPage from './components/NotFoundPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-bootstrap';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import InjectedCheckoutForm from './components/InjectedCheckoutForm';
import DashboardLogin from './components/Dashboard/DashboardLogin';

function App() {
  const stripePromise = loadStripe('pk_test_51MLWWkFWmkgNDU7NBxVfHU9PUwzKzPxIbt3tIGiPkQfaAzMfK3vqN5hxWwTkyHmbJ3IG5RKSFS2zxm0hF8BMXq4w00cHEjDc2I');
  return(
    <>
    <GoogleOAuthProvider clientId='72576189908-43qghbvlensshkv946a7qrv7oil5ffhs.apps.googleusercontent.com'>
<Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Product />}></Route>
      <Route path='/dashboard' element={<DTest />}></Route> 
      <Route path='/products/:id' element={<Product />}></Route>
      <Route path='/product/:id' element={<ProductDetails />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/success' element={<SuccessMessage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/email/:id' element={<EmailSent />}></Route>
      <Route path='/forgot-password' element={<ForgetPasword />}></Route>
      <Route path='/*' element={<NotFoundPage />}></Route>
      <Route path='/dashboard/login' element={<DashboardLogin />}></Route>
      <Route path='/test/checkout' element={
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      }></Route>
    </Routes>
  </BrowserRouter>
  </Provider>
  </GoogleOAuthProvider>
  </>
  )
  
}

export default App;
