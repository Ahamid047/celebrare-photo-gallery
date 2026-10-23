import { useEffect, useState } from 'react'

const PHOTOS_PER_PAGE = 30
const MAX_PAGE = 30 // the Picsum list has many pages, so we pick from the first 30

const buildApiUrl = (page) =>
    `https://picsum.photos/v2/list?page=${page}&limit=${PHOTOS_PER_PAGE}`

export default function useFetchPhotos() {
    const [photos, setPhotos] = useState([])   
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchPhotos = async () => {
            try {
                setLoading(true)
                setError(null)

                // A new random page on every mount, so each refresh shows different photos.
                const randomPage = Math.floor(Math.random() * MAX_PAGE) + 1

                const res = await fetch(buildApiUrl(randomPage), { signal: controller.signal })
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`)
                }

                const data = await res.json()
                setPhotos(data)
            } catch (err) {
                if (err.name === 'AbortError') return
                setError(err.message || 'Something went wrong while loading photos.')
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        fetchPhotos()

        return () => controller.abort()
    }, [])

    return { photos, loading, error }
}