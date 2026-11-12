# WFI Prototype

Interactive prototype of the Workforce Insights **Admin Agent home** from Dominic’s portfolio Figma file, plus the Data Access panel/modal flow.

## What’s included

- **Home** — hero, underline composer + suggestion chips, Setup & management, Manage data & context cards, Customize the agent, History
- **Access & data settings** side panel (`Access` / `Attributes` tabs)
- **Give access** → **Grant data access** modal with people search
- Granted people list + toast confirmation

Source frames (Figma file `Jk4gLd2W6PlAJJwOvErtX0`):

- Home: `2050:7750`
- Data Access panel / modal from earlier WFI Data Access frames (wired via **Open data access**)

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

Repo create/push is waiting on `gh auth login`. After you’re signed in:

```bash
gh repo create wfi-prototype --private --source=. --remote=origin --push
```
