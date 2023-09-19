
const config = {
  columns: [
    { title: 'Id', getVal: ({ id }) => id },
    { title: 'Title', getVal: obj => obj.Title },
    { title: 'Year', getVal: ({ Year }) => Year },
    { title: 'Poster', getVal: ({ Poster }) => <img src={Poster} alt={name} /> },
  ],

  async fetcher() {
    const
      response = await fetch('https://www.omdbapi.com/?apikey=a2b07930&s=green');
    if (!response.ok) throw new Error('fetch ' + response.status);
    return (await response.json()).Search.map(obj => Object.assign(obj, { id: obj.imdbID }));
  }
};

export default config;

