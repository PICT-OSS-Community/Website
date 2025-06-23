# OSS Website

The official website for OSS Community - a beginner-friendly open source community with 650+ passionate developers from Pune Institute of Computer Technology. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a pixel-art inspired design that showcases our community, projects, and initiatives.

## Features

-   **Community Hub**: Showcase of 650+ passionate developers and contributors
-   **Project Gallery**: Featured open source projects built by community members
-   **FOSSible**: Integration with our Medium publication for open source insights
-   **Sessions & Workshops**: Information about regular learning events and talks
-   **Member Profiles**: Interactive display of community members with fun status messages
-   **Pixel Art Design**: Retro-inspired UI with custom pixelated borders and styling
-   **Responsive Design**: Mobile-first approach optimized for all devices
-   **Performance Optimized**: Fast loading with Next.js App Router and Turbopack
-   **Type Safe**: Full TypeScript support for robust development

## Quick Start

### Prerequisites

-   Node.js 18+
-   npm, yarn, or pnpm

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/Website.git
    cd Website
    ```

2. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Start the development server**:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Landing hero section
│   │   ├── Community.tsx   # Community engagement section
│   │   ├── Projects.tsx    # Project showcase
│   │   └── Footer.tsx      # Site footer
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── public/                 # Static assets
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                # Apache 2.0 License
└── README.md              # This file
```

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) with App Router
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Runtime**: React 19 with latest features


## Development

### Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Start production server                 |
| `npm run lint`  | Run ESLint                              |

### Development Features

-   **Hot Reload**: Instant updates during development
-   **Turbopack**: Ultra-fast bundler for development
-   **TypeScript**: Full type checking and IntelliSense
-   **ESLint**: Code quality and consistency
-   **Path Aliases**: Clean imports with `@/` prefix

## About PICT OSS Community

OSS Community is a thriving open source community:

-   **650+ Active Members**: Passionate developers, designers, and innovators
-   **Open Source Projects**: Collaborative development of various tools and applications
-   **FOSSible Publication**: Medium publication sharing open source insights and stories
-   **Regular Sessions**: Workshops, talks, and learning events for skill development
-   **Beginner Friendly**: Welcoming environment for developers at all skill levels
-   **Collaborative Culture**: Focus on teamwork, mentorship, and knowledge sharing

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

-   Development setup
-   Code standards
-   Pull request process
-   Issue reporting

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm run start
```

## Support

-   Create an [issue](https://github.com/your-username/Website/issues) for bug reports
-   Follow us on [Twitter](https://twitter.com/@pict_osse) for updates
-   Read our articles on [FOSSible Medium Publication](https://medium.com/fossible)
-   Check the [Contributing Guide](CONTRIBUTING.md) for development help

---

Built with Next.js and TypeScript by the OSS Community
