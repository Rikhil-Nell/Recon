# Recon 2026 — Sponsor Pitch Decks

Professional HTML sponsor presentations for **Recon 2026**, a 3-day DEFCON-style cybersecurity conference at VIT-AP University (April 25–27, 2026).

## Overview

This repository contains **4 interactive sponsor deck variants** designed to replace static Canva presentations with polished, responsive HTML experiences. Each deck presents the same sponsorship opportunity with different visual aesthetics to match diverse sponsor brand identities.

### Event Details
- **Event**: Recon 2026 — National cybersecurity conference
- **Dates**: April 25–27, 2026 (72 hours)
- **Location**: VIT-AP University, Amaravati
- **Expected Reach**: 600+ participants
- **Budget**: ₹4.97L (funded by IIT Madras Research Park)
- **Format**: Hybrid (in-person + virtual CTF)

## Deck Variants

### Variant 1: Cinematic (Video Backgrounds)
**File**: `sponsor-deck-variant-1.html`  
**Aesthetic**: Liquid glass UI with Mux video backgrounds, smooth transitions  
**Best For**: Tech-forward sponsors (cloud platforms, SaaS, dev tools)  
**Slides**: 8 (Hero → Audience → Event Experience → Tiers → Activations → ROI → Side Events → Contact)

### Variant 2: Cyberpunk (Technical Grid)
**File**: `sponsor-deck-variant-2.html`  
**Aesthetic**: Dark grid backgrounds, monospace fonts, cyber-card components  
**Best For**: Security vendors, pentesting firms, SOC platforms  
**Slides**: 7 (Hero → By The Numbers → Event Scope → Tiers → Engagement → Deliverables → Contact)

### Variant 3: Minimalist (Elegant Clean)
**File**: `sponsor-deck-variant-3.html`  
**Aesthetic**: White backgrounds, Space Grotesk typography, purple accents  
**Best For**: Enterprise sponsors, consulting firms, traditional corporations  
**Slides**: 8 (Hero → Audience → Event Highlights → Tiers → Activations → ROI → Timeline → Contact)

### Variant 4: Bold (High Impact)
**File**: `sponsor-deck-variant-4.html`  
**Aesthetic**: Dark backgrounds, Archivo Black headlines, neon purple glows  
**Best For**: Startups, disruptive brands, high-growth tech companies  
**Slides**: 7 (Hero → Opportunity → Event Format → Tiers → ROI → Timeline → Contact CTA)

## Sponsorship Tiers

### Title Sponsor (₹2,00,000 — 1 slot)
- Exclusive naming rights
- 30-min keynote slot
- Premium booth + full branding
- Dedicated CTF category
- Resume database access
- 5 all-access passes

### Gold Sponsor (₹75,000 — 4 slots)
- 15-min presentation slot
- Standard booth
- Sponsored challenge/workshop
- Resume book access
- 3 event passes

### Community Sponsor (₹25,000 — unlimited)
- Logo placement
- Shared booth
- Swag distribution
- Social media recognition
- 1 event pass

## Quick Start

### View Locally
1. Clone this repository
2. Open any `sponsor-deck-variant-*.html` file in a modern browser
3. Use arrow keys, scroll wheel, or on-screen navigation to move between slides

### Deploy to Vercel

#### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow prompts to link to your Vercel account
# Your decks will be live at https://your-project.vercel.app
```

#### Option 2: Vercel Dashboard
1. Push this repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Click "Deploy" (no build configuration needed)

#### Option 3: Vercel Git Integration
```bash
# Connect to Vercel and enable auto-deploy
vercel --prod

# Every git push to main will auto-deploy
git add .
git commit -m "Update sponsor decks"
git push origin main
```

### Access Your Decks
Once deployed, your decks are available at:
- `https://your-project.vercel.app/` → Landing page (variant selector)
- `https://your-project.vercel.app/variant-1` → Cinematic deck
- `https://your-project.vercel.app/variant-2` → Cyberpunk deck
- `https://your-project.vercel.app/variant-3` → Minimalist deck
- `https://your-project.vercel.app/variant-4` → Bold deck

## Customization

### Update Contact Information
Each deck's final slide contains contact details. Update these in the HTML files:

**Email**: Search for `rikhilnellimarla@gmail.com` and replace  
**Phone**: Search for `+91 XXX XXX XXXX` and replace with actual number  
**LinkedIn**: Update `linkedin.com/in/rikhilnellimarla` if needed

### Modify Event Details
If dates, venue, or budget change:
1. Open the relevant variant HTML file
2. Search for the specific value (e.g., "April 25–27, 2026")
3. Replace all occurrences
4. Redeploy

### Change Branding Colors
Each deck uses CSS custom properties for easy color adjustments:

**Variant 1 & 3**: Search for `--recon-purple: #8B5CF6`  
**Variant 2 & 4**: Search for `--purple-primary: #8B5CF6`

Replace the hex value to match your preferred brand color.

## Browser Compatibility

All decks are tested and optimized for:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile Support**: Fully responsive with touch-friendly navigation.

## Keyboard Navigation

- **Arrow Down / PageDown / Space**: Next slide
- **Arrow Up / PageUp**: Previous slide
- **Click navigation dots**: Jump to specific slide

## File Structure

```
recon-sponsor-decks/
├── sponsor-deck-variant-1.html    # Cinematic video version
├── sponsor-deck-variant-2.html    # Cyberpunk technical version
├── sponsor-deck-variant-3.html    # Minimalist elegant version
├── sponsor-deck-variant-4.html    # Bold impact version
├── vercel.json                    # Deployment configuration
├── README.md                      # This file
├── EVENT_MASTER_RUNBOOK.md        # Detailed event operations
├── SPONSOR_SOW_TEMPLATES.md       # Full sponsorship details
└── (other planning documents)
```

## Performance

- **Load Time**: <2 seconds on 4G connection
- **File Size**: 30–50KB per deck (minified inline CSS/JS)
- **No External Dependencies**: All fonts loaded from Google Fonts CDN
- **Video Streaming**: Variant 1 uses Mux CDN for optimized video delivery

## Analytics Integration

To track deck views and engagement, add your analytics script before the closing `</body>` tag in each HTML file:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Sharing with Sponsors

### Method 1: Direct Links
Send sponsors the Vercel URL for their preferred variant:
```
Subject: Recon 2026 Sponsorship Opportunity

Hi [Sponsor Name],

We'd love to have [Company] sponsor Recon 2026. Here's an interactive deck 
with full details on audience, tiers, and ROI:

https://your-project.vercel.app/variant-3

Let me know if you'd like to discuss over a call.

Best,
Rikhil Nellimarla
```

### Method 2: QR Codes
Generate QR codes for each variant using [qr-code-generator.com](https://www.qr-code-generator.com/) and include in email signatures or printed materials.

### Method 3: PDF Export (Fallback)
If a sponsor requires PDF format:
1. Open the deck in Chrome
2. Press `Ctrl/Cmd + P`
3. Select "Save as PDF"
4. Set margins to "None"
5. Enable "Background graphics"

## Support

For questions or customization requests:
- **Email**: rikhilnellimarla@gmail.com
- **LinkedIn**: [linkedin.com/in/rikhilnellimarla](https://linkedin.com/in/rikhilnellimarla)

## License

This repository is for Recon 2026 sponsorship outreach. Not licensed for external use or redistribution.

---

**Organized by**: Open Source Community (OSC) & Null Chapter  
**Venue**: VIT-AP University, Amaravati  
**Backed by**: IIT Madras Research Park
