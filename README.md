# The Digital Spell - Website

A free, modern, clean & eye catchy Jekyll theme built for bloggers.

### Features

*   Built for Jekyll
*   Compatible with Github pages
*   Feed
*   Sitemap
*   SEO
*   Featured Posts
*   Index Pagination
*   Post Share
*   Post Categories
*   Prev/Next Link
*   Category Archives (this is not yet compatible with github pages though)
*   Jumbotron Categories
*   Integrations:
    *   Disqus Comments
    *   Google Analaytics
    *   Mailchimp Integration
    *   Formspree.io Contact
*   Design Features:
    *   Bootstrap v5
*   Layouts:
    *   Default
    *   Post
    *   Page
    *   Categories

### How to Use

If you aren’t familiar with Jekyll yet, you should know that it is a static site generator. It will transform your plain text into static websites and blogs. No more databases, slow loading websites, risk of being hacked…just your content. And not only that, with Jekyll you get free hosting with GitHub Pages! If you are a beginner we recommend you start with Jekyll’s Docs. Now if you know how to use Jekyll, let’s move on to using Affiliates template in Jekyll:

### Using Affiliates template with Jekyll

*   `git clone https://github.com/wowthemesnet/affiliates-jekyll-theme.git`
*   `cd affiliates-jekyll-theme`
*   `bundle install`
*   edit `_config.yml`. If your site is in root: `baseurl: ''`. Also, change your Google Analytics code, Disqus username, Authors, Mailchimp etc.
*   `bundle exec jekyll serve` or runLocalServer.bat

### Homepage

Homepage is located at `index.html`.
Navigate to `data/menus.yaml` to edit your top & footer menu.

### Newsletter

To replace your newsletter form or edit your Mailchimp ID, navigate to `_includes/newsletter`.

The sidebar is located: `_includes/sidebar`.

### Contact Form

Formspree is already integrated. Make sure to replace your e-mail address in `_config.yml` and then send a first message through your live website. You will receive a confirmation through e-mail to validate that e-mail address with domain.

### Stylesheet

Want to use SASS? Customize `assets/css/theme.scss` file.

For a simple quick CSS way of customising the stylesheet you can simply just use `assets/css/custom.css`.

### Content

**Start blogging by adding your .md files in `_posts`.**

**YAML front matter**

*   post featured - `featured:true`
*   post featured image - `image: assets/images/mypic.jpg`
*   page comments - `comments:true`
*   meta description (optional) - `description: "this is my meta description"`

_YAML Post Example_

```
---
layout: post
title:  "We all wait for summer"
author: john
categories: [ Jekyll, tutorial ]
image: assets/images/5.jpg
featured: true
---

```


_YAML Page Example_

```
---
layout: page
title: Affiliates Template for Jekyll
comments: true
---

```
