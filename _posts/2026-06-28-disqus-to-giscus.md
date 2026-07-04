---
layout: post
author: pazalla
title: "Migrating from Disqus to Giscus: A Privacy-First Comment System"
description: "Maximize your Jekyll blog's performance and respect reader privacy by migrating from Disqus to Giscus. This technical guide covers the complete workflow of leveraging GitHub Discussions for a seamless, fast, ad-free, and markdown-supported comment system."
categories: [ Migration, Github, Website ]
image: assets/images/posts/2026-06-28.png
---

If you have been running a static blog on GitHub Pages for a while, Disqus was likely your go-to choice for user engagement. It is incredibly easy to set up out of the box, but that convenience comes with a heavy technical and UX price: intrusive injected ads, privacy-tracking scripts, and a significant hit to your page loading speed (Time to Interactive).

As developers, we strive for clean code and optimized performance. That is why it is time to move away from legacy embed systems and adopt a more modern, privacy-first solution: **Giscus**.

Giscus is an open-source comment system powered entirely by the GitHub Discussions API. It is completely ad-free, lightning-fast, and fits perfectly into the GitHub Pages ecosystem. In this implementation guide, we will break down how to swap Disqus for Giscus without breaking your Jekyll layout.

# Prerequisites for Migration

Before touching the codebase, ensure your current setup meets the following criteria:

* A Jekyll-based website hosted on GitHub Pages.
* A public GitHub repository for your site's source code.
* The **GitHub Discussions** feature enabled on that specific repository.

# Step 1: Enable and Configure GitHub Discussions

Giscus does not use a proprietary database; it stores every comment thread natively as a "Discussion" in your repository. First, we need to initialize this feature.

1. Navigate to your repository on GitHub.
2. Go to **Settings > General**.
3. Scroll down to the **Features** section.
4. Check the **Discussions** box.

> **Pro Tip:** Create a specific category for your blog comments (e.g., "Comments") and set its format to *Announcement*. This prevents random users from creating "junk" threads directly in your repo; only the Giscus bot will have the permissions to initialize the official comment threads.

# Step 2: Install the Giscus App

Next, we need to authorize Giscus and generate the configuration script.

1. Add the **Giscus GitHub App** to your repository via the official GitHub marketplace.
2. On the Giscus setup page, enter your repository name (e.g., `YOUR_GIT_USER/YOUR_REPO_NAME.github.io`).
3. Choose **Page pathname** as the mapping method. This is the most robust structural option; comments will stay linked to your post's URL slug even if you change the title metadata later.
4. Select the "Comments" category you created in Step 1.
5. Choose a dynamic theme (we highly recommend `preferred_color_scheme` to automatically match the user's OS light/dark mode settings).
6. Giscus will generate a `<script>` block. Copy this payload.

# Step 3: Integrating Giscus into Your Jekyll Build

Instead of hardcoding scripts or just deleting old files, we want a clean integration that respects your Jekyll theme's architecture.

## 1. Create a New Include File

Navigate to your `_includes/` folder and create a new file named `giscus.html`. Paste your generated script inside a section tag to maintain your site's DOM spacing and CSS flow:

```html
<section class="comments-area">
    <div class="py-4">
        <script src="https://giscus.app/client.js"
                data-repo="YOUR_GIT_USER/YOUR_REPO_NAME.github.io"
                data-repo-id="YOUR_REPO_ID"
                data-category="Comments"
                data-category-id="YOUR_CATEGORY_ID"
                data-mapping="pathname"
                data-strict="0"
                data-reactions-enabled="1"
                data-emit-metadata="0"
                data-input-position="bottom"
                data-theme="preferred_color_scheme"
                data-lang="en"
                crossorigin="anonymous"
                async>
        </script>
    </div>
</section>

```

## 2. Update the Post Layout Node

Open `_layouts/post.html` (or wherever your theme renders comments) and locate the line of code responsible for injecting the legacy comment system.

Search for the Jekyll **Liquid include tag** that references the old `disqus.html` file. Simply delete that exact line and replace it with a new Liquid include tag that points to your newly created `giscus.html` file.

This ensures that the new system inherits the exact same placement within your DOM without messing up the surrounding layout containers.

# Summary

After committing and pushing these changes, your CI/CD pipeline will deploy a clean, GitHub-native comment section. The immediate technical and UX benefits include:

* **Zero Ads & Tracking:** No more third-party tracking cookies or "Promoted Stories" cluttering your content blocks.
* **Native Markdown Support:** Your readers can utilize code blocks, inline syntax highlighting, and rich text exactly as they would on GitHub.
* **Performance Optimization:** By eliminating the heavy Disqus embed payload, your Core Web Vitals (specifically Time to Interactive and Total Blocking Time) will improve significantly.

*Housekeeping Note: Do not forget to clean up your `_config.yml` file by deprecating and removing the `disqus: username` string. Keeping your configuration file lean is a best practice.*

Are you planning to migrate your static site to Giscus? Drop a comment below using the new system if you run into any build issues!

> *See you in the next digital spell!*