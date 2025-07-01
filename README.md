# Tadoku Toshokan - Japanese Reading Collection

A simple static website for Japanese short stories optimized for mobile reading. This project allows you to host Japanese reading materials organized by level, making it easy for language learners to find appropriate content.

## Features

- Mobile-friendly design
- Stories organized by reading level
- Simple templating system for easy addition of new stories
- Clean, distraction-free reading experience
- Static HTML/CSS/JS for easy hosting on GitHub Pages

## Project Structure

```
tadoku-toshokan/
├── index.html                  # Homepage with story list
├── story.html                  # Story display page
├── css/
│   └── style.css               # Styles for the website
├── js/
│   ├── stories-data.js         # Data file containing story metadata
│   └── main.js                 # Main JavaScript functionality
└── stories/                    # Directory containing all stories
    ├── 1/                      # Level 1 stories
    ├── 2/                      # Level 2 stories
    ├── 3/                      # Level 3 stories
    │   └── 001/                # Story folder (example)
    │       ├── 001.md          # Story text in markdown format
    │       ├── 00.png          # Cover image
    │       ├── 01.png          # Page 1 image
    │       └── ...             # Additional page images
    └── 4/                      # Level 4 stories
```

## How to Add a New Story

1. **Create a new folder** in the appropriate level directory (e.g., `stories/3/002/` for the second level 3 story)

2. **Add story content** in a markdown file named after the folder (e.g., `002.md`). The markdown file should follow this format:
   ```
   https://source-url/
   Title in Japanese
   原作：Author Name

   01
   First page text content
   Multiple lines allowed
   
   02
   Second page text content
   ...
   ```

3. **Add images** for each section:
   - `00.png` - Cover image
   - `01.png`, `02.png`, etc. - Images for each numbered section
   - If a section has multiple images, use `01A.png`, `01B.png`, etc.

4. **Update the stories-data.js** file to include the new story metadata:
   ```javascript
   {
       id: "002",
       title: "Story Title",
       level: 3,
       author: "Author Name",
       authorEn: "English Author Name (optional)",
       folderPath: "stories/3/002",
       coverImage: "stories/3/002/00.png",
       description: "Japanese description",
       descriptionEn: "English description (optional)",
       pageCount: 10,
       publishDate: "Publication date (optional)"
   }
   ```

## Testing Locally

Due to browser security restrictions (CORS policy), you must run the website through a local web server rather than opening the HTML files directly. Direct file access will prevent the JavaScript from loading story content properly.

Here are several easy ways to run a local web server:

### Method 1: Using Python's Built-in Server

Python comes pre-installed on most macOS and Linux systems:

```bash
# Navigate to your project folder
cd /path/to/tadoku-toshokan

# For Python 3
python -m http.server

# For Python 2
python -m SimpleHTTPServer
```

Then open `http://localhost:8000` in your browser.

### Method 2: Using Node.js http-server

If you have Node.js installed:

```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to your project folder
cd /path/to/tadoku-toshokan

# Run the server
http-server
```

Then open `http://localhost:8080` in your browser.

### Method 3: Using VS Code Live Server Extension

If you're using Visual Studio Code:

1. Install the "Live Server" extension by Ritwick Dey
2. Right-click on `index.html` in the file explorer
3. Select "Open with Live Server"

VS Code will automatically open the site in your default browser.

## Hosting on GitHub Pages

To host this website on GitHub Pages:

1. Push the entire project to a GitHub repository
2. Go to the repository settings
3. Scroll down to the GitHub Pages section
4. Select the branch you want to deploy (usually `main` or `master`)
5. Save the settings
6. Your site will be available at `https://yourusername.github.io/repository-name/`

## Customization

- **Styling**: Edit `css/style.css` to change the website's appearance
- **Header/Footer**: Modify `index.html` and `template/story-template.html` to update the header and footer content
- **Level Labels**: Edit the level buttons in `index.html` if you want to use different level categories

## Credits

Stories collected from various sources including:
- [Tadoku.org](https://tadoku.org/japanese/en/free-books-en/)
- Other sources as listed in resources.md

## License

Please respect the copyright of original story sources. This template is provided for educational use only.
