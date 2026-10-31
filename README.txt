TACH 9 · INSTALLABLE WEB APP · v70

WHAT IS IN THIS FOLDER
  index.html            the whole game
  manifest.webmanifest  name, icon and full-screen settings for "install to home screen"
  sw.js                 offline support: keeps a copy of the game on the phone
  icons/                app icons (1024px is for store listings later)
  fonts/                the two pixel fonts, bundled for offline play
  NOTICES.txt           credits for the bundled fonts and QR library

PUT IT ONLINE (pick one, all free, all give you https)
  GitHub Pages: create a repository, upload everything in this folder (not the folder itself),
                then Settings > Pages > Deploy from branch > main / root.
  Netlify:      app.netlify.com/drop and drag this folder onto the page.
  Cloudflare Pages: Workers & Pages > Create > Pages > Upload assets.

TELL TESTERS
  Android (Chrome): open the link, tap "Install app" (or menu > Install app).
  iPhone (Safari):  open the link, tap Share > Add to Home Screen. It must be Safari.
  Then play from the new Tach 9 icon. Saves stay on that phone.
  To send feedback: Settings > Tester report, screenshot it, send the screenshot.

UPDATING
  Re-upload a new version of this folder. Testers get it automatically: the first launch after
  an update still shows the old version while the new one downloads; the next launch is new.
