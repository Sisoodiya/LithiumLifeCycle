# LithiumLifeCycle

A full-stack application for lithium battery lifecycle management.

## Deployment to Vercel

This project is configured for deployment on Vercel. Follow these steps to deploy:

1. **Install the Vercel CLI** (if not already installed):

   ```zsh
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```zsh
   vercel login
   ```

3. **Deploy to Vercel**:

   ```zsh
   vercel
   ```

4. **For production deployment**:

   ```zsh
   vercel --prod
   ```

## Project Structure

- `/client`: React frontend built with Vite
- `/server`: Express backend
- `/api`: Serverless functions for Vercel deployment
- `/shared`: Shared types and schemas

## Local Development

1. Install dependencies:

   ```zsh
   npm install
   ```

2. Start the development server:

   ```zsh
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```zsh
npm run build
```

## Environment Variables

The following environment variables may be required for deployment:

- `NODE_ENV`: Set to "production" for production deployment
