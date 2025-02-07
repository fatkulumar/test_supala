export function useApi() {
    const baseURL = import.meta.env.VITE_BASE_URL;
  
    async function fetchData<T>(endpoint: string): Promise<T | null> {
      try {
        const response = await fetch(`${baseURL}/${endpoint}`);
        if (!response.ok) throw new Error("Failed to fetch data");
  
        return (await response.json()) as T;
      } catch (error) {
        console.error("API fetch error:", error);
        return null;
      }
    }
  
    return {
      fetchData,
    };
  }
  