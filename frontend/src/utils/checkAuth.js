export const checkAuth = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)

      return data.status === true
    } else {
      return false;
    }
  } catch (error) {
    console.error('Authentication check failed', error);
    return false;
  }
};
