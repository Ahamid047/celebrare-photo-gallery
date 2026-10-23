import Gallery from './components/Gallery'

const App = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-rose-50 to-indigo-100 px-6 py-10">
      <h1 className="mb-10 text-center text-4xl font-extrabold tracking-tight">
        <span className="bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          PhotoPedia
        </span>
      </h1>
      <Gallery />
    </main>
  )
}

export default App