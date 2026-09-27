import { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";

const MAX_ARRANGEMENTS = 4;

/* -------------------------------------------------------
   SONG / ARRANGEMENT HELPERS
------------------------------------------------------- */

function cleanTitle(title = "") {
  return title
    .replace(/^[A-Za-z]+\d+\s*-\s*/, "")
    .trim();
}

/*
 * Some arrangement names are basically the song title:
 *
 * W009 - What A Beautiful Name
 *
 * We clean that to:
 *
 * What A Beautiful Name
 */
function cleanArrangementName(name = "") {
  return name
    .replace(/^[A-Za-z]+\d+\s*-\s*/, "")
    .trim();
}

/*
 * Return all arrangements that actually contain a chord chart.
 */
function getArrangements(song) {
  if (!song) {
    return [];
  }

  const arrangements = [];

  for (let number = 1; number <= MAX_ARRANGEMENTS; number++) {
    const nameColumn = `Arrangement ${number} Name`;
    const chartColumn = `Arrangement ${number} Chord Chart`;
    const keyColumn = `Arrangement ${number} Chord Chart Key`;

    const chart = song[chartColumn];

    if (!chart || !chart.trim()) {
      continue;
    }

    let name = song[nameColumn]?.trim();

    if (!name) {
      name = `Arrangement ${number}`;
    } else {
      name = cleanArrangementName(name);
    }

    arrangements.push({
      number,
      name,
      chart,
      key: song[keyColumn]?.trim() || "",
    });
  }

  return arrangements;
}

/* -------------------------------------------------------
   LYRICS CLEANING
------------------------------------------------------- */

function removeChords(line = "") {
  return line.replace(/\[[^\]]+\]/g, "");
}

function isSectionHeading(line = "") {
  const normalized = line
    .trim()
    .replace(/:$/, "")
    .toLowerCase();

  return /^(verse|chorus|bridge|pre[- ]?chorus|post[- ]?chorus|intro|outro|refrain|interlude|instrumental|tag|ending)(\s*\d+)?$/.test(
    normalized
  );
}

/*
 * Detect lines that consist entirely of chord notation.

 * Examples:

 * [G | A | Bm | F#m (2x)]
 * [G | A | Bm | A]

 * These should disappear completely.
 */
function isChordOnlyLine(line = "") {
  const trimmed = line.trim();

  if (!trimmed) {
    return false;
  }

  /*
   * Remove all bracket groups.
   */
  const withoutBrackets = trimmed
    .replace(/\[[^\]]+\]/g, "")
    .trim();

  /*
   * If nothing remains, the entire line was chord notation.
   */
  return withoutBrackets === "";
}

function cleanChordChart(chart = "") {
  const lines = chart
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    /*
     * Some CSV exports contain encoded spaces.
     */
    .replace(/&#x20;/gi, " ")
    .replace(/&nbsp;/gi, " ")
    .split("\n");

  const cleanedLines = lines.map((line) => {
    const trimmed = line.trim();

    /*
     * Planning Center column marker.
     */
    if (trimmed.toUpperCase() === "COLUMN_BREAK") {
      return "";
    }

    /*
     * Verse 1
     * Chorus
     * Chorus 2
     * Bridge
     * Tag
     * Interlude
     * etc.
     */
    if (isSectionHeading(trimmed)) {
      return "";
    }

    /*
     * Entirely instrumental chord line.
     */
    if (isChordOnlyLine(trimmed)) {
      return "";
    }

    /*
     * Remove inline chords.
     */
    return removeChords(line)
      .replace(/[ \t]+$/g, "")
      .trim();
  });

  return cleanedLines
    .join("\n")
    .replace(/\n[ \t]+\n/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugify(text = "") {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "lyrics"
  );
}

function getBlocks(lyrics = "") {
  return lyrics
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

/* -------------------------------------------------------
   CANVAS
------------------------------------------------------- */

function wrapLine(ctx, text, maxWidth) {
  if (!text.trim()) {
    return [""];
  }

  const words = text.split(/\s+/);
  const wrappedLines = [];

  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine
      ? `${currentLine} ${word}`
      : word;

    const width = ctx.measureText(candidate).width;

    if (width <= maxWidth || currentLine === "") {
      currentLine = candidate;
    } else {
      wrappedLines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    wrappedLines.push(currentLine);
  }

  return wrappedLines;
}

function drawLyricsToCanvas({
  canvas,
  title,
  lyrics,
  width,
  fontSize,
  titleSize,
  lineHeight,
  transparent,
}) {
  const ctx = canvas.getContext("2d");

  const paddingX = 70;
  const paddingTop = 65;
  const paddingBottom = 70;

  const titleGap = 42;
  const blockGap = Math.round(fontSize * 0.85);

  const contentWidth = width - paddingX * 2;

  ctx.font = `${fontSize}px Arial`;

  const blocks = getBlocks(lyrics);

  const renderedBlocks = blocks.map((block) => {
    const sourceLines = block.split("\n");
    const wrapped = [];

    for (const line of sourceLines) {
      wrapped.push(
        ...wrapLine(ctx, line, contentWidth)
      );
    }

    return wrapped;
  });

  const titleHeight = titleSize * 1.25;

  let lyricsHeight = 0;

  renderedBlocks.forEach((block, index) => {
    lyricsHeight +=
      block.length * fontSize * lineHeight;

    if (index < renderedBlocks.length - 1) {
      lyricsHeight += blockGap;
    }
  });

  const calculatedHeight =
    paddingTop +
    titleHeight +
    titleGap +
    lyricsHeight +
    paddingBottom;

  const height = Math.max(
    Math.ceil(calculatedHeight),
    300
  );

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (!transparent) {
    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  ctx.fillStyle = "#111111";
  ctx.textBaseline = "top";

  /*
   * Title
   */
  ctx.font = `700 ${titleSize}px Arial`;

  ctx.fillText(
    title.toUpperCase(),
    paddingX,
    paddingTop
  );

  /*
   * Lyrics
   */
  let y =
    paddingTop +
    titleHeight +
    titleGap;

  ctx.font = `${fontSize}px Arial`;

  renderedBlocks.forEach(
    (block, blockIndex) => {
      block.forEach((line) => {
        ctx.fillText(
          line,
          paddingX,
          y
        );

        y += fontSize * lineHeight;
      });

      if (
        blockIndex <
        renderedBlocks.length - 1
      ) {
        y += blockGap;
      }
    }
  );

  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(
            new Error("Could not create PNG.")
          );
        }
      },
      "image/png"
    );
  });
}

/* -------------------------------------------------------
   APP
------------------------------------------------------- */

export default function App() {
  const canvasRef = useRef(null);

  const [songs, setSongs] = useState([]);

  const [
    songbookLoading,
    setSongbookLoading,
  ] = useState(true);

  const [
    songbookError,
    setSongbookError,
  ] = useState(false);

  const [search, setSearch] =
    useState("");

  const [
    selectedSongId,
    setSelectedSongId,
  ] = useState(null);

  const [
    selectedSong,
    setSelectedSong,
  ] = useState(null);

  const [
    selectedArrangementNumber,
    setSelectedArrangementNumber,
  ] = useState(null);

  const [title, setTitle] =
    useState("");

  const [lyrics, setLyrics] =
    useState("");

  /*
   * Image settings
   */
  const [fontSize, setFontSize] =
    useState(28);

  const [titleSize, setTitleSize] =
    useState(38);

  const [imageWidth, setImageWidth] =
    useState(1000);

  const [lineHeight, setLineHeight] =
    useState(1.35);

  const [
    transparent,
    setTransparent,
  ] = useState(true);

  const [status, setStatus] =
    useState("");

  /* -----------------------------------------------------
     CURRENT ARRANGEMENTS
  ----------------------------------------------------- */

  const arrangements = useMemo(() => {
    return getArrangements(selectedSong);
  }, [selectedSong]);

  /* -----------------------------------------------------
     LOAD SONGBOOK
  ----------------------------------------------------- */

  function loadSongsFromCsv(
    csvText,
    sourceName = "songbook.csv"
  ) {
    const results = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    /*
     * Keep songs with a title and at least
     * one populated arrangement.
     */
    const validSongs = results.data.filter(
      (row) =>
        row.Title &&
        getArrangements(row).length > 0
    );

    setSongs(validSongs);

    setSearch("");

    setSelectedSongId(null);
    setSelectedSong(null);

    setSelectedArrangementNumber(null);

    setTitle("");
    setLyrics("");

    setSongbookLoading(false);
    setSongbookError(false);

    setStatus(
      `Loaded ${validSongs.length} songs from ${sourceName}.`
    );
  }

  useEffect(() => {
    async function loadSongbook() {
      try {
        setSongbookLoading(true);
        setSongbookError(false);

        const response =
          await fetch("/songbook.csv");

        if (!response.ok) {
          throw new Error(
            `Could not load songbook.csv: ${response.status}`
          );
        }

        const csvText =
          await response.text();

        loadSongsFromCsv(
          csvText,
          "songbook.csv"
        );
      } catch (error) {
        console.error(error);

        setSongbookLoading(false);
        setSongbookError(true);

        setStatus(
          "Could not load songbook.csv. Make sure it exists at public/songbook.csv."
        );
      }
    }

    loadSongbook();
  }, []);

  /* -----------------------------------------------------
     SEARCH
  ----------------------------------------------------- */

  const filteredSongs = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return songs.slice(0, 50);
    }

    return songs
      .filter((song) => {
        const songTitle =
          song.Title || "";

        const cleanedTitle =
          cleanTitle(songTitle);

        const ccli =
          song.CCLI || "";

        return (
          songTitle
            .toLowerCase()
            .includes(query) ||
          cleanedTitle
            .toLowerCase()
            .includes(query) ||
          ccli
            .toLowerCase()
            .includes(query)
        );
      })
      .slice(0, 50);
  }, [songs, search]);

  /* -----------------------------------------------------
     SELECT SONG
  ----------------------------------------------------- */

  function selectSong(song, index) {
    const songArrangements =
      getArrangements(song);

    if (!songArrangements.length) {
      return;
    }

    const id =
      song.Id ||
      `${song.Title}-${index}`;

    const firstArrangement =
      songArrangements[0];

    const cleanedTitle =
      cleanTitle(song.Title);

    setSelectedSongId(id);
    setSelectedSong(song);

    setSelectedArrangementNumber(
      firstArrangement.number
    );

    setTitle(cleanedTitle);

    setLyrics(
      cleanChordChart(
        firstArrangement.chart
      )
    );

    if (songArrangements.length > 1) {
      setStatus(
        `Loaded ${cleanedTitle}. ${songArrangements.length} versions available.`
      );
    } else {
      setStatus(
        `Loaded ${cleanedTitle}.`
      );
    }
  }

  /* -----------------------------------------------------
     SELECT ARRANGEMENT
  ----------------------------------------------------- */

  function changeArrangement(event) {
    const arrangementNumber =
      Number(event.target.value);

    const arrangement =
      arrangements.find(
        (item) =>
          item.number ===
          arrangementNumber
      );

    if (!arrangement) {
      return;
    }

    setSelectedArrangementNumber(
      arrangementNumber
    );

    setLyrics(
      cleanChordChart(
        arrangement.chart
      )
    );

    setStatus(
      `Switched to ${arrangement.name}.`
    );
  }

  /* -----------------------------------------------------
     IMAGE
  ----------------------------------------------------- */

  function renderCanvas() {
    if (!canvasRef.current) {
      throw new Error(
        "Canvas is unavailable."
      );
    }

    return drawLyricsToCanvas({
      canvas: canvasRef.current,
      title,
      lyrics,
      width: Number(imageWidth),
      fontSize: Number(fontSize),
      titleSize: Number(titleSize),
      lineHeight: Number(lineHeight),
      transparent,
    });
  }

  async function copyImage() {
    try {
      const canvas =
        renderCanvas();

      const blob =
        await canvasToBlob(canvas);

      if (
        !navigator.clipboard?.write ||
        typeof ClipboardItem ===
          "undefined"
      ) {
        throw new Error(
          "Image clipboard is not supported."
        );
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      setStatus(
        "Image copied! Paste it into Google Docs."
      );
    } catch (error) {
      console.error(error);

      setStatus(
        "Couldn't copy the image. Try Download PNG instead."
      );
    }
  }

  async function downloadImage() {
    try {
      const canvas =
        renderCanvas();

      const blob =
        await canvasToBlob(canvas);

      const url =
        URL.createObjectURL(blob);

      const anchor =
        document.createElement("a");

      anchor.href = url;

      anchor.download =
        `${slugify(title)}-lyrics.png`;

      document.body.appendChild(
        anchor
      );

      anchor.click();
      anchor.remove();

      URL.revokeObjectURL(url);

      setStatus(
        "PNG downloaded."
      );
    } catch (error) {
      console.error(error);

      setStatus(
        "Couldn't generate the PNG."
      );
    }
  }

  /*
   * Live preview
   */
  useEffect(() => {
    if (!title && !lyrics) {
      return;
    }

    try {
      renderCanvas();
    } catch (error) {
      console.error(error);
    }
  }, [
    title,
    lyrics,
    fontSize,
    titleSize,
    imageWidth,
    lineHeight,
    transparent,
  ]);

  /* -----------------------------------------------------
     UI
  ----------------------------------------------------- */

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <div className="headerText">
          <h1>
            Worship Lyrics
          </h1>

          <p>
            Create clean lyric graphics
            for worship songs.
          </p>
        </div>

        <div
          className={
            songbookError
              ? "libraryStatus error"
              : "libraryStatus"
          }
        >
          <span
            className={
              songbookError
                ? "statusDot error"
                : songs.length
                  ? "statusDot loaded"
                  : "statusDot loading"
            }
          />

          <span>
            {songbookError
              ? "Songbook unavailable"
              : songbookLoading
                ? "Loading songbook..."
                : `${songs.length} songs loaded`}
          </span>
        </div>
      </header>

      <main className="workspace">

        {/* LEFT */}

        <section className="editorPanel">

          {/* SONG SEARCH */}

          <div className="section">
            <div className="sectionHeader">
              <label className="label">
                Select Song
              </label>

              {songs.length > 0 && (
                <span className="songCount">
                  {songs.length} songs
                </span>
              )}
            </div>

            <input
              className="input"
              type="text"
              placeholder={
                songbookLoading
                  ? "Loading songbook..."
                  : songbookError
                    ? "Songbook unavailable"
                    : "Search by title or CCLI number..."
              }
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              disabled={!songs.length}
            />

            {songs.length > 0 && (
              <div className="songList">
                {filteredSongs.length >
                0 ? (
                  filteredSongs.map(
                    (song, index) => {
                      const id =
                        song.Id ||
                        `${song.Title}-${index}`;

                      const songArrangements =
                        getArrangements(song);

                      return (
                        <button
                          type="button"
                          key={id}
                          className={
                            selectedSongId ===
                            id
                              ? "song active"
                              : "song"
                          }
                          onClick={() =>
                            selectSong(
                              song,
                              index
                            )
                          }
                        >
                          <div className="songInfo">
                            <span className="songTitle">
                              {cleanTitle(
                                song.Title
                              )}
                            </span>

                            {songArrangements.length >
                              1 && (
                              <span className="versionBadge">
                                {" - "}{
                                  songArrangements.length
                                }{" "}
                                versions
                              </span>
                            )}
                          </div>

                          {song.CCLI && (
                            <small>
                              CCLI{" "}
                              {song.CCLI}
                            </small>
                          )}
                        </button>
                      );
                    }
                  )
                ) : (
                  <div className="noSongs">
                    No songs found for "
                    {search}"
                  </div>
                )}
              </div>
            )}

            {songbookError && (
              <div className="songbookError">
                <strong>
                  Couldn't load the
                  songbook.
                </strong>

                <span>
                  Make sure your CSV is
                  located at{" "}
                  <code>
                    public/songbook.csv
                  </code>
                  .
                </span>
              </div>
            )}
          </div>

          {/* VERSION */}

          {selectedSong &&
            arrangements.length > 1 && (
              <div className="section versionSection">
                <div className="sectionHeader">
                  <label className="label">
                    Version
                  </label>

                  <span className="versionCount">
                    {arrangements.length}{" "}
                    available
                  </span>
                </div>

                <select
                  className="input versionSelect"
                  value={
                    selectedArrangementNumber ??
                    ""
                  }
                  onChange={
                    changeArrangement
                  }
                >
                  {arrangements.map(
                    (arrangement) => (
                      <option
                        key={
                          arrangement.number
                        }
                        value={
                          arrangement.number
                        }
                      >
                        {arrangement.name}
                        {arrangement.key
                          ? ` — Key of ${arrangement.key}`
                          : ""}
                      </option>
                    )
                  )}
                </select>

                <p className="versionHint">
                  This song has multiple
                  arrangements in the
                  songbook. Select the
                  version you want to use.
                </p>
              </div>
            )}

          {/* TITLE */}

          <div className="section">
            <label className="label">
              Image Title
            </label>

            <input
              className="input"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="Song title"
              disabled={!selectedSongId}
            />
          </div>

          {/* LYRICS */}

          <div className="section grow">
            <label className="label">
              Lyrics
            </label>

            <textarea
              className="lyricsEditor"
              value={lyrics}
              onChange={(event) =>
                setLyrics(
                  event.target.value
                )
              }
              placeholder={
                selectedSongId
                  ? "Edit lyrics..."
                  : "Select a song to begin..."
              }
              disabled={!selectedSongId}
            />

            <p className="hint">
              Chords and section labels
              are removed automatically.
              Edit anything here before
              copying your image.
            </p>
          </div>
        </section>

        {/* RIGHT */}

        <section className="previewPanel">

          {/* FORMATTING */}

          <div className="toolbar">
            <label>
              Lyric Size

              <input
                type="number"
                min="16"
                max="60"
                value={fontSize}
                onChange={(event) =>
                  setFontSize(
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Title Size

              <input
                type="number"
                min="20"
                max="80"
                value={titleSize}
                onChange={(event) =>
                  setTitleSize(
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Width

              <select
                value={imageWidth}
                onChange={(event) =>
                  setImageWidth(
                    event.target.value
                  )
                }
              >
                <option value="800">
                  800px
                </option>

                <option value="1000">
                  1000px
                </option>

                <option value="1200">
                  1200px
                </option>

                <option value="1600">
                  1600px
                </option>
              </select>
            </label>

            <label>
              Spacing

              <select
                value={lineHeight}
                onChange={(event) =>
                  setLineHeight(
                    event.target.value
                  )
                }
              >
                <option value="1.15">
                  Tight
                </option>

                <option value="1.35">
                  Normal
                </option>

                <option value="1.55">
                  Loose
                </option>
              </select>
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={transparent}
                onChange={(event) =>
                  setTransparent(
                    event.target.checked
                  )
                }
              />

              Transparent
            </label>
          </div>

          {/* PREVIEW */}

          <div
            className={
              transparent
                ? "preview transparent"
                : "preview"
            }
          >
            {!title && !lyrics ? (
              <div className="emptyPreview">
                <div className="emptyIcon">
                  ♪
                </div>

                <strong>
                  Select a song
                </strong>

                <span>
                  Search your songbook
                  to get started.
                </span>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
              />
            )}
          </div>

          {/* BUTTONS */}

          <div className="actions">
            <button
              type="button"
              className="secondaryButton"
              onClick={
                downloadImage
              }
              disabled={!lyrics}
            >
              Download PNG
            </button>

            <button
              type="button"
              className="primaryButton"
              onClick={copyImage}
              disabled={!lyrics}
            >
              Copy Image
            </button>
          </div>

          {status && (
            <div className="status">
              {status}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}