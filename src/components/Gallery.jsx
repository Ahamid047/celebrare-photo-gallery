import { useCallback, useMemo, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import useFavourites from '../hooks/useFavourites'
import PhotoCard from './PhotoCards'

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggleFavourite } = useFavourites()
  const [query, setQuery] = useState('')

  // useCallback keeps the handler's identity stable between renders.
  const handleSearchChange = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  // useMemo recomputes the filtered list only when photos or query change.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  return (
    <div className="mx-auto max-w-6xl">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search by author name..."
        className="mb-8 w-full rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100"
      />

      {loading && (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      )}

      {error && (
        <p className="py-20 text-center text-red-600">
          Could not load photos: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {filteredPhotos.length === 0 ? (
            <p className="py-20 text-center text-gray-500">No photos match your search.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggle={toggleFavourite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Gallery