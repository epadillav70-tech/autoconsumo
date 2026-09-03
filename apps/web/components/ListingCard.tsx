import Link from 'next/link';

export default function ListingCard({ listing }: { listing: any }) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
      <div style={{ height: 160, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {listing.media && listing.media[0] ? (
          <img src={listing.media[0].url} alt={listing.title} style={{ maxHeight: 160 }} />
        ) : (
          <div style={{ color: '#999' }}>No image</div>
        )}
      </div>
      <h3 style={{ margin: '8px 0' }}>{listing.title}</h3>
      <p style={{ color: '#666' }}>{listing.category?.name || 'Category'}</p>
      <p style={{ fontWeight: 'bold' }}>{listing.price ? `${listing.currency} ${listing.price}` : ''}</p>
      <Link href={`/listings/${listing.id}`}><a>View</a></Link>
    </div>
  );
}
