function getCharecterFromDisneyApi() {
    return fetch('https://api.disneyapi.dev/character')
      .then((res) => {
        return res.json();  
      })
      .catch((error) => {
        console.log('apareció error', error);
        throw error;  
      });
  }
  
  export default getCharecterFromDisneyApi;