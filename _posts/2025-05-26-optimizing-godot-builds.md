---
layout: post
author: pazalla
title:  "Optimizing Godot Builds for WebGL"
categories: [ WebGL, Godot, Submission, Release, Store, Management, Guidelines ]
image: assets/images/posts/2025-05-26.png
---

# **Introduction**  
When developing games with **Godot**, optimizing build size is crucial—especially for **web and mobile** platforms where every kilobyte counts. By compiling a **custom Godot build**, you can remove unnecessary modules, reducing the final executable size and improving performance.  

This guide will cover the **complete process**, from **cloning the Godot source code**, configuring a **custom.py** file, and **compiling an optimized template** with **SCons**.  

## **Why use Custom Templates?**

✅ **Smaller builds** = Faster downloads  
✅ **Only includes needed features** = Less overhead  
✅ **Better performance** = Optimized for your game 

---

# **Step 1: Installing SCons**  
**SCons** is a **Python-based build system** used by Godot to compile its engine from source. Unlike traditional **Makefiles**, SCons offers:

🔹 **Cross-platform compatibility**  
🔹 **Dependency tracking**  
🔹 **Automated configuration**  

Begin by installing [Python 3.10](https://www.python.org/about/gettingstarted/) or a later version to guarantee successful package installation via pip.

**Open PowerShell** and check that pip is correctly installed:
```
PS C:\Windows\system32> pip --version
pip 24.2 from C:\Install\Python\Python310\lib\site-packages\pip (python 3.10) 👍
```
To install SCons, continue in PowerShell and run:
```powershell
PS C:\Windows\system32> pip install scons
```
Finally, check that SCons is correctly installed:
```
PS C:\Windows\system32> scons --version
SCons by Steven Knight et al.:
        SCons: v4.9.0.99a8c86de1ce91d23b102520e185c54ebd968924, Sun, 02 Mar 2025 14:04:50 -0700, by bdbaddog on M1Dog2021
        SCons path: ['C:\\Install\\Python\\Python310\\lib\\site-packages\\SCons']
Copyright (c) 2001 - 2025 The SCons Foundation 👍
```

---

# **Step 2: Cloning Godot Repository**  
To clone a repository from GitHub, the first thing you need to have installed is Git.
 * **RECOMMENDED**: GitHub offers a friendly option with [GitHub Desktop](https://desktop.github.com), which includes Git and simplifies the process.
 * Alternatively, you can install [Git directly](https://git-scm.com/downloads) from the official site.
 
You can check if Git is correctly installed by running:
```
PS C:\Windows\system32> git --version
git version 2.43.0.windows.1 👍
```
Next, let’s clone the Godot repository from GitHub:
```powershell
PS [...]> git clone https://github.com/godotengine/godot.git
PS [...]> cd godot
```

You're now inside the **Godot project folder** and ready to compile the engine.
After cloning the repository, list the available tags to identify the **version used by the Godot Editor you're using to develop your game**.
Then, check out that specific tag into a new branch:

```
PS [...]\godot> git tag -l
...
4.1.3-stable
4.1.4-stable
4.2-stable
4.2.1-stable
4.2.2-stable
4.3-stable
4.4-stable 👈
...
(END)
PS [...]\godot> git checkout tags/4.4-stable -b 4.4-stable-custom 
```
_For example, in my case, I’m developing my game with Godot 4.4 stable, so I check out the 4.4-stable tag_

**IMPORTANT**: After this step, Now, make sure your console is in the root folder of the cloned Godot repository.

---

# **Step 3: Creating a custom.py for Build Optimization**  
To remove unnecessary modules and optimize the build size, create a **custom.py** file in cloned godot root folder.  

## Example custom.py file:  
```python
debug_symbols = "no"
module_mobile_vr_enabled = "no"
module_multiplayer_enabled = "no"
module_openxr_enabled = "no"
module_webxr_enabled = "no"
```

## What does this do?  
🔹 **Disables debug symbols** (reduces file size)  
🔹 **Removes unused modules** (e.g., XR, networking)  

## Tips for setting up custom.py

**TIP 1**: You can generate a custom.py file using the following tool:

👉 [https://godot-build-options-generator.github.io/](https://godot-build-options-generator.github.io/)

**TIP 2**: Alternatively, you can list all available SCons parameters using this command:
```
PS [...]\godot> scons platform=web target=template_release verbose=1 --help
scons: Reading SConscript files ...
...
scons: done reading SConscript files.

platform: Target platform (web|windows)
    default:
    actual: web
    aliases: ['p']

target: Compilation target (editor|template_release|template_debug)
    default: editor
    actual: template_release
...
```
**⚠️ TIP 3**: Be careful when disabling modules — some have dependencies and can’t be removed freely.
To check a module’s dependencies, look inside the modules folder. Each module has a **config.py** file where you’ll find a line like:
```python
env.module_add_dependencies("MODULE_NAME", ["DEPENDENCIES"])
```
This tells you which other modules it depends on.

---

# **Step 4: Compiling a Custom Template**  
With your configuration set, it's time to build the engine.

## Clean previous builds:  
```
PS [...]\godot> scons platform=web target=template_release verbose=1 --clean
```

## Compile the new template:  
```
PS [...]\godot> scons platform=web target=template_release verbose=1
```

This generates a **lighter, optimized template** for **WebGL** inside bin folder. Replace `platform=web` with `linux`, `windows`, or `android` as needed.

**TIP**: Install [Binaryen]() to perform additional optimizations once your custom template has been generated.
```
PS [...]\godot\bin> wasm-opt godot.web.template_release.wasm32.nothreads.wasm -o godot.web.template_release.wasm32.nothreads.opt.wasm -all --post-emscripten -Oz
```

---

# **Step 5: Replacing Default Templates in Godot Editor**  
After compiling your custom template_release, open your Godot Editor where you are developing your game and replace downloaded **default templates** in **Editor Settings → Export Templates** to use the **customized build** we have created with SCons.  

![Image]({{site.baseurl}}/assets/images/posts/2025-05-26_01.png) 

---

# **Conclusion**  

By exporting your Godot game with **custom templates**, you can remove unnecessary features and reduce the build size, making your game **leaner and more efficient**. This is especially beneficial for **web, mobile, and console** games where size and performance are critical.

## **Recommended Read**  
I also recommend this well-detailed article with more in-depth information on the topic:

👉 [How to Minify Godot’s Build Size](https://popcar.bearblog.dev/how-to-minify-godots-build-size/)

It covers additional techniques, including using Brotli for web builds.