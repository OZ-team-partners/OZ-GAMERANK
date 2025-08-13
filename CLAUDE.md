# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build the application for production
npm start            # Start production server
npm run lint         # Run ESLint for code quality checks

# Package management
npm install          # Install dependencies
```

## Project Architecture

### Tech Stack
- **Frontend Framework**: Next.js 15.4.5 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 4.x + custom CSS
- **UI Components**: Material-UI (@mui/material, @emotion/react)
- **Icons**: Lucide React + MUI Icons
- **Font**: Press Start 2P font family for gaming theme

### Application Structure

**Core Pages & Features:**
- `/` - Main homepage with game rankings and sliders
- `/auth/*` - Authentication pages (login, signup, forgot password)  
- `/rank/*` - Game ranking pages by platform (steam, online, mobile)
- `/community/board` - Community board page
- `/small_contents/game_mbti` - Gaming personality test
- `/blog/newsletter` - Newsletter page
- `/game_Infor` - Game information page

**Key Components:**
- `header/header_bar.tsx` - Main navigation with dropdown menus for PC/Console/Mobile categories
- `header/header_barHero.tsx` - Hero section component
- `layout.tsx` - Root layout with global header structure

**Styling Approach:**
- Dark theme with slate color scheme (slate-900, slate-800, slate-700)
- Gaming aesthetic with gradient backgrounds and hover effects
- Responsive design using TailwindCSS utilities
- MUI components styled with custom sx props to match dark theme

**File Organization:**
- Pages use Next.js App Router structure (`src/app/*/page.tsx`)
- Components are co-located with their respective pages
- Global styles in `globals.css`
- Path alias `@/*` maps to `./src/*`

**Development Notes:**
- Uses `"use client"` directive for interactive components
- Korean language support with `lang="ko"` in layout
- Image assets stored in `public/icon/page_icon/` directory
- External fonts loaded from Google Fonts (Bangers font family)