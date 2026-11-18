# How to edit your website yourself (TinaCMS, free)

Your website has a built-in editor at **yourwebsite/admin**. You can change texts, buttons,
photos, icons, fonts, services, prices, packages and contact details. Click **Save**, and the
website updates by itself in about 2–4 minutes, with all the animations unchanged.

## One-time setup (about 10 minutes)

### 1. Upload this version to GitHub
Upload everything, including the folders **content**, **tina**, **src** and **public**, plus
**package.json** and **package-lock.json**.
Use: Add file → Upload files → drag in → Commit changes.

### 2. Create your free TinaCMS project
1. Go to **app.tina.io** and sign up with **GitHub**.
2. Create a new project and choose your repository **pixel-graphics-website**.
3. When asked for the site URL, enter your Netlify address, for example
   `https://jolly-custard-7109cb.netlify.app`.
4. In the project, copy the **Client ID**.
5. Open **Tokens**, create a **read-only token**, and copy it.

### 3. Add the two keys to Netlify
1. In Netlify, open your project → **Project configuration** → **Environment variables**.
2. Add `NEXT_PUBLIC_TINA_CLIENT_ID` = your Client ID.
3. Add `TINA_TOKEN` = your read-only token.
4. Go to **Deploys** → **Trigger deploy** → **Deploy project**.

### 4. Start editing (visual editor)
1. Open `https://<your-site>.netlify.app/admin` and log in with your TinaCMS account.
2. Your real homepage opens on the right, with an editing panel on the left.
3. Every editable item shows a **dashed outline** when you hover over it. **Click it**, and the matching
   field opens on the left with the cursor in it. Type, and the page changes **live** as you type.
   - **Text, buttons, prices:** click → type.
   - **Photos** (service cards): click the photo → drag in a new image or click to upload.
   - **Icons** (process steps, services): click the icon → choose another icon from the list.
   - **Services:** click **+** on a card to open the window, then click any text or service in it.
4. **Fonts, sizes & colours:** click **Referenced Files** (bottom left) → **theme**. Choose the heading font,
   body font, heading size, text size and accent colour. The page updates live.
5. Click **Save** (bottom left). The website updates by itself in about 2–4 minutes.
6. **Preview without editing outlines:** click the panel icon (top left, next to the warning) to hide the
   editing panel, or simply open your website normally in another tab.

## What you can edit

| Section in the editor | What you can change |
|---|---|
| **Homepage** | Headline lines (and which are teal), texts, button texts and links, the services, calculator, process (incl. icons), pricing and bottom sections |
| **Services** | The 6 animated cards (title + **photo**), all service departments: titles, icons, texts, what's included, what you receive |
| **Prices & packages** | Hourly rate, minimum hours, rush surcharge, the 3 monthly packages |
| **Contact & social media** | Email, WhatsApp, booking link, social links, logo animation on/off, background video |
| **Fonts** | Headings font and body font (from a list that fits the brand) |

## Tips
- Make several changes first, then click **Save** once. Every save rebuilds the website and uses some of your free Netlify credits.
- Fields marked "do not change" are links between pages. Leave them as they are.
- Photos: use landscape images about 1600 px wide (JPG or WebP).
