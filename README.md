# <center>User Guide</center>
- Execute `npm install` in the root directory.
- Then execute `npm run dev`.
- P.S.: If you encounter an error when executing `npm install`, please execute it again with administrator privileges.

# <center>Feature Introduction</center>
## **Brush Features**
1. Pencil drawing
2. Brush thickness adjustment
3. Brush color adjustment (using a color picker mode)
4. Gradient brush
## **Geometric Shape Features**
1. Drawing all shapes (utilizes a dual-canvas design, where geometric shapes are previewed on a temporary canvas)
2. Geometric shape color adjustment (using a color picker mode)
## **Eraser Features**
1. Erasing functionality
2. Eraser preview functionality: the size range of the eraser is visible when the mouse moves, and erasing can be performed when the mouse is pressed down (dual-canvas mode)
## **Undo Feature**
1. Revert to the previous state
## **Save Feature**
1. Save as a PNG format file with a transparent background
## **Import Feature**
1. Can import JPG or PNG files as the canvas for modification
## **One-Click Clear**
1. Clears the current canvas

# <center>Developer Manual</center>
## **Project Structure**
- The CSS and JS files for a component are located in the same folder under the `component` directory; the folder name is the same as the file name.
- The component name is the same as the file name, but the first letter is capitalized.
- Prefer adding new components over modifying existing ones.
- The relative positioning of new components might require modification of the parent component's properties.
## **Comments**
- Comment the author's name and the component's function at the beginning of the component's JSX file.
- Code comments must be detailed.
## **Commit**
- Check out a branch from the main branch.
- The branch name must be "AuthorName-Date-NthBranchOfTheDay", such as `Yuki-20251111-1`.
- There must be no bugs upon committing.
- The commit message (msg) must include the author's name + the main function of the code.
- Try not to modify branches created by others.
- Commit once a component is finished.
- Code review is mandatory before merging.