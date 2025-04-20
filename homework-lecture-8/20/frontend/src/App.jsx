import axios from 'axios';
import './App.css'
import TestimonialSlider from './components/TestimonialSlider';
import { useEffect, useState } from 'react';

function App() {
  const [testimonials, setTestimonials ] = useState([]);
  useEffect( () => {
    async function getTestimonials() {
      const data = await axios.get('http://localhost:3001/reviews');
      setTestimonials(data.data.reviews);
      console.log(data);
    }
    try {
      getTestimonials()
    } catch (error) {
      console.error(error);
    }
  }, [])
    

  return (
    <div className='container'>
      <TestimonialSlider testimonials={testimonials} />
    </div>
  )
}

export default App
