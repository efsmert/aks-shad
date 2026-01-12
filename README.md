# 🦁 Alpha Kappa Sigma Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Bun](https://img.shields.io/badge/Bun-Runtime-f9f1e1?style=for-the-badge&logo=bun)

**The official website for Alpha Kappa Sigma (ΑΚΣ) Fraternity at Northeastern University**

[🌐 Live Site](https://efsmert.github.io) • [📧 Contact](mailto:info@example.com)

</div>

---

## ✨ About

Alpha Kappa Sigma is a brotherhood founded in **1919** at Northeastern University, dedicated to the **Advancement of Kindred Sympathy**. Our members come from diverse backgrounds, united by shared values and a commitment to excellence in academics, service, and personal growth.

This website serves as the digital home for ΑΚΣ, featuring:
- 🏠 **Home** - Learn about our mission and legacy
- 👥 **Brothers** - Meet our active members with filtering and search
- 💚 **Giving Back** - Explore our philanthropy and community service
- 🎯 **Rush** - Information for prospective members

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **shadcn/ui** | Beautiful UI components |
| **Bun** | Fast package manager & runtime |

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js 18+)

### Installation

```bash
# Clone the repository
git clone https://github.com/efsmert/efsmert.github.io.git
cd efsmert.github.io

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
bun run build
```

The static site will be generated in the `out/` directory.

---

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Home page
│   ├── brothers/        # Brothers directory
│   ├── giving-back/     # Philanthropy page
│   └── rush/            # Rush information
├── components/
│   ├── home/            # Home page components
│   ├── brothers/        # Brother cards & profiles
│   ├── rush/            # Rush page components
│   ├── layout/          # Header & Footer
│   ├── shared/          # Reusable components
│   └── ui/              # shadcn/ui components
├── data/
│   └── brothers.ts      # Brother member data
└── lib/
    ├── constants.ts     # Site configuration
    ├── animations.ts    # Framer Motion variants
    └── utils.ts         # Utility functions
```

---

## 🌐 Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions. Any push to the `main` branch triggers a new deployment.

**Live at:** [https://efsmert.github.io](https://efsmert.github.io)

---

## 📜 License

This project is for Alpha Kappa Sigma fraternity use.

---

<div align="center">

**ΑΚΣ** • Est. 1919 • Northeastern University

*Advancing Kindred Sympathy*

</div>
