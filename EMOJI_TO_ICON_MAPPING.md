   import { Users, BookOpen } from 'lucide-react';
   ```

2. **Render as JSX Components**: Icons are React components, not strings. Use them directly in JSX.
   ```tsx
   <Users className="w-6 h-6 text-gray-600" />
   ```

3. **Avoid Inline Styles**: Use Tailwind CSS classes for sizing and coloring instead of inline styles.

4. **Accessibility**: Icons should have appropriate `aria-label` or be accompanied by descriptive text for screen readers.

### Standard Icon Sizes

Use consistent sizing based on context:

- **Small (inline text)**: `w-4 h-4` or `w-5 h-5`
- **Medium (cards, badges)**: `w-6 h-6`
- **Large (hero sections, emphasis)**: `w-8 h-8`
- **Extra Large (featured)**: `w-10 h-10` or larger

### Colors and Unified Styles

- **Primary Icons**: Use `text-blue-600` or `text-primary` for main actions and highlights.
- **Secondary Icons**: Use `text-gray-600` or `text-secondary` for less prominent elements.
- **Success/State Icons**: Use semantic colors like `text-green-600` for positive states, `text-red-600` for errors.
- **Hover Effects**: Apply `hover:text-blue-700` for interactive elements.
- **Consistency**: Always use Tailwind's color palette to match the design system defined in `globals.css` and `enhanced-contrast.css`.

### Examples of Correct Usage

**Basic Icon in a Badge:**
```tsx
<div className="flex items-center gap-2">
  <Users className="w-5 h-5 text-blue-600" />
  <span>1,200 Students</span>
</div>
```

**Icon in a Button:**
```tsx
<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  <MessageCircle className="w-5 h-5" />
  Contact Support
</button>
```

**Icon with Custom Color:**
```tsx
<Award className="w-6 h-6 text-yellow-500" />
```

**Icon in RTL Context (see RTL Notes below):**
```tsx
<TrendingUp className="w-6 h-6 transform scale-x-[-1]" />