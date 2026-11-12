# WFI Prototype

Interactive prototype of the Workforce Insights **Data Access** experience from Dominic’s portfolio Figma file.

## What’s included

- **Home / Setup & management** canvas with management cards
- **Access & data settings** side panel (`Access` / `Attributes` tabs)
- **Your organizational data** card with expand/collapse
- **Give access** → **Grant data access** modal with people search
- Granted people list + toast confirmation

Source frames (Figma):

- Home: `J0B5sRxINhdAS16hWojsGU` / `532791:201688`
- Data Access panel: `4391:46121`
- Org data card: `4391:46583`
- Grant modal: `3559:35183`

## Run locally

```bash
cd "/Users/dominicrapp/WFI Prototype"
python3 -m http.server 5173
```

Open [http://localhost:5173](http://localhost:5173).

## Edit in Cursor

1. Keep the local server running
2. Open the page in **Cursor Browser**
3. Use **Design Mode** (`Cmd+Shift+D`) to click elements and annotate changes
4. Or edit `index.html`, `styles.css`, and `app.js` directly

## GitHub

```bash
git status
git add .
git commit -m "Add WFI Data Access interactive prototype"
git push -u origin main
```

If this repo isn’t linked yet, create a remote with GitHub CLI after `gh auth login`.
