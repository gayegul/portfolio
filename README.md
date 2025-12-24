# Portfolio

Personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Vitest + React Testing Library

## Structure

```
src/
├── components/     # React components
├── data/          # Content and configuration
├── hooks/         # Custom React hooks
├── constants/     # Shared constants
└── test/          # Test configuration
```

## Build

Production build outputs to `dist/`:

```bash
npm run build
```

Bundle size: ~52KB gzipped (main JS bundle)

## Testing

30 tests covering hooks, components, and integration:

```bash
npm test
```

## Browser Support

Modern browsers with ES2020 support.
