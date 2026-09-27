# Worship Lyrics Generator

A simple tool for creating clean lyric images for worship songs.

The app reads songs from the included example songbook spreadsheet, removes chords and labels such as **Verse**, **Chorus**, and **Bridge**, and creates an image containing the song title and lyrics.

You can edit the lyrics before creating the image and then either:

- **Copy Image** — copy the lyric image so you can paste it directly into Google Docs.
- **Download PNG** — save the lyric image as a PNG file.

No coding knowledge is required to use the app. Follow the instructions below.

---

# 1. Download the Worship Lyrics Generator

The Worship Lyrics Generator is stored on GitHub.

There are two ways to download it:

1. **Download ZIP** — recommended if you are not familiar with coding tools.
2. **Git Clone** — useful if you are familiar with Git or want an easier way to download future updates.

If you aren't sure which one to use, use **Download ZIP**.

---

## Option A — Download ZIP From GitHub

This is the easiest option and does not require Git.

### Step 1 — Open the GitHub Repository

Open the GitHub link that was provided to you for the Worship Lyrics Generator.

You should see the project files, including things such as:

```text
public
src
package.json
README.md
vite.config.js
```

### Step 2 — Click "Code"

Near the top-right of the file list, click the green **Code** button.

A menu will appear.

### Step 3 — Click "Download ZIP"

Click:

```text
Download ZIP
```

Your browser will download a `.zip` file containing the entire application.

It will usually be placed in your computer's **Downloads** folder.

### Step 4 — Extract the ZIP File

You need to extract the ZIP before running the application.

#### Mac

Open **Finder** and go to **Downloads**.

Find the downloaded ZIP file. It may have a name similar to:

```text
worship-lyrics-main.zip
```

Double-click it.

macOS will create a normal folder next to the ZIP file, such as:

```text
worship-lyrics-main
```

#### Windows

Open **File Explorer** and go to **Downloads**.

Find the downloaded ZIP file.

Right-click it and choose:

```text
Extract All...
```

Choose where you want the folder to be stored and click **Extract**.

### Step 5 — Move the Folder Somewhere Convenient

You can move the extracted folder somewhere easy to find, such as your:

```text
Desktop
```

or:

```text
Documents
```

You can also rename:

```text
worship-lyrics-main
```

to simply:

```text
worship-lyrics
```

The folder should contain files similar to:

```text
worship-lyrics/
│
├── public/
│   └── songbook.csv
│
├── src/
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

You now have the application downloaded.

Continue to **Installing Node.js** below.

---

# 2. Alternative: Download Using Git Clone

This method is optional.

If you used **Download ZIP**, skip this section.

Git allows you to download the project using the command line. It also makes downloading future updates easier.

## Install Git

Before using `git clone`, Git needs to be installed on your computer.

You can download Git from:

https://git-scm.com/downloads

Follow the installer instructions for your operating system.

### Mac

Some Macs may already have Git installed.

You can check later by running:

```bash
git --version
```

### Windows

Download **Git for Windows** from the Git website and use the default installation options.

---

## Copy the Repository URL

Open the Worship Lyrics Generator repository on GitHub.

Click the green **Code** button.

Make sure **HTTPS** is selected.

You should see an address similar to:

```text
https://github.com/USERNAME/worship-lyrics.git
```

Click the copy button next to it.

---

## Open the Command Line

### Mac

Press:

```text
Command + Space
```

Type:

```text
Terminal
```

Press **Enter**.

### Windows

Press the **Windows key**.

Type:

```text
PowerShell
```

Open **PowerShell**.

---

## Choose Where to Download the App

For example, to download it to your Desktop:

### Mac

Run:

```bash
cd ~/Desktop
```

### Windows

Run:

```powershell
cd $HOME\Desktop
```

Press **Enter**.

---

## Clone the Repository

Type:

```bash
git clone 
```

Do not press Enter yet.

Paste the GitHub repository URL after it.

For example:

```bash
git clone https://github.com/USERNAME/worship-lyrics.git
```

Replace the example address with the actual GitHub repository address.

Press **Enter**.

Git will download the project.

You should see messages similar to:

```text
Cloning into 'worship-lyrics'...
Receiving objects...
Resolving deltas...
```

When it finishes, you should have a new folder:

```text
worship-lyrics
```

on your Desktop.

Enter the folder by running:

```bash
cd worship-lyrics
```

You now have the application downloaded.

---

# 3. Before Using the App for the First Time

The app requires a program called **Node.js** to run.

You only need to install Node.js once on your computer.

## Install Node.js

Go to the official Node.js website:

https://nodejs.org/

Download the **LTS** version.

"LTS" stands for Long Term Support and is the recommended version for most users.

Run the installer and use the default installation options.

After installation finishes, completely close any Terminal or PowerShell windows you already have open.

Then reopen Terminal or PowerShell.

---

# 4. Open the Command Line

If you downloaded the app using Git and still have your Terminal or PowerShell window open inside the `worship-lyrics` folder, you can skip to the first-time setup section.

Otherwise:

## Mac

Press:

```text
Command + Space
```

Type:

```text
Terminal
```

Press **Enter**.

## Windows

Press the **Windows key**.

Type:

```text
PowerShell
```

Open **PowerShell**.

---

# 5. Navigate to the Worship Lyrics Folder

The command line needs to know where the application is located.

An easy way to do this is by dragging the folder into the command line.

Type:

```text
cd 
```

Make sure there is a space after `cd`.

**Do not press Enter yet.**

Now drag the `worship-lyrics` folder from Finder on Mac or File Explorer on Windows into the Terminal or PowerShell window.

The folder's location should automatically appear.

For example, on Mac:

```bash
cd /Users/yourname/Desktop/worship-lyrics
```

Or on Windows:

```powershell
cd C:\Users\YourName\Desktop\worship-lyrics
```

Press **Enter**.

---

# 6. First-Time Setup

You only need to do this once after downloading the application.

Run:

```bash
npm install
```

Press **Enter**.

Your computer will download everything required by the application.

You may see a lot of text appear. This is normal.

Wait until the command prompt appears again.

---

# 7. Start the App

Run:

```bash
npm run dev
```

After a moment, you should see something similar to:

```text
VITE ready

Local: http://localhost:5173/
```

Open Chrome, Safari, Edge, Firefox, or another web browser.

Go to:

```text
http://localhost:5173/
```

The Worship Lyrics Generator should appear.

**Keep the Terminal or PowerShell window open while using the application.**

Closing it will stop the app.

---

# Updating the App Later

How you update the application depends on how you originally downloaded it.

## If You Used Download ZIP

The easiest approach is to download the newest ZIP from GitHub again.

Go to the GitHub repository and select:

```text
Code → Download ZIP
```

Extract the new folder just like before.

If your `songbook.csv` contains changes that aren't stored in GitHub, make sure you save a copy before replacing the old project folder.

You may need to run:

```bash
npm install
```

inside the newly downloaded folder before running the app.

Then start it with:

```bash
npm run dev
```

## If You Used Git Clone

Open Terminal or PowerShell and navigate to your existing `worship-lyrics` folder.

Then run:

```bash
git pull
```

Git will download the latest changes.

If the project's dependencies have changed, also run:

```bash
npm install
```

Then start the app normally:

```bash
npm run dev
```

---

# Quick Start for Nontechnical Users

If this is your first time using the application, the entire process is:

```text
1. Open the project's GitHub page.

2. Click:
   Code → Download ZIP

3. Extract the ZIP.

4. Install Node.js LTS from nodejs.org.

5. Open Terminal (Mac) or PowerShell (Windows).

6. Type:
   cd

   followed by a space, then drag the worship-lyrics
   folder into the window and press Enter.

7. Run:
   npm install

8. Run:
   npm run dev

9. Open:
   http://localhost:5173/

10. Search for a worship song and create your lyric image.
```

After the first setup, you normally only need to:

```text
1. Open Terminal / PowerShell.
2. Navigate to worship-lyrics.
3. Run: npm run dev
4. Open http://localhost:5173/
```