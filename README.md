# Bohemia Interactive job assignment 01

Code for the first of two assignments for a front-end React developer position at Bohemia Interactive for the Back Office HR tool.

## Assignment

Build a single page app that displays the profile of 10 users (the data is obtained from an API endpoint).

Assignment details are in [assignment.md](assignment.md).

## Getting Started

Install packages with:

```bash
pnpm install
# or
npm install
# or
yarn install
```

Run the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

- [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
  - [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import) for import order
  - [`eslint-plugin-json-files`](https://github.com/kellyselden/eslint-plugin-json-files) for [package.json](package.json) order
- [Tailwind CSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) + [autoprefixer](https://github.com/postcss/autoprefixer)
- [SpinKit](https://github.com/tobiasahlin/SpinKit) loading spinner
- [pnpm](https://pnpm.io/) (optional but recommended instead of NPM)

The site honors `prefers-color-scheme` because I like your eyes.
