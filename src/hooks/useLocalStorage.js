import { useState, useEffect } from 'react'

// Custom hook for localStorage management
export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove item from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}

// Hook for managing multiple localStorage keys as an object
export const useLocalStorageState = (keys, initialValues = {}) => {
  const [state, setState] = useState(() => {
    const stored = {}
    keys.forEach(key => {
      try {
        const item = window.localStorage.getItem(key)
        stored[key] = item ? JSON.parse(item) : (initialValues[key] || null)
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error)
        stored[key] = initialValues[key] || null
      }
    })
    return stored
  })

  const updateState = (key, value) => {
    try {
      const valueToStore = value instanceof Function ? value(state[key]) : value
      setState(prev => ({ ...prev, [key]: valueToStore }))
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeState = (key) => {
    try {
      window.localStorage.removeItem(key)
      setState(prev => ({ ...prev, [key]: initialValues[key] || null }))
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }

  const clearAll = () => {
    keys.forEach(key => {
      try {
        window.localStorage.removeItem(key)
      } catch (error) {
        console.warn(`Error removing localStorage key "${key}":`, error)
      }
    })
    setState(initialValues)
  }

  return [state, updateState, removeState, clearAll]
}

export default useLocalStorage