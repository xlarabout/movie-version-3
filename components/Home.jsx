'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import movies from '../data/movies.json';
import HeroCarousel from './HeroCarousel';

export default function Home() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Home');
  const [visibleCount, setVisibleCount] = useState(8);

  const genres = ['All', ...new Set(movies.map((m) => m.genre))];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === 'All' || movie.genre === genre;
    return matchesSearch && matchesGenre;
  });

  const visibleMovies = filteredMovies.slice(0, visibleCount);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (bottom && visibleCount < filteredMovies.length) {
        setVisibleCount((prev) => prev + 4);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, filteredMovies.length]);

  useEffect(() => {
    setVisibleCount(8);
  }, [search, genre]);

  const MovieCard = ({ movie }) => (
    <Link href={`/movie/${movie.id }`} key={movie.id} >
      <div className=" bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-56 object-cover hover:scale-105 transition duration-300"
        />
        <div className="p-3">
          <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
          <p className="text-sm text-gray-500">{movie.genre}</p>
        </div>
      </div>
    </Link>

    
  );

  return (
    <div>
      <HeroCarousel />
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center mx-8 ">🎬 Movie Explorer</h1>

        {/* 🔍 Search */}
        {/* <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full sm:w-1/2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSearch(search)} // optional, in case you want to do a manual search
          className="px-5 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div> */}

        {/* 🎯 Genre Buttons */}
        {/* <div className="flex flex-wrap gap-6 justify-center mb-8">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-4 py-2 rounded-full border ${
              genre === g
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300'
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {g}
          </button>
        ))}
      </div> */}

        {/* 🎬 Movie Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {visibleMovies.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No movies found.</p>
          )}
        </div>

        {/* ⏳ Loading Indicator */}
        {visibleCount < filteredMovies.length && (
          <p className="text-center text-gray-400 mt-6">Loading more movies...</p>
        )}
      </main>
      </div>
  );
}
