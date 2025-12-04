# <center>User Guide</center>
- Group 7 created the web canvas SketchLens for the "Thematic Project" course digital canvas project.
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

# <center>使用指南</center>
- 在根目录执行npm install
- 然后执行npm run dev
- ps:如果实行npm install 遇到错误，请使用管理员权限再执行

# <center>功能介绍</center>
## **笔刷功能**
1.	铅笔绘图
2.	笔刷粗细调整
3.	笔刷颜色调整（采用了取色器模式）
4.	渐变笔刷
## **几何图形功能**
1.	所有图形绘画（采用双层画布设计，即几何图形在临时画布上预览）
2.	几何图形颜色调整（采用取色器模式）
## **橡皮擦功能**
1.	擦除功能
2.	橡皮擦预览功能，鼠标移动时看见橡皮擦大小范围，鼠标按下时可进行擦除（双画布模式）
## **撤销功能**
1.	撤回上一步状态
## **保存功能**
1.	保存为透明底的png格式文件
## **导入功能**
1.	可导入jpg或png文件为画布，在上面进行修改
## **一键清除**
1.  可清空当前画布


# <center>开发手册</center>
## **项目结构**
- 组件的css文件和js文件位于component文件夹下的同一文件夹下;文件夹与文件同名
- 组件名与文件名相同，但首字母大写
- 尽量新增组件而不是修改原有组件
- 新组件的相对位置定位，可能需要修改父组件的属性
## **注释**
- 组件jsx文件开头，注释作者名字，注释该组件的功能
- 代码注释要详细
## **提交**
- 从主分支签出分支
- 分支名必须命名为 “作者名-时间 - 当天的第几个分支”，如Yuki-20251111-1
- 提交时不能有bug
- 提交时的msg包括，作者名+代码的主要功能
- 尽量不修改别人的分支
- 写完一个组件就提交
- 合并前必须进行代码审查