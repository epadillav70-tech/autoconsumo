# AUTOCONSUMO Backend API

A comprehensive NestJS + Prisma backend for the AUTOCONSUMO directory application - a peer-to-peer service marketplace platform.

## Overview

AUTOCONSUMO is a platform that connects service providers with consumers for local services. The backend provides a robust API for managing users, listings, bookings, reviews, messaging, and transactions.

## Tech Stack

- **Framework**: NestJS (Node.js framework)
- **Database**: PostgreSQL with Prisma ORM
- **API**: RESTful API with validation pipes
- **Language**: TypeScript
- **Runtime**: Node.js 18+

## Project Structure

\\\
apps/api/
├── prisma/
│   └── schema.prisma         # Database schema with all models
├── src/
│   ├── main.ts               # Application bootstrap
│   ├── app.module.ts         # Root module
│   └── modules/
│       ├── prisma/           # Database service
│       ├── auth/             # Authentication
│       ├── users/            # User management
│       ├── listings/         # Service listings
│       ├── categories/       # Service categories
│       ├── reviews/          # User/service reviews
│       ├── bookings/         # Service bookings
│       ├── messages/         # User messaging
│       ├── media/            # Image/file management
│       ├── reports/          # User reporting system
│       └── transactions/     # Payment handling
\\\

## Database Models

### Core Models
- **User**: Provider and consumer profiles with ratings
- **Category**: Service categories
- **Listing**: Service offerings by providers
- **Media**: Images and files for listings
- **Booking**: Service reservations with status tracking

### User Interaction
- **Review**: Ratings and reviews for services
- **Message**: Direct messaging between users
- **Report**: User report and moderation system
- **Transaction**: Payment records

### Additional
- **Plan**: Service tier subscriptions
- **Report Types**: INAPPROPRIATE_CONTENT, FRAUD, ABUSE, OTHER

## Installation & Quick Start

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 12 or higher
- npm or yarn

### Setup Steps

1. **Install dependencies**
\\\ash
npm ci
\\\

2. **Environment configuration**
Create \.env\ file:
\\\nv
DATABASE_URL="postgresql://user:password@localhost:5432/autoconsumo_db"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
S3_BUCKET="your-s3-bucket"
STRIPE_SECRET_KEY="your-stripe-key"
\\\

3. **Database setup**
\\\ash
npx prisma migrate dev
\\\

4. **Start development server**
\\\ash
npm run start:dev
\\\

The API will be available at \http://localhost:3000\

## Development Commands

### Database
\\\ash
npx prisma generate       # Generate Prisma Client
npx prisma migrate dev    # Run migrations
npx prisma studio        # Open GUI database viewer
\\\

### Code Quality
\\\ash
npm run format            # Format code
npm run lint              # Lint code
npm run test              # Run tests
\\\

## Key Features

✅ **User Management** - Multi-role support with ratings  
✅ **Service Listings** - Rich content with media and search  
✅ **Bookings & Transactions** - Complete lifecycle management  
✅ **Messaging** - Direct user communication  
✅ **Reviews & Ratings** - Quality control system  
✅ **Reporting** - Content moderation  
✅ **Plans & Subscriptions** - Multiple tier support  

## API Endpoints

### Authentication (\/auth\)
- \POST /auth/register\ - Register new user
- \POST /auth/login\ - User login
- \POST /auth/refresh\ - Refresh access token
- \POST /auth/logout\ - User logout

### Users (\/users\)
- \GET /users\ - List all users
- \GET /users/:id\ - Get user details
- \PATCH /users/:id\ - Update user profile
- \DELETE /users/:id\ - Delete user account

### Listings (\/listings\)
- \GET /listings\ - List all active listings
- \GET /listings/search?q=query\ - Search listings
- \GET /listings/:id\ - Get listing details
- \GET /listings/provider/:providerId\ - Get provider's listings
- \POST /listings\ - Create listing
- \PATCH /listings/:id\ - Update listing
- \DELETE /listings/:id\ - Delete listing

### Categories (\/categories\)
- \GET /categories\ - List all categories
- \GET /categories/:id\ - Get category
- \GET /categories/slug/:slug\ - Get category by slug
- \POST /categories\ - Create category
- \PATCH /categories/:id\ - Update category
- \DELETE /categories/:id\ - Delete category

### Bookings (\/bookings\)
- \GET /bookings\ - List all bookings
- \GET /bookings/:id\ - Get booking details
- \GET /bookings/provider/:providerId\ - Get provider's bookings
- \GET /bookings/consumer/:consumerId\ - Get consumer's bookings
- \POST /bookings\ - Create booking
- \PATCH /bookings/:id\ - Update booking status
- \DELETE /bookings/:id\ - Cancel booking

### Reviews (\/reviews\)
- \GET /reviews/listing/:listingId\ - Get listing reviews
- \POST /reviews\ - Create review
- \DELETE /reviews/:id\ - Delete review

### Messages (\/messages\)
- \GET /messages/conversation/:userId1/:userId2\ - Get conversation
- \GET /messages/user/:userId\ - Get user's messages
- \POST /messages\ - Send message
- \PATCH /messages/:id/read\ - Mark message as read
- \DELETE /messages/:id\ - Delete message

### Media (\/media\)
- \GET /media/listing/:listingId\ - Get listing media
- \POST /media\ - Upload media
- \PATCH /media/:id\ - Update media
- \DELETE /media/:id\ - Delete media
- \DELETE /media/listing/:listingId\ - Delete all media for listing

### Reports (\/reports\)
- \GET /reports\ - List all reports
- \GET /reports/:id\ - Get report details
- \POST /reports\ - Create report
- \PATCH /reports/:id\ - Update report status
- \DELETE /reports/:id\ - Delete report

### Transactions (\/transactions\)
- \GET /transactions\ - List all transactions
- \GET /transactions/:id\ - Get transaction details
- \GET /transactions/user/:userId\ - Get user's transactions
- \POST /transactions\ - Create transaction
- \PATCH /transactions/:id\ - Update transaction status
- \DELETE /transactions/:id\ - Delete transaction

## Architecture

- **NestJS Modules**: Feature-based architecture with dependency injection
- **Prisma ORM**: Type-safe database queries
- **Validation Pipes**: Global request validation
- **CORS**: Cross-origin resource sharing support
- **Database Indexes**: Optimized query performance

## Security

- CORS configuration
- Input validation on all endpoints
- Database connection pooling
- Prepared statements via Prisma ORM
- Environment-based configuration
- Ready for JWT authentication integration

## Performance

- Pagination on list endpoints (skip/take)
- Database query indexes
- Efficient relationship loading
- Query optimization with Prisma

## Future Enhancements

- JWT authentication middleware
- Role-based access control (RBAC)
- Rate limiting
- Redis caching
- S3 file upload integration
- WebSocket real-time messaging
- Email notifications
- Stripe payment integration
- Analytics dashboard
- Swagger/OpenAPI documentation

## Contributing

1. Create a feature branch
2. Follow NestJS conventions
3. Add appropriate tests
4. Submit pull request

## License

Proprietary - AUTOCONSUMO Project

---

**Ready to extend**: Each module is scaffolded and ready for authentication, business logic, testing, and API documentation.
