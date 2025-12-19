---
layout: post
author: pazalla
title:  "Version Control for Code and Art in Games"
categories: [ Development, Guidelines, Management, Versioning ]
image: assets/images/posts/2024-12-18.png
---

Managing game projects requires a reliable version control system (VCS) to keep track of changes, collaborate with team members, and ensure everything remains organized. While versioning **code** is relatively straightforward, versioning **art assets** brings unique challenges due to large file sizes and frequent iterations. This post explores why version control is critical, how to handle **code and art projects**, and presents best practices to improve your development workflow.

## **Why Version Control Systems (VCS) Matter**

Version control systems help you:  

- **Track changes over time**: Whether it’s code or art, you can roll back to previous versions if something breaks.  
- **Collaborate effectively**: Teams can work on different features or assets simultaneously without overwriting work.  
- **Ensure stability**: VCS enables you to tag specific versions (e.g., releases or milestones) for better organization.  

Without a proper VCS, teams risk losing work, creating confusion, and mismanaging files—especially as game projects scale.

---

## **Versioning Code and Art: A Dual Strategy**

### **1. Code Versioning**  
For Unity or other game engines, Git is the most popular choice. It handles text-based files like scripts efficiently and allows features like branching, merging, and tagging.  

Example:  
- **Main Repository**: Unity game project, scripts, prefabs, and **final exported assets** (optimized `.png`, `.fbx`, etc.).  
- Use **Git LFS (Large File Storage)** to handle binary files when necessary.

---

### **2. Art Asset Versioning**  
Art assets, such as high-resolution textures, 3D models, and layered image files, pose challenges in standard version control tools like Git due to their large size. To manage art effectively:  

- **Keep Original Art Files Separate**: Use a **dedicated repository** for raw art files (e.g., `.psd`, `.kra`, `.blend`).  
- **Integrate Final Exports with Code**: Store only the **optimized/exported versions** in your main Git repository alongside game code.

---

## **Best Tools for Art Asset Versioning**

### **1. [Git with Git LFS](https://git-lfs.com/)** 
- **What It Does**: Git LFS tracks large binary files by storing them outside the core Git repository. It avoids performance issues while keeping your repo clean.  
- **Ideal For**: Small to medium projects where simplicity and Git workflows are sufficient.  

**Setup Example**:  
```shell
git lfs install  
git lfs track "*.psd" "*.fbx" "*.png"  
git add .gitattributes  
git commit -m "Track large files with Git LFS"  
```

---

### **2. [Perforce Helix Core](https://www.perforce.com/products/helix-core)**  
- **Why Use It**: Perforce is widely used in the gaming industry for managing large files and complex workflows. It’s fast, reliable, and integrates seamlessly with tools like **Unity** and **Unreal Engine**.  
- **Ideal For**: Medium to large projects with a high volume of assets.  

---

### **3. [Plastic SCM](https://www.plasticscm.com/)**  
- **Why Use It**: Plastic SCM offers excellent support for both code and large binary assets. Its intuitive UI supports artists’ workflows and integrates directly with Unity.  
- **Ideal For**: Teams needing robust version control for both code and art.  

---

### **4. Cloud Storage Alternatives**  
For very small teams or solo developers, cloud solutions like **Google Drive** or **Dropbox** can work for manual versioning. While not ideal for collaborative projects, they’re simple to set up and use.  

---

## **Art and Code Workflow: Best Practices**

### **1. Dual Repositories**  
- **Game Project Repository**: Store Unity files, scripts, and final **optimized assets**. If necessary use Git with LFS for binary files.  
- **Art Repository**: Store original art project files (e.g., `.psd`, `.blend`, `.kra`) in a **separate repository**. Use a VCS optimized for large files like **Perforce** or **Plastic SCM**.

---

### **2. Align Versions Between Art and Code**  
To maintain consistency:  
- **Tag Versions**: Use version tags like `v1.0.1_art` for art assets and `v1.0.1_code` for code.  
- **Git Commit Codes**: When exporting optimized assets, include the **commit code** or version tag of the art repository to ensure traceability.

In my workflow, I often add the Git commit code to mark when a finalized beta art version was added. This ensures seamless synchronization between art updates and game code changes.

---

### **3. Optimize Exported Assets**  
Artists should ensure that the **final assets** committed to the game project are optimized for performance. This includes:  
- Converting files to efficient formats (e.g., `.png` for textures, `.fbx` for 3D models).  
- Ensuring exported assets respect the project’s file size limits.  

---

### **4. Regular Syncing and Integration**  
- Artists finalize assets in their repository and **export optimized versions** to the game repository.  
- Developers pull the latest assets and integrate them into the game engine.  

By separating art projects and game code, teams improve performance, reduce repository size, and avoid accidental overwrites.

---

## **Conclusion**  
Effectively managing version control for both **code and art assets** is essential for any game development project. While Git remains the standard for code, tools like **Perforce** and **Plastic SCM** offer tailored solutions for versioning large art files.  

A dual-repository approach allows artists and developers to collaborate seamlessly without impacting performance. Whether you're a solo developer or part of a large team, adopting the right tools and workflows ensures your project remains organized, efficient, and scalable.

Use **Git with LFS** for small to medium projects, or consider **Perforce** and **Plastic SCM** for large-scale art asset management. Keep art and code in sync with clear versioning strategies to deliver polished, consistent results.