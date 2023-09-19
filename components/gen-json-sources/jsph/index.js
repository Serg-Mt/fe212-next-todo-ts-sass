import InfoComponent from './OneUser';
import SubQueryComponent from './OnePost';

const config = {
  columns: [
    { title: 'Name', getVal: obj => obj.name, setVal: name => ({ name }) },
    { title: 'Email', getVal: ({ email }) => email, setVal: email => ({ email }) },
    { title: 'Address', getVal: ({ address: { street, suite, city } }) => `${city}, ${street} ${suite}` },
    { title: 'Website', getVal: ({ website }) => <a href={'https://' + website}>{website}</a>,/* setVal: website => ({website}) */ },
    { title: 'Phone number', getVal: ({ phone }) => <a href={'tet:' + phone}>{phone}</a>, /* setVal: phone=>({phone}) */ },
  ],
  async fetcher() {
    const
      response = await fetch('https://jsonplaceholder.typicode.com/users/');
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  },
  async infoFetcher(id) {
    const
      response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  },
  InfoComponent,
  async subQueryFetcher(id) {
    const
      response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
    //
  },
  SubQueryComponent
};

export default config;


