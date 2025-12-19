# Feedback Popup Setup Guide

## Overview
A beautiful, animated feedback popup component that appears when users scroll to 80% of the page. It collects star ratings, name, email, and advice/suggestions, then sends the feedback to your external API backend.

## Features
✨ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
🌓 **Theme Support** - Seamlessly adapts to dark and light themes
🎨 **Graphic Chart Compliant** - Uses your portfolio's color scheme (violet-dark, violet-light, yellow)
✨ **Smooth Animations** - Built with Framer Motion for elegant transitions
⭐ **Star Rating** - Interactive 5-star rating system
🚀 **External API Integration** - Sends feedback to your backend API (https://api.ach02raf.pro/send-feedback)

## Setup Instructions

### Step 1: Configure Your API Endpoint

Edit the feedback API route to point to your backend:

**File:** `src/app/api/send-feedback/route.ts`

Update the API endpoint (replace with your own):

```typescript
const response = await fetch("https://your-api.com/send-feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    email,
    rating,
    advice,
  }),
});
```

### Step 2: Ready to Use!

That's it! The popup will now send feedback to your API endpoint.

**Example endpoints:**
- Your custom backend: `https://your-api.com/send-feedback`
- Firebase/Supabase: Configure in your backend
- Database endpoint: Configure in your backend

## Component Behavior

### When Does It Appear?
- Popup shows when user scrolls to **80% of the page**
- Only appears **once per session** (won't annoy users)
- Can be manually closed with the X button

### Form Fields
1. **Star Rating** (1-5 stars) - Required
2. **Name** - Required
3. **Email** - Required, validated
4. **Advice/Suggestions** - Required, textarea

### API Payload Format

The feedback is sent to your backend API with the following JSON payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "advice": "Great work!"
}
```

Your backend API should handle the processing, storage, and notification of the feedback.

## Styling Customization

The component uses your existing color variables from `global-variables.scss`:
- `$violet-dark: #2b0945`
- `$violet-light: #44285b`
- `$yellow: #fec260`
- `$white: #fff`

### Theme Variants
- **Dark Theme**: Deep violet background with glowing yellow accents
- **Light Theme**: Light violet background with subtle shadows

## Files Involved

```
src/
├── component/
│   └── FeedbackPopup/
│       ├── FeedbackPopup.tsx      # Main component
│       └── FeedbackPopup.scss     # Responsive styles
└── app/
    └── api/
        └── send-feedback/
            └── route.ts           # API endpoint that forwards to external API

dictionaries/
├── en.json                        # English translations
├── fr.json                        # French translations
└── de.json                        # German translations
```

## Internationalization

The popup supports all three languages in your portfolio:

### English
- "Share Your Feedback"
- "Rate your experience"

### French
- "Partagez Votre Avis"
- "Évaluez votre expérience"

### German
- "Teilen Sie Ihr Feedback"
- "Bewerten Sie Ihre Erfahrung"

## Troubleshooting

### Feedback Not Sending
1. Check browser console for errors
2. Verify network request in browser DevTools (Network tab)
3. Ensure your API endpoint is correct and accessible
4. Check that JSON payload matches your backend requirements
5. Verify backend is running and returning a valid response

### Popup Not Appearing
1. Scroll down to at least 80% of the page
2. Check that the popup hasn't already been shown (refresh page to reset)
3. Open browser console to check for JavaScript errors

### Styling Issues
1. Make sure `FeedbackPopup.scss` is in the correct location
2. Verify `global-variables.scss` contains the color variables
3. Clear browser cache and reload

## Alternative Trigger Options

If you prefer a different trigger instead of scroll detection, you can modify `FeedbackPopup.tsx`:

### Option 1: Time-based (Show after 30 seconds)
```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(true);
  }, 30000); // 30 seconds
  return () => clearTimeout(timer);
}, []);
```

### Option 2: Manual Button Trigger
Add a button in your Footer or Contact section that triggers:
```tsx
<button onClick={() => setIsVisible(true)}>Give Feedback</button>
```

### Option 3: Exit Intent
Show when user moves mouse to leave the page:
```tsx
useEffect(() => {
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0) setIsVisible(true);
  };
  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
}, []);
```

## Security Notes

- The feedback endpoint is a simple proxy that forwards to your backend API
- All sensitive processing is handled by your backend API
- No sensitive data is stored in frontend code
- Consider implementing rate limiting on your backend API in production
- Validate and sanitize user input on your backend

## Support

For issues or questions, check:
1. Browser console for errors
2. Terminal output for Next.js errors
3. Network tab (DevTools) to verify API requests
4. Your backend API logs for errors
5. Verify API endpoint URL in `route.ts`

---

**Your feedback collection system is live and ready to use! 🚀**
