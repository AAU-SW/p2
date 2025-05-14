export const checkAuth = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      return data.status === true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Authentication check failed', error);
    return false;
  }
};
