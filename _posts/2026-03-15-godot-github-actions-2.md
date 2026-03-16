---
layout: post
author: pazalla
title:  "Automating Godot 4 Android Exports with GitHub Actions (II)"
categories: [ DevOps, Git, GitHub, Android ]
image: assets/images/posts/2026-03-15.png
---

In **[Part 1](/godot-github-actions-1/)** of this guide, we successfully set up Godot 4 in a GitHub Actions Ubuntu runner, matched our dynamic export templates, and learned how to "pre-heat" the `.godot/` cache to prevent headless crashes.

Now, it's time to face keystores and complete workflow. Passing security credentials safely through a CI/CD pipeline and publishing the final `.aab` file can be a nightmare of cryptic errors. Here is how to do it perfectly.

## Preparing your Release Keystore

GitHub Secrets can't store binary files directly. You need to convert your `.keystore` to a Base64 text string. Run this in your terminal:

```bash
base64 -w 0 your_android_release.keystore > keystore_b64.txt

```

Go to your GitHub repository settings (*Settings > Secrets and variables > Actions*) and add these three secrets:

* `ANDROID_GP_KEYSTORE_BASE64`: The contents of the text file.
* `ANDROID_GP_KEYSTORE_PASSWORD`: Your keystore password.
* `ANDROID_GP_KEYALIAS_NAME`: Your keystore alias.

## The Complete Workflow

Add the `permissions` block at the top of your job, and append these final steps to the YAML file we started in [Part 1](/godot-github-actions-1/):

```yaml
    # VITAL: Grants the action permission to upload the .aab to the Release page
    permissions:
      contents: write 

      # ... (Previous steps from Part 1) ...

      - name: Decode and Validate Keystore
        env:
          KEYSTORE_BASE64: ${% raw %}{{ secrets.ANDROID_GP_KEYSTORE_BASE64 }}{% endraw %}
          KEYSTORE_PASSWORD: ${% raw %}{{ secrets.ANDROID_GP_KEYSTORE_PASSWORD }}{% endraw %}
          KEYALIAS_NAME: ${% raw %}{{ secrets.ANDROID_GP_KEYALIAS_NAME }}{% endraw %}
        run: |
          mkdir -p ~/.android
          echo "$KEYSTORE_BASE64" | base64 --decode > ~/.android/google_play.keystore
          
          echo "Validating Keystore..."
          # Fail-fast: If the password or alias is wrong, the workflow stops here immediately.
          keytool -list -v -keystore ~/.android/google_play.keystore -alias "$KEYALIAS_NAME" -storepass "$KEYSTORE_PASSWORD" | grep "Alias name:"

      - name: Export Release
        env:
          # https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_android.html
          # IMPORTANT: Use an absolute path. YAML does not expand the '~' character!
          GODOT_ANDROID_KEYSTORE_RELEASE_PATH: /home/runner/.android/google_play.keystore
          GODOT_ANDROID_KEYSTORE_RELEASE_USER: ${% raw %}{{ secrets.ANDROID_GP_KEYALIAS_NAME }}{% endraw %}
          GODOT_ANDROID_KEYSTORE_RELEASE_PASSWORD: ${% raw %}{{ secrets.ANDROID_GP_KEYSTORE_PASSWORD }}{% endraw %}
        run: |
          # Pre-heating step
          echo "Generating asset cache (.godot/)..."
          godot --headless --editor --quit || true
          
          echo "Installing Android Build Template and compiling the game..."
          mkdir -p build/android
          godot --headless --verbose --install-android-build-template --export-release "Android - Google Play" "build/android/${% raw %}{{ github.event.repository.name }}{% endraw %}_${% raw %}{{ github.ref_name }}{% endraw %}.aab"

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: build/android/${% raw %}{{ github.event.repository.name }}{% endraw %}_${% raw %}{{ github.ref_name }}{% endraw %}.aab
          name: Android - Google Play ${% raw %}{{ github.ref_name }}{% endraw %}
          generate_release_notes: true

```

**1. The "Fail-Fast" Validation**
Debugging Godot export errors takes minutes. If you made a typo in your Keystore password, you won't know until the end. By adding the native Java `keytool` validation piped with `grep "Alias name:"`, we create a strict security guard. If your Base64 string is corrupted or the password is wrong, the workflow fails instantly, saving you time.

**2. The Tilde (`~`) Trap**
Godot 4 allows you to pass Keystore credentials using environment variables. However, if you assign `~/.android/google_play.keystore` to `GODOT_ANDROID_KEYSTORE_RELEASE_PATH`, it will fail.
**YAML does not expand the `~` shortcut like Bash does.** Godot will literally look for a folder named `~`, fail, and throw a *“Release keystore incorrectly configured”* error. You must always use the absolute path (`/home/runner/...`).

**3. Repository Permissions**
If you don't explicitly add `permissions: contents: write` at the top of your job, the final step will fail with a `Resource not accessible by integration` error, and your `.aab` will never be uploaded.

## Gist

<p><script src=""></script></p>
<div class="gist-wrapper">
  <div class="gist-author">
	<a href="https://gist.github.com/pazalla/a1cee942ad826e6d9778af890060756c" target="_blank" rel="noopener noreferrer">
		<img src="https://github.com/pazalla.png" width="30" style="border-radius: 50%;">
		<span><strong>@pazalla</strong></span>
	</a>
  </div>
  
  <script src="https://gist.github.com/pazalla/a1cee942ad826e6d9778af890060756c.js"></script>
</div>

## Conclusion

The next time you push a version tag, GitHub will spin up a machine, configure Godot, securely inject your credentials, compile the Gradle build, and attach a pristine `.aab` file right to your Releases page! No manual exports, just pure automation.

Furthermore, having this optimized workflow is vital to **maximize the free compilation time** provided by GitHub Actions. Currently, GitHub gives every free account **2,000 free minutes per month** for private repositories (if your project is open-source/public, it's completely unlimited!).

Since our Android export uses a Linux machine (`ubuntu-latest`), 1 real-time minute of compilation equals exactly 1 minute of your quota. With our guide, your `.aab` will build extremely fast, leaving you with plenty of minutes to spare.

### 🛑 **What about iOS? A quick warning**

If you plan to adapt this workflow for iOS in the future, you must use an Apple virtual machine (`macos-latest`). However, macOS runners on GitHub Actions have a **10x multiplier**. This means that 1 real minute of iOS compilation consumes 10 minutes of your free quota.

In other words, your 2,000 monthly minutes translate to just **200 real minutes** of iOS build time. This is exactly why optimizing your CI/CD pipeline and preventing endless headless crashes isn't just a convenience—it's a necessity to avoid burning through your monthly limit!