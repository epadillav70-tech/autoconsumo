import { Injectable, Logger } from '@nestjs/common';
import algoliasearch, { SearchIndex } from 'algoliasearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  private client: ReturnType<typeof algoliasearch> | null = null;
  private index: SearchIndex | null = null;
  private logger = new Logger(SearchService.name);

  constructor(private config: ConfigService) {
    const appId = this.config.get<string>('ALGOLIA_APP_ID');
    const adminKey = this.config.get<string>('ALGOLIA_ADMIN_KEY');
    const indexName = this.config.get<string>('ALGOLIA_LISTINGS_INDEX') || 'autoconsumo_listings';

    if (appId && adminKey) {
      this.client = algoliasearch(appId, adminKey);
      this.index = this.client.initIndex(indexName);
      this.logger.log(`Algolia initialized index=${indexName}`);
    } else {
      this.logger.warn('Algolia not configured (ALGOLIA_APP_ID/ALGOLIA_ADMIN_KEY missing)');
    }
  }

  async indexListing(listing: any) {
    if (!this.index) return null;
    const record = {
      objectID: listing.id,
      title: listing.title,
      description: listing.description,
      categoryId: listing.categoryId,
      providerId: listing.providerId,
      price: listing.price,
      currency: listing.currency,
      location: listing.location,
      lat: listing.latitude,
      lng: listing.longitude,
      averageRating: listing.averageRating,
      createdAt: listing.createdAt?.toISOString?.() || new Date().toISOString(),
    };
    try {
      return await this.index.saveObject(record);
    } catch (err) {
      this.logger.error('Algolia index error', err as any);
      return null;
    }
  }

  async removeListing(listingId: string) {
    if (!this.index) return null;
    try {
      return await this.index.deleteObject(listingId);
    } catch (err) {
      this.logger.error('Algolia delete error', err as any);
      return null;
    }
  }

  async search(query: string, options: any = {}) {
    if (!this.index) return { hits: [], nbHits: 0 };
    const { page = 0, hitsPerPage = 10, aroundLatLng, aroundRadius, filters } = options;
    try {
      const res = await this.index.search(query || '', {
        page,
        hitsPerPage,
        aroundLatLng,
        aroundRadius,
        filters,
      });
      return res;
    } catch (err) {
      this.logger.error('Algolia search error', err as any);
      return { hits: [], nbHits: 0 };
    }
  }
}
