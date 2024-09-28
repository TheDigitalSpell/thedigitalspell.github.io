---
layout: post
author: pazalla
title:  "Best Practices for Version Naming in Mobile App Submissions"
categories: [ Mobile, Versioning, Submission, Release, Store, Management, Guidelines ]
image: assets/images/posts/2024-09-29.png
---
When submitting a new version of your app or game to a store like Google Play or the App Store, proper version naming isn't just a formality—it helps track progress, ensures clarity, and meets store guidelines. Using consistent versioning helps both developers and reviewers stay aligned during the approval process.

#### 1. Understanding Version Numbering

Version numbers are typically structured as **MAJOR.MINOR.PATCH** ([Semantic Versioning](https://semver.org/)), where each component serves a specific purpose:

- **Major Version**: Indicates big releases with significant updates, new features, or changes that may not be backward compatible (e.g., moving from 1.0.0 to 2.0.0).
  
- **Minor Version**: Smaller feature updates or improvements, usually backward compatible (e.g., 1.1.0).
  
- **Patch Version**: Bug fixes or minor tweaks that don’t change functionality (e.g., 1.1.1).

This numbering makes it clear to both the store and your users how substantial a release is.

#### 2. Store Requirements for Version Numbers

Both Google Play and the Apple App Store have specific requirements for version names:

- **Google Play**: Uses both a **version name** (visible to users) and a **version code** (an integer that’s incremented with every new release). Always ensure that the version code is higher than the previous submission, or the update will be rejected.
  
- **Apple App Store**: Apple requires a version number, typically in the **X.X.X** format. Each update must have a higher version number than the previous release.

Here's the updated **Section 3** with your personal case included and merged into the "Internal vs. External Versions" tip:

### 3. Tips for Effective Version Naming

- **Keep it Simple and Consistent**: Stick with the **MAJOR.MINOR.PATCH** format for clarity. For example, if you're fixing a bug, move from **1.0.0** to **1.0.1**.
  
- **Increment Correctly**: If you're submitting a small patch after a failed approval, make sure to increment the version number (e.g., from **1.0.1** to **1.0.2**), or the store will reject it.
  
- **Internal vs. External Versions**: Many developers use internal versions for testing or beta releases before submitting to stores. A common practice is to append something like **1.0.0-beta** or **1.0.0-rc1** (release candidate) to indicate a pre-release state.
  In my case, I usually append the **git commit hash** to the version during internal testing. For instance, I might use **1.0.0-beta-abc1234**, where "abc1234" is the short code of the relevant Git commit. This practice helps me trace exactly which code changes are tied to the version, making debugging and testing more efficient.
  Before submission to stores, always clean this up to a standard version format like **1.0.0** for clarity and compliance with store guidelines.

#### 4. Real-World Examples from Game Development

- **Major Release**: Launching a new season or expansion in your game, like moving from **2.0.0** to **3.0.0**.
  
- **Minor Updates**: Adding small features, like new characters or levels, might warrant a jump from **2.1.0** to **2.2.0**.
  
- **Patch Updates**: Fixing bugs, such as improving performance or fixing text errors, could go from **2.2.0** to **2.2.1**.

#### Conclusion

Clear version naming helps both developers and app store reviewers track updates and understand what’s new in each submission. By following a structured versioning system like **MAJOR.MINOR.PATCH** and adhering to store guidelines, you’ll ensure smoother submissions and fewer rejections.