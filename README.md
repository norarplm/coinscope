# CoinScope - Advanced Crypto Market Analytics

A futuristic cryptocurrency analytics platform built with Next.js, featuring real-time market data, advanced comparison tools, and a cyberpunk-inspired design.

## Team Members

-  Nora Wang : **norarplm**
-  Athef Ak : **itsathefak**

## Features

- 🚀 **Real-time Market Data** - Live cryptocurrency prices and market statistics
- 📊 **Advanced Analytics** - Comprehensive charts and technical indicators
- 🔍 **Smart Search** - Intelligent cryptocurrency search with autocomplete
- ⚖️ **Comparison Tools** - Side-by-side crypto comparison with interactive charts
- 🌙 **Dark/Light Mode** - Theme switching with system preference support
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Lightning Fast** - Optimized performance with caching
- 🎨 **Cyberpunk Theme** - Futuristic design with neon accents and glass morphism

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React
- **API**: CoinGecko API for cryptocurrency data
- **Theme**: next-themes for dark/light mode
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- CoinGecko API key (free tier available)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/coinscope.git
cd coinscope
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your CoinGecko API key to `.env.local`:
\`\`\`env
COINGECKO_API_KEY=your_api_key_here
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
coinscope/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── compare/           # Comparison page
│   ├── crypto/            # Individual crypto pages
│   ├── markets/           # Markets listing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── crypto/           # Crypto-specific components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
\`\`\`

## API Routes

- `/api/global-stats` - Global cryptocurrency market statistics
- `/api/cryptocurrencies` - Paginated cryptocurrency listings
- `/api/search` - Search cryptocurrencies
- `/api/cryptocurrency/[id]` - Individual cryptocurrency data
- `/api/crypto-detail/[id]` - Detailed cryptocurrency information

## Environment Variables

\`\`\`env
COINGECKO_API_KEY=your_coingecko_api_key
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CoinGecko](https://coingecko.com) for providing the cryptocurrency API
- [Vercel](https://vercel.com) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Framer Motion](https://framer.com/motion) for smooth animations
