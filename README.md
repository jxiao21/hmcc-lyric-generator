# Worship Lyrics Generator

A simple tool for creating clean lyric images for worship songs.

The app reads songs from the included songbook spreadsheet, removes chords and labels such as **Verse**, **Chorus**, and **Bridge**, and creates an image containing the song title and lyrics.

You can edit the lyrics before creating the image and then either:

- **Copy Image** — copy the lyric image so you can paste it directly into Google Docs.
- **Download PNG** — save the lyric image as a PNG file.

No coding knowledge is required to use the app. Follow the instructions below.

---
# Downloading the application

1. Download the Worship Lyrics Generator

The Worship Lyrics Generator is stored on GitHub.

There are two ways to download it:

Download ZIP — recommended if you are not familiar with coding tools.

Git Clone — useful if you are familiar with Git or want an easier way to download future updates.

If you aren't sure which one to use, use Download ZIP.

Option A — Download ZIP From GitHub

This is the easiest option and does not require Git.

Step 1 — Open the GitHub Repository

Open the GitHub link that was provided to you for the Worship Lyrics Generator.

You should see the project files, including things such as:

public
src
package.json
README.md
vite.config.js

Step 2 — Click "Code"

Near the top-right of the file list, click the green Code button.

A menu will appear.

Step 3 — Click "Download ZIP"

Click:

Download ZIP

Your browser will download a .zip file containing the entire application.

It will usually be placed in your computer's Downloads folder.

Step 4 — Extract the ZIP File

You need to extract the ZIP before running the application.

Mac

Open Finder and go to Downloads.

Find the downloaded ZIP file. It may have a name similar to:

worship-lyrics-main.zip

Double-click it.

macOS will create a normal folder next to the ZIP file, such as:

worship-lyrics-main

Windows

Open File Explorer and go to Downloads.

Find the downloaded ZIP file.

Right-click it and choose:

Extract All...

Choose where you want the folder to be stored and click Extract.

Step 5 — Move the Folder Somewhere Convenient

You can move the extracted folder somewhere easy to find, such as your:

Desktop

or:

Documents

You can also rename:

worship-lyrics-main

to simply:

worship-lyrics

The folder should contain files similar to:

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

You now have the application downloaded.

Continue to Installing Node.js below.

2. Alternative: Download Using Git Clone

This method is optional.

If you used Download ZIP, skip this section.

Git allows you to download the project using the command line. It also makes downloading future updates easier.

Install Git

Before using git clone, Git needs to be installed on your computer.

You can download Git from:

https://git-scm.com/downloads

Follow the installer instructions for your operating system.

Mac

Some Macs may already have Git installed.

You can check later by running:

git --version

Windows

Download Git for Windows from the Git website and use the default installation options.

Copy the Repository URL

Open the Worship Lyrics Generator repository on GitHub.

Click the green Code button.

Make sure HTTPS is selected.

You should see an address similar to:

https://github.com/USERNAME/worship-lyrics.git

Click the copy button next to it.

Open the Command Line

Mac

Press:

Command + Space

Type:

Terminal

Press Enter.

Windows

Press the Windows key.

Type:

PowerShell

Open PowerShell.

Choose Where to Download the App

For example, to download it to your Desktop:

Mac

Run:

cd ~/Desktop

Windows

Run:

cd $HOME\Desktop

Press Enter.

Clone the Repository

Type:

git clone 

Do not press Enter yet.

Paste the GitHub repository URL after it.

For example:

git clone https://github.com/USERNAME/worship-lyrics.git

Replace the example address with the actual GitHub repository address.

Press Enter.

Git will download the project.

You should see messages similar to:

Cloning into 'worship-lyrics'...
Receiving objects...
Resolving deltas...

When it finishes, you should have a new folder:

worship-lyrics

on your Desktop.

Enter the folder by running:

cd worship-lyrics

You now have the application downloaded.

---

# 1. Before Using the App for the First Time

The app requires a program called **Node.js** to run.

You only need to install Node.js once on your computer.

## Install Node.js

Go to the official Node.js website:

https://nodejs.org/

Download the **LTS** version.

"LTS" stands for Long Term Support and is the recommended version for most users.

Run the installer and use the default installation options.

After installation finishes, continue with the instructions for your computer.

---

# 2. Find the Worship Lyrics Folder

You should have been given a folder called something similar to:

```text
hmcc-lyric-generator
```

Inside it, you should see files and folders similar to:

```text
hmcc-lyric-generator/
│
├── public/
│   └── songbook.csv (this file will be missing initially and will need to be uploaded manually by you for copyright reasons)
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

You normally do **not** need to edit any of these files.

The main file you may occasionally replace is:

```text
public/songbook.csv
```

That is the song library used by the app.

---

# 3. Opening the Command Line

The app is started using your computer's command line.

This may look unfamiliar if you haven't used coding tools before, but you only need to run a few commands.

## Mac

### Open Terminal

Press:

```text
Command + Space
```

This opens Spotlight Search.

Type:

```text
Terminal
```

Press **Enter**.

A window will appear with text and a blinking cursor.

That is Terminal.

---

## Windows

### Open PowerShell

Press the **Windows key**.

Type:

```text
PowerShell
```

Click **Windows PowerShell** or **PowerShell**.

A window will appear with text and a blinking cursor.

That is the command line.

---

# 4. Navigate to the Worship Lyrics Folder

The command line needs to know where the app is located.

The easiest method is to type:

```text
cd 
```

Notice the space after `cd`.

Do **not** press Enter yet.

Then drag the `hmcc-lyric-generator` folder from Finder on Mac or File Explorer on Windows directly into the command-line window.

Your computer should automatically insert the folder's location.

For example, on a Mac it may look like:

```bash
cd /Users/yourname/Desktop/hmcc-lyric-generator
```

On Windows it may look like:

```powershell
cd C:\Users\YourName\Desktop\hmcc-lyric-generator
```

Now press **Enter**.

You are now inside the Worship Lyrics project.

---

# 5. First-Time Setup

You only need to do this the **first time you run the app on a computer**.

After navigating into the `hmcc-lyric-generator` folder, type:

```bash
npm install
```

Press **Enter**.

The computer will download the pieces needed to run the app.

This may take a minute.

You may see a lot of text appear. That is normal.

When it finishes, you should see the command prompt again.

The project will also gain a folder called:

```text
node_modules
```

Do not delete or edit this folder.

---

# 6. Start the App

Once setup is complete, type:

```bash
npm run dev
```

Press **Enter**.

After a moment, you should see something similar to:

```text
VITE ready

Local: http://localhost:5173/
```

Open your web browser, such as Chrome, Safari, Edge, or Firefox.

Go to:

```text
http://localhost:5173/
```

The Worship Lyrics Generator should appear.

**Important:** Keep the Terminal or PowerShell window open while using the app.

Closing that window will stop the app.

---

# 7. Using the App

When the app opens, it automatically loads the song library.

At the top-right, you should see something similar to:

```text
● 245 songs loaded
```

The exact number depends on the current songbook.

## Find a song

Use the **Select Song** search box.

You can search by song title or CCLI number.

For example:

```text
What A Beautiful Name
```

Songs with multiple arrangements will display a label such as:

```text
2 versions
```

Click the song you want.

---

# 8. Choosing a Song Version

Some songs have multiple versions or arrangements.

For example, **What A Beautiful Name** may have both:

```text
Spanish
```

and:

```text
What A Beautiful Name
```

After selecting a song with multiple versions, a **Version** menu will appear.

Click the menu and select the version you want.

The lyrics will automatically change to the selected arrangement.

If a song only has one version, the Version menu will not appear.

---

# 9. Editing Lyrics

After selecting a song, the app automatically removes chord symbols such as:

```text
[F]
[Bb]
[Dm]
[C/E]
```

It also removes section labels such as:

```text
Verse 1
Verse 2
Chorus
Chorus 2
Bridge
Tag
Interlude
```

For example:

```text
Verse 1
[F]Man of sorrows, [Bb]Lamb of [F]God
[Bb]By His [F]own be[C]trayed
```

becomes:

```text
Man of sorrows, Lamb of God
By His own betrayed
```

The cleaned lyrics appear in the **Lyrics** box.

You can click inside this box and make any changes you want. Please note that this lyric generator is not 100% accurate in removing chords from chord charts, so make sure to double-check your lyrics!

This is useful for:

- Removing a repeated chorus
- Changing the order of lyrics
- Fixing spacing
- Correcting a typo
- Removing lyrics you are not singing
- Adding lyrics that are missing

The image preview updates automatically.

---

# 10. Formatting the Image

Above the image preview are several options.

## Lyrics

Changes the size of the lyric text.

## Title

Changes the size of the song title.

## Width

Changes the width/resolution of the generated image.

The default should work well for most Google Docs.

## Spacing

Changes the space between lyric lines.

Options include:

```text
Tight
Normal
Loose
```

## Transparent

When enabled, the image has a transparent background.

This generally makes the lyrics blend naturally into a Google Doc.

---

# 11. Copying Lyrics Into Google Docs

Once the lyrics look correct, click:

```text
Copy Image
```

You should see a message saying:

```text
Image copied! Paste it into Google Docs.
```

Open your Google Doc.

Place your cursor where you want the lyrics.

Then paste.

### Mac

Press:

```text
Command + V
```

### Windows

Press:

```text
Ctrl + V
```

The lyric image should appear directly in the Google Doc.

---

# 12. Downloading the Image

If **Copy Image** does not work, or if you want to save the image, click:

```text
Download PNG
```

The image will be downloaded to your computer.

You can then insert the PNG into Google Docs manually.

---

# 13. Updating the Songbook

The app automatically reads its songs from:

```text
public/songbook.csv
```

If you receive a newer songbook, you can replace this file.

## Step 1

Open the `hmcc-lyric-generator` folder.

## Step 2

Open:

```text
public
```

You should see:

```text
songbook.csv
```

## Step 3

Delete the old `songbook.csv`.

## Step 4

Copy the new CSV into the `public` folder.

## Step 5

Make sure the new file is named **exactly**:

```text
songbook.csv
```

Not:

```text
Songbook.csv
songbook (1).csv
new-songbook.csv
songbook.xlsx
```

It must be:

```text
songbook.csv
```

## Step 6

Refresh the Worship Lyrics webpage.

The updated songs should load automatically.

If the app was closed, start it again using:

```bash
npm run dev
```

---

# 14. Stopping the App

When you're finished, return to the Terminal or PowerShell window where the app is running.

Press:

```text
Ctrl + C
```

The app will stop.

You can then close Terminal or PowerShell.

---

# 15. Running the App Again Later

You do **not** need to run `npm install` every time.

Normally, starting the app only requires three steps.

## Step 1 — Open Terminal or PowerShell

Mac:

```text
Command + Space → Terminal
```

Windows:

```text
Windows key → PowerShell
```

## Step 2 — Go to the project folder

Type:

```text
cd 
```

Then drag the `hmcc-lyric-generator` folder into the command-line window and press **Enter**.

## Step 3 — Start the app

Run:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173/
```

That's it.

---

# Troubleshooting

## "npm: command not found"

If you see something similar to:

```text
npm: command not found
```

Node.js is probably not installed.

Install the **LTS** version of Node.js from:

https://nodejs.org/

Then completely close Terminal or PowerShell and open it again.

Try:

```bash
npm run dev
```

again.

---

## "Missing script: dev"

You are probably in the wrong folder.

The command line needs to be inside the folder containing:

```text
package.json
```

Type:

```text
cd 
```

Drag the `hmcc-lyric-generator` folder into the command-line window and press **Enter**.

Then run:

```bash
npm run dev
```

---

## The app says "Songbook unavailable"

Make sure this file exists:

```text
hmcc-lyric-generator/public/songbook.csv
```

The filename must be exactly:

```text
songbook.csv
```

Then refresh the webpage.

---

## The app says "0 songs loaded"

The CSV may not be in the expected format.

The songbook should contain columns including:

```text
Id
Title
CCLI
Arrangement 1 Name
Arrangement 1 Chord Chart
Arrangement 2 Name
Arrangement 2 Chord Chart
Arrangement 3 Name
Arrangement 3 Chord Chart
Arrangement 4 Name
Arrangement 4 Chord Chart
```

Not every song needs all four arrangements.

The app automatically detects which arrangements contain chord charts.

---

## A song is missing

First, search for part of the song title rather than the entire title.

For example, search:

```text
Beautiful Name
```

instead of the entire song title.

If it still does not appear, check that the song has a chord chart in at least one of these columns:

```text
Arrangement 1 Chord Chart
Arrangement 2 Chord Chart
Arrangement 3 Chord Chart
Arrangement 4 Chord Chart
```

Songs without any chord chart are not