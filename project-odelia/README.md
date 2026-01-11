# Project Odelia 💧❤️

An ATLA-inspired Valentine's web application with a Water element theme, created with love for Odelia.

## 🌊 Features

- **Interactive YES/NO Interface**: Ask the special question with style
- **Water-Themed Animations**: Flowing gradients, ripple effects, and water droplets
- **Playful Dodge Mechanics**: The NO button evades the cursor with water-themed effects
- **Beautiful Success Sequence**:
  - Ripple effects expanding across screen
  - Water-themed confetti celebration
  - Droplets gathering to form a glowing heart
  - Romantic message reveal
- **Full-Stack Implementation**:
  - Next.js 14 with App Router
  - TypeScript for type safety
  - SQLite database for response storage
  - API routes for backend functionality
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- **Accessible**: Keyboard navigation, ARIA labels, reduced motion support

## 🎨 Design Theme

Inspired by the Water element from Avatar: The Last Airbender:
- **Colors**: Blue/teal gradient palette
- **Background**: Soft parchment scroll with flowing water effects
- **Typography**: Calligraphy fonts (Tangerine, Cinzel) for romantic feel
- **Animations**: Ripples, flowing water, droplet particles - all at 60fps

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd project-odelia
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
project-odelia/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main page
│   │   ├── globals.css      # Global styles
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── ui/              # UI components
│   │   ├── features/        # Feature components
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & database
│   └── types/               # TypeScript types
├── public/                  # Static assets
└── responses.db             # SQLite database (auto-created)
```

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 14 (App Router)
  - TypeScript
  - TailwindCSS
  - Framer Motion (animations)
  - canvas-confetti (celebrations)
  - react-use (hooks)

- **Backend**:
  - Next.js API Routes
  - better-sqlite3 (SQLite database)

- **Deployment**:
  - Vercel (recommended)

## 📱 Key Components

### QuestionInterface
The main component orchestrating the entire experience. Manages state transitions and animation sequences.

### WaterButton (YES Button)
Large, glowing button with water gradient and hover effects. Emits water droplets on hover.

### DodgyButton (NO Button)
Playful button that dodges the cursor using mouse proximity detection. Gets progressively harder to click.

### SuccessAnimation
Multi-stage animation sequence:
1. Water droplets gather from screen edges
2. Form a heart shape
3. Heart glows and pulses
4. Fades into romantic message

### RomanticMessage
Displays personalized romantic message with water-themed metaphors.

## 🎯 API Endpoints

### POST /api/response
Store user response (yes/no) with metadata.

**Request Body**:
```json
{
  "answer": "yes",
  "sessionId": "optional-session-id",
  "metadata": {
    "dodgeCount": 5,
    "timeToDecide": 12450
  }
}
```

**Response**:
```json
{
  "success": true,
  "responseId": 1,
  "message": "Response saved successfully!"
}
```

### GET /api/stats
Retrieve response statistics.

**Response**:
```json
{
  "totalResponses": 10,
  "yesCount": 9,
  "noCount": 1,
  "yesPercentage": 90,
  "lastUpdated": "2026-01-10T..."
}
```

## 🎨 Customization

### Personalization
The app is currently personalized for "Odelia" with Water element theming. To customize:

1. Update the name in `src/components/features/QuestionInterface.tsx`
2. Modify romantic message in `src/components/features/RomanticMessage.tsx`
3. Adjust color palette in `tailwind.config.ts` for different elements (Fire, Earth, Air)

### Color Themes

**Water (Current)**:
- Primary: `#0ea5e9` (water-500)
- Accent: `#2dd4bf` (teal-400)

**Fire Alternative**:
```typescript
fire: {
  500: '#ef4444', // red-500
  400: '#f97316', // orange-500
}
```

**Earth Alternative**:
```typescript
earth: {
  500: '#059669', // green-600
  400: '#84cc16', // lime-500
}
```

**Air Alternative**:
```typescript
air: {
  500: '#a78bfa', // violet-400
  400: '#c084fc', // purple-400
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] YES button hover animation works
- [ ] YES button click triggers full sequence
- [ ] NO button dodges cursor correctly
- [ ] Ripple effect displays at click position
- [ ] Confetti bursts properly
- [ ] Success animation plays smoothly
- [ ] Romantic message displays with correct name
- [ ] API stores responses in database
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Mobile responsive design works
- [ ] Reduced motion preference respected

### Run Tests
```bash
npm run lint        # Check for code issues
npm run build       # Test production build
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Project Odelia"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Vercel will auto-detect Next.js and deploy

4. Your app will be live at `https://your-project.vercel.app`

### Environment Variables

No environment variables needed for basic deployment. If using Vercel KV instead of SQLite:

```env
KV_REST_API_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token
```

## 💡 Tips

- **Testing Locally**: Clear browser cache if animations don't load properly
- **Database**: The SQLite database will be created automatically on first run
- **Performance**: All animations target 60fps for smooth experience
- **Accessibility**: Test with keyboard navigation and screen readers

## 📄 License

This is a personal project created with love. Feel free to use it as inspiration for your own romantic web experiences!

## ❤️ Credits

Created with:
- Love and care
- Next.js
- Framer Motion magic
- Water element inspiration from Avatar: The Last Airbender
- For Odelia 💧

---

**May the water guide your heart to say YES!** 🌊❤️
