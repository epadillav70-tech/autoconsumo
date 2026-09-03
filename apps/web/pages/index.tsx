import type { NextPage } from 'next';
import useSWR from 'swr';
import ListingCard from '../components/ListingCard';
import { fetcher } from '../lib/api';

const Home: NextPage = () => {
  const { data, error } = useSWR('/listings?skip=0&take=20', fetcher);
  const listings = data || [];

  return (
    <div style={{ padding: 20 }}>
      <h1>Autoconsumo - Directorio</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {listings.map((l: any) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
};

export default Home;
