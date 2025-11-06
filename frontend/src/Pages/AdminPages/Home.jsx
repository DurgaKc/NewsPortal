import React from 'react'
const Home = () => {
  return (
<div className="flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200  py-15">
  <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 dark:text-sky-400 mb-3">
    Hello Admin 👋
  </h1>
  <p className="text-lg md:text-xl text-gray-800 dark:text-gray-600">
    Welcome back to your <span className="font-semibold text-sky-600 dark:text-sky-400">News Portal</span>
  </p>
  <p className="mt-2 text-md md:text-base text-gray-600 dark:text-gray-500">
    Manage articles, updates, and explore the latest insights easily.
  </p>
</div>

  )
}

export default Home