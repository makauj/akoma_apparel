# Environment Configuration

This project uses environment variables for configuration. 

## Setup

1. Copy `.env.example` to `.env` and fill in your actual values:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your actual configuration:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret key for JWT tokens
   - `STRIPE_SECRET_KEY`: Your actual Stripe secret key
   - `SMTP_*`: Your email service configuration

## Environment Files

- `.env.example`: Template with all required environment variables
- `.env.test`: Test environment configuration (committed to repo with safe values)
- `.env`: Your local development configuration (gitignored)
- `.env.local`: Optional local overrides (gitignored)
- `.env.production`: Production configuration (gitignored)

## Security Notes

- Never commit real secrets to the repository
- The `.env.test` file contains only safe test values and can be committed
- All other `.env*` files are gitignored for security
- Use different keys for development, testing, and production environments

## Required Environment Variables

### Database
- `MONGODB_URI`: MongoDB connection string

### Authentication
- `JWT_SECRET`: Secret key for JWT token signing

### Payment Processing
- `STRIPE_SECRET_KEY`: Stripe secret key for payment processing

### Email Service
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password

### Application
- `NODE_ENV`: Environment mode (development/test/production)
- `PORT`: Port number for the server
- `FRONTEND_URL`: Frontend application URL
