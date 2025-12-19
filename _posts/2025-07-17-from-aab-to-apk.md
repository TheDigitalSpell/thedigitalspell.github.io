---
layout: post
author: pazalla
title:  "From AAB to APK"
categories: [ Testing, QA, Tools, Mobile, Android, Guidelines, Unity, Godot ]
image: assets/images/posts/2025-07-17.png
---

Before submitting your Android game to Google Play—whether for **internal testing** or **public release**—you might want to **install and test your build locally**. Google Play requires you to upload an `.aab` file, so that's what your game engine (Unity, Godot, etc.) will generate by default. But what if you need to test it locally before uploading?

Here’s a quick method to convert an AAB to a universal APK using Google’s **Bundletool**, allowing you to test your game on a real device without publishing it first.

## **Step 1: Download Bundletool**

Download the official Bundletool `.jar` file from:

👉 [https://developer.android.com/tools/bundletool](https://developer.android.com/tools/bundletool)

Place the file in a folder where you want to run the conversion.

## **Step 2: Generate Universal APK**

Open a command prompt (`CMD`) in the folder where `bundletool-all-x.x.x.jar` is located and run the following command (replace paths and passwords accordingly):

```shell
java -jar bundletool-all-x.x.x.jar build-apks \
  --bundle=/path/your/aab/your_app.aab \
  --output=/path/your/aab/your_app.apks \
  -ks=/path/your/keystore/your_ks.keystore \
  -ks-pass=pass:<KS_PSW> \
  -ks-key-alias=your_alias \
  -key-pass=pass:<SIGNING_KEY_PSW> \ # If this password is identical to the one for the keystore itself, you can omit this flag.
  --mode=universal
```

This command creates a **universal APK** that includes all required architectures and resources in one file.

## **Step 3: Extract the APK**

Once generated, rename the `app.apks` file to `app.zip` and extract its contents.

Inside, you’ll find `universal.apk`. This is the file you can install on your Android device using:

```shell
%ADB_PATH%\adb kill-server
%ADB_PATH%\adb start-server
%ADB_PATH%\adb devices -l
%ADB_PATH%\adb install -r universal.apk
```

## **Why Use This Method?**

**✔ Pros**

* Detect issues **before submission** to Google Play
* Ideal for **fast local testing**
* No need for **Play Console or test tracks**

**⚠ Cons**

* Universal APKs can be **larger in size** if your AAB includes multiple architectures (armv7, arm64, x86, etc.)

## **Conclusion**

Converting AAB to APK locally using Bundletool is a practical and fast method to validate your build. It’s especially helpful in early testing phases, internal QA, or last-minute checks before release.
