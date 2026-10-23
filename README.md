# ✅ To-Do List

A clean, modern to-do list app built with plain **HTML, CSS, and JavaScript**. No frameworks and no build step. Your tasks are saved in the browser, so they're still there after a refresh.

🔗 **Live demo:** [markehab1.github.io/To-Do-List](https://markehab1.github.io/To-Do-List/)

---

## ✨ Features

- **Add tasks** with the **Add** button or by pressing **Enter**
- **Complete tasks** by clicking them (a checkbox and strikethrough show they're done)
- **Edit tasks** by double-clicking the text or pressing the ✎ button
  - **Enter** or **Save** saves the change
  - **Escape** cancels it
- **Delete tasks** with the ✖ button and a smooth collapse animation
- **Tasks / Completed tabs** with a sliding underline
- **Saved in localStorage**, so your list survives page reloads
- **Scrolls inside the card**: the card grows as you add tasks, then the list scrolls inside it instead of the whole page
- **Responsive** on phones, tablets, and desktops
- **Accessible**:
  - Readable color contrast (WCAG AA)
  - Clear keyboard focus styles
  - `aria-label`s on icon buttons
  - Respects the "reduce motion" setting

## 🛠️ Built With

- **HTML5**
- **CSS3**: CSS variables, Flexbox, animations, and media queries
- **JavaScript (ES6+)**: DOM manipulation and the localStorage API
- **[Inter](https://fonts.google.com/specimen/Inter)** font from Google Fonts

## 🚀 Getting Started

No installation needed.

```bash
git clone https://github.com/Markehab1/To-Do-List.git
cd To-Do-List
```

Then open `index.html` in your browser.

## 📁 Project Structure

```
To-Do-List/
├── index.html   # Page structure
├── main.css     # Styles, theme colors (CSS variables), animations
├── script.js    # App logic: add, edit, complete, delete, tabs, storage
└── Images/      # Icons
```

## 🎨 Customizing Colors

All colors are CSS variables at the top of `main.css`. Change them in one place:

```css
:root {
  --bg: #F6F7F9;
  --card: #FFFFFF;
  --primary: #4F46E5;
  --text: #111827;
  --completed: #6B7280;
}
```

## 👤 Author

**Mark Ehab** · [LinkedIn](https://www.linkedin.com/in/mark-ehab-453519389/) · [GitHub](https://github.com/Markehab1)
