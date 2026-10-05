# How to Host this Site (for free!)


## Option 1: Built-in Netlify Sync
Bearnoby Tools can also publish the site to a free Netlify account for you: turn on **Netlify Publishing** under **Advanced** on the TTS Website page. The options below are for hosting this exported folder yourself.

## Option 2: Github Pages
Github is the more developer-centered option, but it provides free hosting with a URL that looks something like this:

`https://<your-username>.github.io/<repository-name>/`

### First time
1. Sign in at [github.com](https://github.com), or create a free account.
2. Click **+** (top right) -> **New repository**.
   - Give it a name. That name will sit at the end of your URL, e.g. `tts-builder` -> https://yourusername.github.io/tts-builder/
   - Set it to **Public** (free accounts need a public repository for Pages)
   - Click **Create repository**.
3. On the new repository's page, click the **uploading an existing file** link.
4. Open this folder, select everything inside it (including the `samples` and `fonts` folders, if there), and drag it onto the upload page. Wait for every file to finish, then click **Commit changes**.
5. Go to **Settings** -> **Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the **main** branch and the **/ (root)** folder, then click **Save**.
6. After a minute or two, the top of that Pages settings screen shows your site's address, usually in the form of `https://<your-username>.github.io/<repository-name>/`. Share that link with your viewers.

### Updating it later

When you change voices, descriptions, suggested emotions, effects, or redeems:

1. In Bearnoby Tools, use **Export Data Only** into this same folder.
2. On your repository's page on GitHub, click **Add file** -> **Upload files**
3. Drag in `data.js` and the `samples` folder, then click **Commit changes**. Files with the same name are replaced.

Changes can take a few minutes to show up. If you still see the old version, refresh with **Ctrl+F5**.

## Option 3: Cloudflare Pages
Cloudflare Pages is pretty simple compared to Github as it doesn't involve a repository, but you do have to re-upload the entire website every time you make a change.

### First time

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com), or create a free account.
2. Go to **Build -> Compute -> Workers & Pages**, then select **Create application -> Upload your static files**.
3. Enter a project name, e.g. `ttsbuilder`. This becomes part of your site's address.
4. Drag this whole folder into the upload area, then select **Deploy site**.
5. Your site is live at `https://<project-name>.<username>.workers.dev`. Share that link with your viewers.

### Updating it later

Each upload to Cloudflare replaces the whole site, so always upload the **entire folder**, not just the files that changed.
1. In the Cloudflare dashboard, open your project under **Workers & Pages** and select **New deployment** at the top of the page.
2. Choose **Production**, drag this whole folder in again, and deploy.

### After updating

Changes can take a few minutes to show up. If you still see the old version, refresh with **Ctrl+F5**.

## Changing the look

- **Colors and fonts** are at the top of `style.css`. Font files it uses are in the `fonts` folder.
- **Layout and wording** are in `index.html`

Upload any file you change the same way as above, though, if you're touching this, you probably already know how to use Git and can pull down the repo and change it that way instead c: