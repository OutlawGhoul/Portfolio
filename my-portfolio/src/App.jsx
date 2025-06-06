import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './assets/css/index.css';

const App = () => (
  <AppProvider>
    <main className='main-container'>
      <Navbar />
      <Header />
      <div className='about-section'>
        <About />
        <div className='about-image-container'>
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="Profilbild"
            className='about-image'
          />
        </div>
      </div>
      <Skills />
      <ContactForm />
      <Footer />
    </main>
  </AppProvider>
)

export default App;