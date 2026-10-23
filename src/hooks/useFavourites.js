import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'photopedia-favourites'

function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}

export default function useFavourites() {
  // The third argument is a lazy initializer: it reads localStorage once, on mount.
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  // Save to localStorage whenever the list changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  const toggleFavourite = (id) => dispatch({ type: 'TOGGLE', id })

  return { favourites, toggleFavourite }
}