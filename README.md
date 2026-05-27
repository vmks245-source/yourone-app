# Your One — yourone.world

A Filmos product. Answer 10 questions, receive your digital world.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in your Lemon Squeezy checkout URL
3. `npm run dev` — runs on localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Add environment variable: `NEXT_PUBLIC_LEMON_CHECKOUT_URL` = your Lemon Squeezy checkout URL
4. Deploy

## Lemon Squeezy Setup

1. Create account at lemonsqueezy.com
2. Create a Store
3. Create a Product → price $1.80 → one-time payment
4. Copy the checkout URL (looks like `https://yourstore.lemonsqueezy.com/checkout/buy/XXXX`)
5. Paste into Vercel env vars

## After payment

The app opens the checkout in a popup. After payment, user clicks "Already paid? Click to continue" to unlock the quiz. (Full webhook auto-unlock can be added as a Vercel serverless function later.)

## Cloudflare R2

Currently not needed — all 10 scenes are rendered in-browser via Canvas/WebGL. R2 is ready for when you add real video files in V2.
# yourone-app
