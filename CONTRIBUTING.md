# Contributing to the OSS Website

Thank you for your interest in contributing to OSS website! We welcome contributions from the community to foster and encourage Open Source

## Table of Contents

-   [Getting Started](#getting-started)
-   [Development Setup](#development-setup)
-   [Code Standards](#code-standards)
-   [Making Changes](#making-changes)
-   [Submitting Changes](#submitting-changes)
-   [Reporting Issues](#reporting-issues)
-   [Code Review Process](#code-review-process)

## Getting Started

This is a modern web application built with:

-   **Next.js 15** - React framework with App Router
-   **TypeScript** - Type-safe JavaScript
-   **Tailwind CSS** - Utility-first CSS framework
-   **React 19** - Latest React features
-   **Lucide React** - Icon library

## Development Setup

### Prerequisites

-   Node.js (version 18 or higher)
-   npm, yarn, or pnpm package manager
-   Git

### Installation

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

    ```bash
    git clone https://github.com/YOUR_USERNAME/Website.git
    cd Website
    ```

3. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

4. **Start the development server**:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

### Available Scripts

-   `npm run dev` - Start development server with Turbopack
-   `npm run build` - Build the application for production
-   `npm run start` - Start the production server
-   `npm run lint` - Run ESLint to check for code issues

## Code Standards

### TypeScript

-   Use TypeScript for all new code
-   Define proper types and interfaces
-   Avoid using `any` type unless absolutely necessary
-   Use strict mode configuration

### Code Style

-   Follow the existing code style and conventions
-   Use meaningful variable and function names
-   Add comments for complex logic
-   Keep functions small and focused on a single responsibility

### Component Guidelines

-   Use functional components with hooks
-   Place components in the `app/components/` directory
-   Use PascalCase for component names
-   Export components as default exports

### File Structure

```
app/
├── components/          # Reusable UI components
├── globals.css         # Global styles
├── layout.tsx          # Root layout
├── page.tsx           # Home page
└── [other-pages]/     # Additional pages
```

### Styling

-   Use Tailwind CSS classes for styling
-   Follow mobile-first responsive design principles
-   Use semantic HTML elements
-   Ensure accessibility standards are met

## Making Changes

### Before You Start

1. Check existing issues to see if your feature/bug is already being worked on
2. Create a new issue to discuss major changes
3. Fork the repository and create a new branch

### Branch Naming

Use descriptive branch names:

-   `feature/add-contact-form`
-   `fix/header-navigation-bug`
-   `docs/update-readme`
-   `refactor/optimize-images`

### Commit Messages

Write clear, descriptive commit messages:

-   Use present tense ("Add feature" not "Added feature")
-   Keep the first line under 50 characters
-   Add more detailed description if needed

Examples:

```
Add contact form component

- Create ContactForm component with validation
- Add form submission handling
- Include responsive design for mobile
```

## Submitting Changes

### Pull Request Process

1. **Update your fork** with the latest changes from main:

    ```bash
    git checkout main
    git pull upstream main
    git checkout your-feature-branch
    git rebase main
    ```

2. **Test your changes**:

    ```bash
    npm run build
    npm run lint
    ```

3. **Push your changes**:

    ```bash
    git push origin your-feature-branch
    ```

4. **Create a Pull Request** on GitHub with:
    - Clear title describing the change
    - Detailed description of what was changed and why
    - Reference any related issues
    - Screenshots for UI changes

### Pull Request Guidelines

-   Keep PRs focused on a single feature or fix
-   Include tests if applicable
-   Update documentation as needed
-   Ensure all checks pass
-   Be responsive to feedback during review

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

-   Clear description of the issue
-   Steps to reproduce
-   Expected vs actual behavior
-   Browser and OS information
-   Screenshots if applicable

### Feature Requests

For new features:

-   Describe the problem you're trying to solve
-   Explain your proposed solution
-   Consider alternative approaches
-   Discuss potential impact on existing functionality

## Code Review Process

1. All changes require review before merging
2. Reviewers will check for:
    - Code quality and standards
    - Functionality and testing
    - Performance implications
    - Security considerations
3. Address feedback promptly and professionally
4. Once approved, maintainers will merge the PR

## Questions or Help?

-   Open an issue for questions about the project
-   Join our community discussions
-   Check existing documentation and issues first

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing! 🎉
