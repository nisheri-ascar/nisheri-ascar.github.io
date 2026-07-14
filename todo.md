taking notes here to keep myself sane

the idea is pretty simple, `base.html` is the foundation. inside it there's this certain lines

```html
<!-- Page content -->
<main id="main-content">
    {% block content % }{% endblock % }
</main>
```

anything that wants to derive or use `base.html`:

```html
{% extends "base.html % }
```

pretty simple eh?

### Making the index page use the same for consistency

the index page (`index.html`) is a page that everyone can see first once they land on this website. but we also want to have a consistent design with the blog portion right?!

            `section.html`

                ^
                |
the idea is `base.html` -> `index.html`
                |
                v
            `page.html`


right now, what you need to do is:
- [ ] figure out lines that separates headers to body
- [ ] cut that, then add zola's main content block.
- [ ] move the stuff you cut and paste it to index.html above
- [ ] add extension to it to `base.html`


I might want to add more pages.
