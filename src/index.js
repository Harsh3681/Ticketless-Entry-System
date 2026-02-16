import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Layout from './Layout/Layout';
import { ChangeContext } from './Context/LessContext';
import { reducer, initialState } from './Context/InitialState';
import Profile from './components/Profile/Profile';
import Donwload from './components/Donwload';

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:(<App/>),
//   },
//   {
//     path:'/login',
//     element:(<Login/>)
//   },
//   {
//     path:'/signup',
//     element:(<Signup/>)
//   }
// ])
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
    <ChangeContext initialState={initialState} reducer={reducer}>
      <BrowserRouter >
        <Routes >
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/donwnload" element={<Donwload />} />
              <Route
                path="/signup"
                element={
                  <Signup/>
                }
              />
            </Route>
        </Routes>
      </BrowserRouter>
    </ChangeContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
