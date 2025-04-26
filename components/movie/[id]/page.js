import movies from '../../../data/movies.json';

export async function generateStaticParams() {
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

export default async function MoviePage({ params }) {
  const { id } = params; // ✅ params is safe to use in async function
  const movie = movies.find((m) => m.id === id);

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div>
      <main className="p-6">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <img src={movie.image} alt={movie.title} className="w-full max-w-md mt-4 rounded" />
        <p className="mt-4">{movie.description}</p>
        <a
          href={movie.downloadLink}
          download
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download Movie
        </a>
        
      </main>
      
      </div>
      );
}
