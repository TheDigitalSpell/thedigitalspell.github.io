---
layout: post
author: pazalla
title:  "Setting Up an Android Emulator for APK Testing Using Command-Line Tools"
categories: [ Testing, QA, Tools, Mobile, Android, Guidelines ]
image: assets/images/posts/2025-06-15.png
---

When developing mobile games, testing on real devices can slow down your workflow. One key advantage of using command-line tools is that you avoid relying on Android Studio, which is often unnecessary for many game engines. By working directly from the terminal, you reduce overhead and gain greater control over your environment.

This guide explains how to set up your own Android SDK using official tools from Google, create a virtual device, and install APKs efficiently—streamlining testing and debugging without the need for a physical device.

# Downloading Android Command-Line Tools

First, download the **command-line tools** package from the [official Android documentation](https://developer.android.com/tools/sdkmanager). This provides a lightweight, version-independent SDK environment, separate from any specific game engine. By keeping this SDK decoupled from game engines, you can maintain consistent builds across projects.

Once downloaded, extract the package and place it in a convenient location (e.g., `C:\android_sdk`). This folder becomes your dedicated SDK directory. Follow the instructions in the [official Android documentation](https://developer.android.com/tools/sdkmanager) to complete the installation.

Set these environment variables in your system settings:

```python
ANDROID_SDK_ROOT = C:\android_sdk
%ANDROID_SDK_ROOT%\cmdline-tools\latest\bin
%ANDROID_SDK_ROOT%\platform-tools
%ANDROID_SDK_ROOT%\emulator
```

# Installing System Images

Open a terminal or PowerShell with administrative permissions. Use `sdkmanager` to install the desired system images:

```shell
sdkmanager --install "system-images;android-30;google_apis;x86_64"
```

Repeat this step for any additional API levels you wish to test, such as Android 9.0 (API 28) or Android 11 (API 30).

# Creating a Virtual Device

Use `avdmanager` to create an emulator based on the system images you downloaded:

```shell
avdmanager create avd --name "pixel_11_API_30" --device "pixel" --package "system-images;android-30;google_apis;x86_64" --tag "google_apis" --abi "x86_64"
```

When prompted about creating a custom hardware profile, choose "no" to use the default.

# Launching the Emulator

Navigate to the emulator directory:

```shell
cd %ANDROID_SDK_ROOT%\emulator
```

Launch the virtual device with the parameters we choose:

```shell
emulator.exe -avd pixel_11_API_30 -no-boot-anim -netdelay none -no-snapshot -wipe-data -skin 1080x1920
```

If you have multiple devices or want to check existing virtual devices, use:

```shell
avdmanager list avd
```

If you encounter issues like "PANIC: Missing emulator engine program," ensure you launch the emulator from its actual directory using `.\emulator.exe`.

# Installing APKs via Command Line

Once your emulator is running, you can deploy your APK for testing. Navigate to the platform-tools directory:

```shell
cd %ANDROID_SDK_ROOT%\platform-tools
```

Run the following commands:

```shell
adb kill-server
adb start-server
adb devices -l
adb install -r <APK_NAME.apk>
```

The `-r` option ensures that the APK is reinstalled if it already exists on the emulator.

# Conclusion

By setting up a dedicated Android SDK and using command-line tools, game developers can efficiently test APKs in a controlled environment, accelerating the development and debugging process without relying on physical devices. This workflow is essential for maintaining productivity across different game projects.