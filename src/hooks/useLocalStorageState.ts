import { useState, useEffect } from "react";

function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const json = window.localStorage.getItem(key)
      return json ? JSON.parse(json) : defaultValue
    } 
    //* handle invalid JSON gracefully and remove from localStorage
    catch {
      window.localStorage.removeItem(key)
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorageState;