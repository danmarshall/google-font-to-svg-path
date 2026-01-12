# google-font-to-svg-path
Create an SVG path from a Google font

https://danmarshall.github.io/google-font-to-svg-path

## Features

### Multi-line Text Support
You can now create SVG paths for multiple lines of text:
- Enter text in the textarea field (supports multiple lines)
- Press Enter to create new lines
- Adjust the "Line Height" parameter to control spacing between lines (default: 1.2)
- Empty lines are automatically skipped

### Parameters
- **Text**: Multi-line textarea for entering text (use Enter/Return for new lines)
- **Size**: Font size in units
- **Line Height**: Multiplier for vertical spacing between lines (e.g., 1.2 means 120% of font size)
- **Union**: Combine overlapping paths
- **Kerning**: Apply font kerning
- **Fill**: Fill the paths with color
- **Separate Characters**: Assign each character to a separate layer
- Other styling options: bezier accuracy, fill color, stroke, etc.
