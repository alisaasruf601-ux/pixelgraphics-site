# How to publish and edit your website (free)

You only need two free services:

- **GitHub** keeps your website files and has a free editor in the browser.
- **Netlify** puts your website online and updates it every time you save a change. Its free plan allows business websites.

You don't need to install anything. Everything works in your web browser.

---

## Part 1: Put your files on GitHub (about 10 minutes)

1. **Unzip** `pixel-graphics-website.zip` on your computer. You'll get a folder called `pixel-graphics-website`.
2. Go to **github.com** and click **Sign up**. Create a free account and confirm your email.
3. Click the **+** at the top right and choose **New repository**.
4. Fill in the form:
   - **Repository name:** `pixel-graphics-website`
   - Choose **Private**, so only you can see the files.
   - Leave everything else empty. Do **not** tick "Add a README".
   - Click **Create repository**.
5. On the next page, click the blue link **"uploading an existing file"**.
6. Open the unzipped `pixel-graphics-website` folder on your computer and select **everything inside it** with Ctrl+A on Windows or Cmd+A on Mac. That includes the folders `src`, `public` and `docs` and all the files.
7. **Drag** it all onto the GitHub page and wait until every file has finished uploading.
   - Files that start with a dot, such as `.gitignore`, may be hidden on your computer. That's fine.
8. Scroll down and click **Commit changes**. ✅ Your files are now on GitHub.

## Part 2: Put the website online with Netlify (about 5 minutes)

1. Go to **netlify.com**, click **Sign up** and choose **Sign up with GitHub**. Allow access when asked.
   - If Netlify asks about your plans, choose the free plan (called **Free** or **Starter**).
2. Click **Add new site** (it may also say **Add new project**), then choose **Import an existing project**.
3. Choose **GitHub**, then give Netlify access to the `pixel-graphics-website` repository.
4. Click **pixel-graphics-website**.
5. Netlify fills in the settings automatically, so leave them as they are. Click **Deploy**.
6. Wait about 2–4 minutes. When it says **Published**, click your link, for example `random-name-123.netlify.app`. 🎉 Your website is live.
7. Optional: to give the link a nicer name, go to **Site configuration → Change site name** and pick something like `pixelgraphics`. Your link becomes `pixelgraphics.netlify.app`.

## Part 3: Edit your website

### Option A: Quick edits (easiest)

1. On GitHub, open your repository and click through the folders to the file you want.
2. Click the ✏️ **pencil** icon at the top right of the file.
3. Make your change.
4. Click **Commit changes**, then **Commit changes** again.
5. Netlify updates the live website automatically in about 2 minutes.

### Option B: The free editor program in your browser

1. On your GitHub repository page, press the **.** (full stop) key on your keyboard.
2. A full code editor opens in your browser. It's free Visual Studio Code, with all your files listed on the left.
3. Click a file in the list on the left, edit it and press Ctrl+S (Cmd+S on Mac) to save.
4. Click the **Source Control** icon on the left (it looks like a branch: three dots joined by lines).
5. Type a short note such as "Updated prices" and click **Commit & Push**.
6. Netlify updates the live website in about 2 minutes.

### Which file changes what

| What you want to change | File |
|---|---|
| Email, WhatsApp, social media links, booking link, logo animation on/off | `src/config/site.ts` |
| Prices, packages, calculator prices | `src/config/pricing.ts` |
| Service departments and service lists | `src/config/services.ts` |
| Page text | `src/app/about/page.tsx`, `src/app/process/page.tsx`, and so on |
| Homepage sections | `src/components/sections.tsx` |
| Colours and fonts | `tailwind.config.ts` |

**Golden rule:** only change the text **between the quotation marks** `"..."`. Leave the commas, brackets and quotation marks as they are.

Example in `src/config/site.ts`:

```ts
email: "",                         ← before
email: "hello@pixelgraphics.com",  ← after
```

When the email field has a value, the contact button appears on the website. While it's empty, the button stays hidden.

### Adding a homepage video

1. On GitHub, open the `public/video` folder and choose **Add file → Upload files**. Upload your video, for example `hero.mp4` (MP4, ideally under 8 MB).
2. Open `src/config/site.ts` and find `heroVideo`. Fill it in like this:
   ```ts
   src: "/video/hero.mp4",
   ```
   The video fills the top of the homepage behind the headline; the animated service cards stay on top of it.
3. Commit your changes. The video plays automatically on a loop with no sound, and it has a pause button.

### Using photos of your work on the service cards

The six animated service cards on the homepage use designed brand visuals. To use your own photos:
1. Upload images to the `public/showcase` folder (for example `branding.jpg`, landscape, about 1600 px wide).
2. Open `src/config/services.ts`, find `showcase`, and add the image to a card:
   ```ts
   { slug: "branding", title: "Branding & Visual Identity", image: "/showcase/branding.jpg" },
   ```

### If something goes wrong

If a change has a mistake, Netlify keeps your **old working version online**, so visitors never see a broken site. In Netlify, open **Deploys**, click the failed deploy and read the error. Then undo your change on GitHub, or send a screenshot to Claude.

## Part 4: Make the forms email you (free, about 10 minutes)

Until you finish this part, the forms show a polite "couldn't send" message.

1. Go to **resend.com** and create a free account.
2. Go to **API Keys → Create API Key** and copy the key. Keep it secret.
3. In Netlify, open your site, go to **Site configuration → Environment variables** and click **Add a variable**. Add these three, one at a time:

   | Key | Value |
   |---|---|
   | `RESEND_API_KEY` | the key you copied |
   | `NOTIFY_TO_EMAIL` | the email address where you want to receive messages |
   | `NOTIFY_FROM_EMAIL` | `onboarding@resend.dev` |

4. Go to **Deploys**, click **Trigger deploy**, then **Deploy site**.
5. Test it by filling in your own contact form. The message should arrive in your inbox.

With `onboarding@resend.dev`, Resend only delivers to the email address of your own Resend account. Later, you can verify your own domain in Resend and send from an address like `website@pixelgraphics.com`.

## Part 5 (optional): Your own domain

A domain costs about $10–15 a year, from providers such as Namecheap or Cloudflare.

1. In Netlify, go to **Domain management → Add a domain** and follow the steps.
2. Netlify tells you exactly what to change at your domain provider.
3. Free HTTPS (the padlock in the browser) is set up for you automatically.

---

**What it costs:** GitHub, Netlify and Resend are free on these plans. The only optional cost is your own domain. Plans can change, so check each pricing page when you sign up.

See `README.md` for the technical details and the pre-launch checklist.
