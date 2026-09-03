import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../lib/api';

const ListingPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? `/listings/${id}` : null, fetcher);
  const listing = data || null;

  if (!listing) return <div>Loading...</div>;
  return (
    <div style={{ padding: 20 }}>
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <div>
        {listing.media?.map((m: any) => (
          <img key={m.id} src={m.url} style={{ maxWidth: 400 }} />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
