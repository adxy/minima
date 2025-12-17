---
title: "Interacting with the button"
date: 2025-11-03 11:00:00
published: true
math: false
---

<style>
    .component-demo-wrapper {
        background: var(--bg-subtle);
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 4rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
    }

    .demo-button {
        border: 1px solid var(--border-color);
        padding: 0.4rem 1rem;
        border-radius: 1rem;
        margin: 0 auto;
        display: inline-block;
        color: var(--bg);
        background-color: var(--text) !important;
        transition: border 100ms ease-outal;
    }

    figure {
        padding: 0 1rem;
        text-align: center;
    }

    figcaption {
        margin-top: 0.5rem;
        font-size: 0.8rem;
        color: var(--subtle);
    }

    .btn-hover:hover {
        border: 1px solid var(--highlight);
    }
</style>

Button is one of the main components of almost every UI. It drives most of the call-to-actions on pretty much all UIs, but still it's sometimes a little under-looked.

Today, let's see some of the basics and advanced stuff you can take care of while the user interacts with the button to make the UX better & delightful.

## Basics

### 1. Cursor

Every button should have cursor "pointer". There's a reason why some unique cursors were added, to distinguish between the actions of different UI elements.

<div class="component-demo-wrapper">
    <figure>
        <button class="demo-button">Hover me</button>
        <figcaption>Bad, cursor not set to pointer.</figcaption>
    </figure>
    <figure>
        <button class="demo-button" style="cursor: pointer">Hover me</button>
        <figcaption>Good, cursor set to pointer.</figcaption>
    </figure>
</div>

### 2. Hover State

When your button is hovered, it should visually indicate that its being interacted with, this makes it easier for the user to figure out if their pointer is at the correct place, specially good for small buttons.

You can do it by changing border color, background color, shadows or scaling the button slightly up.

<div class="component-demo-wrapper">
    <figure>
        <button class="demo-button" style="cursor: pointer;">Hover me</button>
        <figcaption>Bad, no unique hover state</figcaption>
    </figure>
    <figure>
        <button class="demo-button btn-hover" style="cursor: pointer;">Hover me</button>
        <figcaption>Good, border updates on hover.</figcaption>
    </figure>
</div>
