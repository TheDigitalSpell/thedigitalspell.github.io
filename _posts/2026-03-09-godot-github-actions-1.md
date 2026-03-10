---
layout: post
author: pazalla
title:  "Automating Godot 4 Android Exports with GitHub Actions (Part 1)"
categories: [ DevOps, Git, GitHub, Android ]
image: assets/images/posts/2026-03-09.png
---

Setting up Continuous Integration and Deployment (CI/CD) for your game is a game-changer. It means you can push a tag to your repository, grab a coffee, and come back to a fully compiled Android App Bundle (`.aab`) ready for the Google Play Store.

However, if you've tried setting this up for **Godot 4.x** using GitHub Actions, you've probably hit a wall. Endless loading loops and missing resource errors are practically a rite of passage.

In this two-part series, we are going to build the ultimate, bulletproof GitHub Actions workflow to export your Godot 4 game to Android. Today, in **Part 1**, we will conquer the engine setup, dynamic templates, and the dreaded headless crash.

## Prerequisites

Before we dive into the YAML file, make sure your repository is ready:

1. **Android Build Template Folder:** Your Godot project must have the Android build template initialized. The `android/` folder must be present and committed to your repository, containing a single file called `.build_version`. *(Note: Our GitHub Action will automatically install the heavy `build/` folder later, keeping your repository lightweight!)*
2. **Export Preset Name:** We use a fixed preset name `"Android - Google Play"` in our `export_presets.cfg`. If you want to use a different one, keep reading to see where to change it in the workflow.

## Workflow

Create a new file in your repository at `.github/workflows/android_release.yml` and paste the following code.

*Note: This workflow triggers whenever you push a tag like `v1.0.0`.*

```yaml
name: Android - Google Play Release
on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  export-android:
    runs-on: ubuntu-latest
    steps:
      - name: Clone Repository
        uses: actions/checkout@v4

      - name: Load environment variables
        run: |
          cat .env >> $GITHUB_ENV
          echo ".env Loaded."

      - name: Install Godot and templates
        run: |
          echo "Downloading Godot: ${GODOT_VERSION}..."
          wget -q https://github.com/godotengine/godot/releases/download/${GODOT_VERSION}/Godot_v${GODOT_VERSION}_linux.x86_64.zip
          wget -q https://github.com/godotengine/godot/releases/download/${GODOT_VERSION}/Godot_v${GODOT_VERSION}_export_templates.tpz

          echo "Installing Godot Editor..."
          unzip -q Godot_v${GODOT_VERSION}_linux.x86_64.zip
          sudo mv Godot_v${GODOT_VERSION}_linux.x86_64 /usr/local/bin/godot
          sudo chmod +x /usr/local/bin/godot

          # Read the template version directly from the project for perfect synchronization
          TEMPLATE_FOLDER=$(cat android/.build_version | tr -d '\r\n')
          
          echo "Installing Godot Export Templates..."
          mkdir -p ~/.local/share/godot/export_templates/${TEMPLATE_FOLDER}
          unzip -q Godot_v${GODOT_VERSION}_export_templates.tpz
          mv templates/* ~/.local/share/godot/export_templates/${TEMPLATE_FOLDER}/

```

## Pre-heating step

If we asked Godot to export the project right now using a CLI command, it would crash instantly with an error like `[ext_resource] referenced non-existent resource`.

Why? Because by default, git ignores your `.godot/` cache folder. When the Ubuntu runner downloads your repo, the project is "raw". If you ask Godot to export it immediately, it tries to convert all your PNGs and WAVs into its internal formats *while* compiling the game, causing the engine to collapse.

The secret is the **"Pre-heating" Step**. Before exporting, we will force Godot to open the project, calmly import all assets, generate the `.godot/` cache, and close.

```bash
# We will add this command to our export step in Part 2!
godot --headless --editor --quit || true

```

## 🛑 Wait before you push!

**Don't trigger this workflow just yet.** As it stands, this YAML file is only half of the magic. We haven't added the final export commands or the crucial Android Keystore configuration. If you try to run this Action now, it won't generate your `.aab` file.

**Coming up in Part 2:** We have the engine ready and the cache generated. Next, we will tackle the hardest part: securely injecting your Base64 Android Keystore into GitHub Actions and automatically publishing the final `.aab` to your GitHub Releases page!