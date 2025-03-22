# RateMyDino project for SENG 401, group 17

## Wesbite

We currently have this project deployed at https://ratemydino.vercel.app/

To sign in to the website, please use a gmail account.

Navigate to the dashboard and enter the name of a prof to access their LLM summaries.

Note: This repo does not include the .env keys required to run RateMyDino locally. For evaluation, please use the link above.

## To run frontend:

Set the current working directory to src/presentation/my-app/

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## To run the backend:

Set the current working directory to src/

Run app.py

```bash
python app.py
```
