const PhotoCard = ({ photo, isFavourite, onToggle }) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        {/* Dark gradient that fades in on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <p className="truncate text-sm font-semibold text-slate-700">{photo.author}</p>

        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className={`shrink-0 rounded-full p-2 transition duration-300 hover:scale-125 active:scale-95 ${
            isFavourite
              ? 'bg-red-50 text-red-500'
              : 'text-slate-400 hover:bg-slate-100 hover:text-red-400'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21s-7-4.35-9.5-8.5C.8 9.5 2.5 5 6.5 5c2.1 0 3.5 1.2 4.5 2.6C12 6.2 13.4 5 15.5 5c4 0 5.7 4.5 4 7.5C19 16.65 12 21 12 21z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PhotoCard