import './styles/style.css';
import Header from './components/Header';
import Nav from './components/Nav';
import About from './components/About';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Skills />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;