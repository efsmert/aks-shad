# Alpha Kappa Sigma (ΑΚΣ) Fraternity Website

A modern, sleek fraternity website built with Next.js 14, featuring a sophisticated green color palette with liquid, fluid animations throughout.

![Alpha Kappa Sigma](https://img.shields.io/badge/Alpha%20Kappa%20Sigma-ΑΚΣ-0D4D2B)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Package Manager**: Bun
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 🎨 Design System

### Color Palette (Green Theme)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#0D4D2B` | Deep forest green |
| Secondary Green | `#1A7D4E` | Vibrant emerald |
| Accent Green | `#2ECC71` | Bright mint |
| Light Green | `#A8E6CF` | Soft sage |
| Dark Background | `#0A0F0D` | Near-black green tint |
| Card Background | `#121A16` | Dark green-gray |

### Animation Philosophy
All animations feel "liquid" — smooth, organic, with natural easing curves:
- Subtle parallax effects on scroll
- Smooth page transitions with opacity and transform
- Hover states that feel like water ripples
- Loading states with flowing gradients
- Staggered animations for list items
- Spring physics for interactive elements

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home
│   ├── brothers/
│   │   └── page.tsx       # Brothers Directory
│   ├── giving-back/
│   │   └── page.tsx       # Philanthropy
│   ├── rush/
│   │   └── page.tsx       # Rush Information
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                # shadcn components
│   ├── layout/            # Header, Footer
│   ├── home/              # Home page components
│   ├── brothers/          # Brothers page components
│   ├── giving-back/       # Philanthropy components
│   ├── rush/              # Rush page components
│   └── shared/            # Shared components
├── lib/
│   ├── utils.ts
│   ├── animations.ts      # Framer Motion variants
│   └── constants.ts       # App constants
├── data/
│   ├── brothers.ts        # Brother data
│   └── philanthropy.ts    # Philanthropy data
└── types/
    └── index.ts           # TypeScript types
```

## 🛠 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.0 or higher)
- Node.js 18+ (for some compatibility)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alpha-kappa-sigma
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun start
```

## 📄 Pages

### Home (`/`)
- Full-viewport hero with animated Greek letters
- About section with chapter history and statistics
- Core values displayed as animated cards
- Call-to-action sections linking to other pages

### Brothers (`/brothers`)
- Comprehensive brother directory system
- Filter by pledge class, role, or search by name
- Animated card grid with hover effects
- Modal profile view with detailed member information

### Giving Back (`/giving-back`)
- Hero section with philanthropy focus
- Impact statistics with animated counters
- Philanthropy partner showcase
- Events carousel for past and upcoming service events

### Rush (`/rush`)
- Bold hero with countdown timer to rush week
- Benefits of joining section
- Interactive timeline of rush events
- FAQ accordion section
- Interest form with form validation

## ✨ Key Features

- **Responsive Design**: Flawless experience on mobile, tablet, and desktop
- **Dark Theme**: Elegant dark mode with green accents
- **Liquid Animations**: Smooth, organic animations throughout
- **Accessible**: WCAG 2.1 AA compliant with proper focus states
- **SEO Optimized**: Proper meta tags and semantic HTML
- **TypeScript**: Full type safety throughout the codebase

## 🧩 Components

### shadcn/ui Components
- Button, Card, Dialog, Input, Textarea
- Select, Accordion, Badge, Tabs
- Avatar, Skeleton, Sheet, Form, Label

### Custom Components
- `AnimatedCounter` - Scroll-triggered number animation
- `SectionHeading` - Animated headings with underline
- `ParallaxImage` - Scroll-based parallax effect
- `GradientBackground` - Mouse-following gradient orbs
- `BrotherCard` - Profile card with image zoom
- `BrotherProfile` - Modal with detailed info
- `FilterBar` - Search and filter controls
- `Timeline` - Vertical event timeline
- And many more...

## 📦 Dependencies

```json
{
  "next": "^14.x",
  "react": "^18.x",
  "framer-motion": "^11.x",
  "lucide-react": "latest",
  "@radix-ui/react-*": "shadcn dependencies",
  "tailwindcss": "^4.x",
  "typescript": "^5.x"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

Built with 💚 by Alpha Kappa Sigma
