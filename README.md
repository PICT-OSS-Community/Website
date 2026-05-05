# OSS Community Website

The official website for PICT OSS Community — a beginner-friendly open source community with 850+ passionate developers from Pune Institute of Computer Technology. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a pixel-art inspired design that showcases our community, projects, and initiatives.

## Features

- **Community Hub**: Showcase of 850+ passionate developers and contributors
- **Projects Page**: Dedicated `/projects` page featuring awesome open source projects built by community members, sourced from [awesome-pict-oss](https://github.com/PICT-OSS-Community/awesome-pict-oss), with category filtering (AI, Systems, Security, Desktop) and search
- **FOSSible Blog**: Integration with our [Medium publication](https://medium.com/fossible) for open source insights, with section filtering and search
- **Achievements**: Hall of Fame showcasing community members who've cracked GSoC, LFX, GSSoC, Apertre, and more
- **Events**: Sessions, workshops, and community talks
- **Contributions**: Tracking community contributions to open source
- **Our Team**: Interactive display of community members
- **Pixel Art Design**: Retro-inspired UI with custom pixelated borders and styling
- **Dark Mode**: Full dark mode support across all pages
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Performance Optimized**: Fast loading with Next.js App Router and Turbopack
- **Type Safe**: Full TypeScript support for robust development

## Pages

| Route            | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `/`              | Home — hero, community stats, partnerships, testimonials |
| `/blogs`         | FOSSible blog posts with category filter and search      |
| `/projects`      | Community projects from awesome-pict-oss                 |
| `/achievements`  | Hall of Fame — GSoC, LFX, GSSoC, Apertre awardees       |
| `/contributions` | Open source contribution tracker                         |
| `/events`        | Past and upcoming community events                       |
| `/team`          | Core team members                                        |

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/PICT-OSS-Community/Website.git
    cd Website
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm run dev
    ```

4. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── components/              # Shared React components
│   │   ├── Header.tsx           # Navigation header with active-state tracking
│   │   ├── Footer.tsx           # Site footer with quick links
│   │   ├── Hero.tsx             # Landing hero section
│   │   ├── Blogs.tsx            # Blog preview component
│   │   ├── Community.tsx        # Community stats section
│   │   ├── Partnerships.tsx     # Partner logos section
│   │   ├── Testimonials.tsx     # Member testimonials
│   │   └── ...                  # Other shared components
│   ├── blogs/
│   │   └── page.tsx             # FOSSible blog listing page
│   ├── projects/
│   │   └── page.tsx             # Community projects showcase page
│   ├── achievements/
│   │   └── page.tsx             # Hall of Fame page
│   ├── contributions/
│   │   └── page.tsx             # Contributions tracker page
│   ├── events/
│   │   └── page.tsx             # Events listing page
│   ├── team/
│   │   └── page.tsx             # Team members page
│   ├── data/                    # Static JSON data
│   ├── globals.css              # Global styles (pixel art, grid-bg, etc.)
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── public/                      # Static assets (logos, images)
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # Apache 2.0 License
└── README.md                    # This file
```

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Runtime**: React 19 with latest features

## Development

### Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Start production server                 |
| `npm run lint`  | Run ESLint                              |

## About OSS Community

PICT OSS Community is a thriving open source community:

- **850+ Active Members**: Passionate developers, designers, and innovators
- **awesome-pict-oss**: A curated list of open source projects built by community members
- **FOSSible Publication**: Medium publication sharing open source insights and stories
- **Regular Sessions**: Workshops, talks, and learning events for skill development
- **Beginner Friendly**: Welcoming environment for developers at all skill levels
- **Global Recognition**: Members selected for GSoC, LFX, GSSoC, Apertre, and more

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup
- Code standards
- Pull request process
- Issue reporting

Want to add your project to the Projects page? Open a PR on [awesome-pict-oss](https://github.com/PICT-OSS-Community/awesome-pict-oss).

## License

This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.

## Support

- Create an [issue](https://github.com/PICT-OSS-Community/Website/issues) for bug reports
- Follow us on [Twitter](https://twitter.com/pict_oss) for updates
- Read our articles on [FOSSible Medium Publication](https://medium.com/fossible)
- Check the [Contributing Guide](CONTRIBUTING.md) for development help

---

Built with Next.js and TypeScript by the PICT OSS Community
