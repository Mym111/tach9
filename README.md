# tach9
Mym Match 3

## Renaming the game

"Exodus Run" (formerly Tach 9) is still a working title. To rename:

1. `index.html`: change `const GAME_NAME` (drives the splash title, header, install prompts, `document.title` and the iOS app title at boot), and the two static copies in the head: `<title>` and `<meta name="apple-mobile-web-app-title">`. The `data-gn` spans keep the page text in sync.
2. `manifest.webmanifest`: `name` and `short_name`.
3. `sw.js`: the `CACHE` prefix (`tach9-vNNN`) and header comment. Changing the prefix also drops the old cache for returning players.
4. `icons/`: replace artwork if the name appears in it. Keep file names or update `manifest.webmanifest` and `index.html` links.
5. `README.md`, `README.txt`, `NOTICES.txt`: title lines.
6. Do **not** change the save keys (`bridgeduty.save.v3`, `bridgeduty.audio`, `bridgeduty.muted`), or every player loses their progress.
7. The in-world "Tach N" goal text is a game term (the speed barrier), not the title, so it stays.
