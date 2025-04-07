# Prototype for Google Docs

## Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (for manual setup)

## Obtaining Clerk and Convex Keys

### Clerk Authentication Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select an existing one
3. Navigate to "API Keys" in the sidebar
4. Copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (client)
   - `CLERK_SECRET_KEY` (server)

### Convex Deployment

1. Go to [Convex Dashboard](https://dashboard.convex.dev/)
2. Create a new project or select an existing one
3. Install the Convex CLI:
```bash
npm install convex
```
4. Run convex:
```bash
npx convex dev
```

## Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd google-docs
```

2. Create .env.local file

3. Start the services:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:3000

## Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild services
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

## Manual Setup (Without Docker)

### UI Setup

1. Navigate to the UI directory:
```bash
cd google-docs
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local`
```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

4. Start the development server:
```bash
npm run dev
```

The UI will be available at http://localhost:3000

## Development

### Environment Variables
```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Production Deployment

1. Update environment variables as needed

2. Build and start the services:
```bash
docker-compose -f docker-compose.yml up -d --build
```
