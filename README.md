# PhotoPedia

A responsive photo gallery built with React, Vite, and Tailwind CSS. It fetches photos from the [Picsum Photos API](https://picsum.photos), lets you search by photographer name, and lets you save favourites that persist across page refreshes.

## Features

- Fetches 30 photos on load from a random page of the Picsum list, so each refresh shows different photos
- Loading spinner while photos are fetched
- Error message if the request fails
- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
- Real-time search by author name, filtered on the already-fetched data with no extra API calls
- Favourite photos with a heart button, saved to `localStorage` so they persist after refresh
- Hover effects on cards: lift, image zoom, and gradient overlay

## Tech Stack

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [oxlint](https://oxc.rs) for linting

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/Ahamid047/celebrare-photo-gallery
cd photopedia
npm install
```

### Running the app

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run oxlint on the source code
```

## Project Structure

```
src/
├── main.jsx                  # Entry point, mounts <App /> in StrictMode
├── App.jsx                   # Page layout and title
├── index.css                 # Tailwind import
├── components/
│   ├── Gallery.jsx           # Search, loading/error states, photo grid
│   └── PhotoCards.jsx        # Single photo card with favourite button
└── hooks/
    ├── useFetchPhotos.js     # Fetches photos from the Picsum API
    └── useFavourites.js      # Favourites state (useReducer) + localStorage
```

## How It Works

1. **Fetching:** `useFetchPhotos` requests 30 photos from a random page of `https://picsum.photos/v2/list` when the page loads. It returns `photos`, `loading`, and `error`.
2. **Searching:** `Gallery` stores the search text in state and filters the fetched photos by author name using `useMemo`. No new request is made.
3. **Favourites:** `useFavourites` manages the list of favourite photo ids with `useReducer`. A `TOGGLE` action adds or removes an id. The list is saved to `localStorage` whenever it changes and restored on load.
4. **Rendering:** `PhotoCard` only displays a photo and reports clicks on the heart button back up to `Gallery`.

## Design Notes

- `useFavourites` uses `useReducer` because the next state depends on the previous one, and all updates go through a single action type.
- `useCallback` keeps the search handler's reference stable, and `useMemo` avoids re-filtering unless the photos or the search text change.
- An `AbortController` in `useFetchPhotos` cancels the request if the component unmounts, which prevents state updates after unmount under React StrictMode.

## Attribution

Photos are provided by [Lorem Picsum](https://picsum.photos). Image authors are credited on each card.

## License

This project was built as a frontend internship pre-screening assignment.