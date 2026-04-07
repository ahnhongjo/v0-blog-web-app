---
title: "Building Accessible Web Applications"
date: "2024-11-20"
summary: "Learn how to create web applications that work for everyone with proper accessibility practices."
tags: ["accessibility", "web-development", "html", "design"]
thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop"
---

# Building Accessible Web Applications

Web accessibility (a11y) ensures that websites and applications can be used by everyone, including people with disabilities. Let's explore key practices for building accessible web apps.

## Why Accessibility Matters

- **Inclusion**: 15% of the world's population has some form of disability
- **Legal Requirements**: Many countries have accessibility laws
- **Better UX**: Accessible sites are often better for everyone
- **SEO Benefits**: Screen reader optimization improves SEO

## Semantic HTML

Use the right elements for the job:

```html
<!-- ❌ Bad -->
<div class="button" onclick="submit()">Submit</div>

<!-- ✅ Good -->
<button type="submit">Submit</button>
```

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```tsx
function InteractiveCard({ onClick, children }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
    >
      {children}
    </div>
  )
}
```

## ARIA Labels

Use ARIA when native semantics aren't enough:

```html
<!-- For icon-only buttons -->
<button aria-label="Close dialog">
  <XIcon />
</button>

<!-- For form inputs -->
<input
  type="search"
  aria-label="Search articles"
  placeholder="Search..."
/>
```

## Color Contrast

Ensure sufficient contrast ratios:

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

```css
/* ❌ Poor contrast */
.low-contrast {
  color: #999;
  background: #fff;
}

/* ✅ Good contrast */
.high-contrast {
  color: #595959;
  background: #fff;
}
```

## Focus Indicators

Never remove focus indicators without replacement:

```css
/* ❌ Bad */
button:focus {
  outline: none;
}

/* ✅ Good */
button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

## Screen Reader Text

Hide visually but keep for screen readers:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

```html
<button>
  <TrashIcon />
  <span class="sr-only">Delete item</span>
</button>
```

## Testing Accessibility

Tools and methods for testing:

1. **Keyboard Testing**: Navigate your site using only Tab, Enter, and Arrow keys
2. **Screen Readers**: Test with VoiceOver (Mac), NVDA (Windows)
3. **Browser DevTools**: Use the Accessibility panel
4. **Automated Tools**: Lighthouse, axe-core, WAVE

## Conclusion

Building accessible applications isn't just the right thing to do—it creates better experiences for all users. Start with semantic HTML, ensure keyboard navigation, and test regularly with assistive technologies.

> "The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect." - Tim Berners-Lee
