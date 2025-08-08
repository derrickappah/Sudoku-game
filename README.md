
# Sudoku Game

A web-based Sudoku game built with HTML, CSS, and JavaScript, using Tailwind CSS for layout and vanilla CSS for core styling. Players solve randomly generated puzzles at different difficulty levels, use hints, and track time. Pre-filled cells are light blue, user inputs are light green (persistent), and invalid inputs are red.

## Features

- **Interactive 9x9 Grid**: Play randomly generated puzzles with read-only pre-filled cells.
- **Difficulty Levels**: Easy (40 pre-filled cells), Medium (30), Hard (20).
- **Timer**: Tracks solving time, starting on game load and stopping on win.
- **Hint Feature**: Fills one correct number in an empty cell.
- **Real-Time Validation**: Detects duplicates, marking invalid cells in red.
- **Check Functionality**: Validates the grid and checks for a win.
- **New Game**: Starts a new puzzle with the selected difficulty and resets the timer.
- **Responsive Design**: Optimized for desktop and mobile.
- **Visual Feedback**:
  - Pre-filled cells: Light blue (`#e0f2fe`).
  - User inputs: Light green (`#d1e7dd`, persistent).
  - Invalid inputs: Red (`#fee2e2`).
  - Buttons: Blue (`#3d99f5`) with hover and focus effects.
- **Win Detection**: Shows "Congratulations! You solved the Sudoku in [time]!" on completion.

## Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
- Internet connection for Tailwind CSS and Google Fonts CDNs.

## Setup

1. **Clone or Download the Repository**:
   - Clone: `git clone <repository-url>`
   - Or download the project files.

2. **File Structure**:
   ```
   /sudoku-game
   ├── index.html
   ├── styles.css
   ├── script.js
   └── .nojekyll (optional, to bypass Jekyll)
   ```

3. **Dependencies**:
- Tailwind CSS (CDN in `index.html`).
- Manrope font (Google Fonts in `index.html`).

4. **Run Locally**:
- Place `index.html`, `styles.css`, and `script.js` in the same directory.
- Open `index.html` in a browser or use a local server (e.g., `Live Server` or `python -m http.server 8000`).

5. **Deploy to GitHub Pages**:
- Push files to the `main` or `gh-pages` branch.
- Go to Settings → Pages, set source to `main` (or `gh-pages`) and `/ (root)`.
- Access at `https://username.github.io/sudoku-game/`.
- If CSS/JS don’t load, add `.nojekyll`:
  ```bash
  touch .nojekyll
  git add .nojekyll
  git commit -m "Add .nojekyll"
  git push origin main
  ```
- For repository-scoped URLs, add `<base href="/sudoku-game/">` in `<head>` of `index.html`.

## Usage

1. **Choose Difficulty**:
- Click **Easy**, **Medium**, or **Hard** (Easy is default).
- Active difficulty button is blue; others are gray.

2. **Play the Game**:
- Pre-filled cells are light blue and read-only.
- Enter numbers (1-9) in editable cells; they turn light green (persistent).
- Invalid inputs (duplicates) turn red with an error message.

3. **Use Features**:
- **Check**: Validates the grid. Shows "Congratulations!" with time if complete and correct, or "Grid is valid but not complete" if valid.
- **Hint**: Fills one empty cell with a correct number.
- **New Game**: Starts a new puzzle with the selected difficulty and resets the timer.

4. **Timer**:
- Starts automatically and stops on win.

## Customization

- **Colors** (edit `:root` in `styles.css`):
- `--solved-color` (`#d1e7dd`): User inputs.
- `--secondary-color` (`#e0f2fe`): Pre-filled cells.
- `--primary-color` (`#3d99f5`): Buttons.
- `--error-color` (`#fee2e2`): Invalid inputs.
- **Difficulty** (edit `difficultySettings` in `script.js`):
- Adjust number of pre-filled cells (e.g., `easy: 40`).
- **Puzzle**: Modify `generatePuzzle` for different generation logic.

## Troubleshooting

- **CSS/JS Not Loading**:
- Ensure `styles.css` and `script.js` are in the root directory.
- Verify paths (`href="styles.css"`, `src="script.js"`).
- Add `.nojekyll` for GitHub Pages.
- Clear cache or test in incognito mode.
- Add `<base href="/sudoku-game/">` for repository-scoped URLs.
- **Button Styles Missing**:
- Check `.button_primary` and `.button_difficulty` in `styles.css` (Developer Tools → Inspect).
- **Invalid Inputs Not Highlighted**: Use numbers 1-9.
- **No Win Detection**: Ensure all cells are filled correctly (matches solution).

## Limitations

- Puzzle generation may be slow for hard puzzles due to backtracking.
- No puzzle import/export.
- Limited difficulty customization.

## Future Improvements

- Save high scores with times per difficulty.
- Add undo/redo functionality.
- Support puzzle import/export.
- Optimize puzzle generation for speed.
- Enhance mobile touch support.

## License

This project is open-source under the [MIT License](LICENSE).

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for layout styling.
- [Manrope font](https://fonts.google.com/specimen/Manrope) from Google Fonts.
- Inspired by standard Sudoku game mechanics.
