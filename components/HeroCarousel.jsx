
'use client';
import { useEffect, useState } from 'react';
import styles from './HeroCarousel.module.css';


const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, 10000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <div className={styles.hero}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        >
          {index === current && (
            <div className={styles.content}>
              <h1>Welcome to movie4u</h1>
              <p>Discover the latest movies free</p>
              <button>view now</button>
            </div>
          )}
        </div>
      ))}

      <button className={styles.prev} onClick={prevSlide}>&#10094;</button>
      <button className={styles.next} onClick={nextSlide}>&#10095;</button>
    </div>
  );
}
