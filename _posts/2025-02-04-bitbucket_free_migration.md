---
layout: post
author: pazalla
title:  "How to Migrate from Bitbucket: A Guide for Free Users Affected by the 2025 Changes"
categories: [ Development, Git, Migration, Bitbucket, GitHub ]
image: assets/images/posts/2025-02-04.png
---

# **Introduction**  
Bitbucket has announced major changes to its **Free plan**, effective **April 28, 2025**. These updates significantly limit **storage, user access, and key features** for free-tier users. If your workspace exceeds the new limits, you’ll need to either **upgrade to a paid plan** or **migrate to an alternative platform** like GitHub.

# **What’s Changing in Bitbucket’s Free Plan?**  
According to an official email from Atlassian, here are the biggest changes affecting **Bitbucket Free** users:  

- **Storage Limit:** Free workspaces will be restricted to **1 GB total** across all repositories.  
- **Snippets & Downloads Removed:** These features will no longer be available.  
- **Pipelines Log Retention:** CI/CD logs will be deleted **after 90 days**.  
- **Inactive Repository Archival:** Any repository **inactive for 3+ months** may be archived.  
- **Workspace Read-Only Mode:** If you exceed limits, your workspace will be locked until you upgrade or reduce storage.  

If you rely on **Bitbucket Free**, these limitations may impact your workflow—especially for teams working with large repositories, pipelines, or frequent automation.  

---

# **GitHub vs. Bitbucket Free**  

If you're considering a move to **GitHub**, here’s a side-by-side comparison of their **Free plans for private repositories**:  

| Feature              | **Bitbucket Free (After April 28, 2025)** | **GitHub Free** |
|----------------------|---------------------------------|----------------|
| **Private Repositories** | ✅ Unlimited | ✅ Unlimited |
| **Storage Limit** | **1 GB total per workspace** | **5 GB total for Git LFS** |
| **CI/CD (Pipelines/Actions)** | ✅ Bitbucket Pipelines (limited minutes) | ✅ GitHub Actions (2,000 minutes/month) |
| **Pipelines Log Retention** | **90 days** | **Unlimited** |
| **Snippets** | ❌ Removed | ✅ Available (Gists) |
| **Downloads Feature** | ❌ Removed | ✅ Available (Releases) |
| **Inactive Repositories** | May be **archived after 3 months** | **No automatic archiving** |
| **Max Contributors** | **5 users per workspace** | **Unlimited users** |
| **Issue Tracking** | ✅ Yes | ✅ Yes (GitHub Issues) |
| **Wikis** | ✅ Yes | ✅ Yes |

---

# **Step-by-Step Guide: Migrating from Bitbucket to GitHub**  

If you’ve decided to **migrate from Bitbucket to GitHub**, follow these steps to transfer your repositories **without losing branches, commits, or history**.

## **1. Create a New Repository on GitHub**  
1. Sign in to [GitHub](https://github.com/) and create a new repository.  
2. Do **not** initialize it with a README, `.gitignore`, or license.  
3. Copy the GitHub repository URL.  

## **2. Clone Your Bitbucket Repository Locally**  
To preserve **all branches, commits, and tags**, use the `--mirror` option:  

```shell
git clone --mirror https://bitbucket.org/your-username/repository.git
```

This downloads the entire repository, including remote-tracking branches and metadata.  

## **3. Push the Repository to GitHub**  
Change to the cloned repository directory:  

```shell
cd repository.git
```

Then, update the remote URL to GitHub and push all data:  

```shell
git remote set-url --push origin https://github.com/your-username/repository.git
git push --mirror
```

This transfers **everything**—branches, commits, and tags—to GitHub.  

## **4. Verify the Migration**  
- Check your repository on GitHub to confirm all branches and history are intact.  
- Update local clones to point to GitHub instead of Bitbucket:  

```shell
git remote set-url origin https://github.com/your-username/repository.git
```

## **5. (Optional) Migrate CI/CD Pipelines**  
If you used **Bitbucket Pipelines**, you’ll need to migrate to **GitHub Actions**.  

Create workflows in `.github/workflows/` using YAML configuration files. GitHub provides actions for **Docker, Node.js, Python, Java, and more** to automate builds and deployments.  

## **6. (Optional) Delete Your Bitbucket Repository**  
Once everything is successfully migrated and tested, you can delete your Bitbucket repository from **Settings → Repository Details → Delete Repository**.  

---

# **Conclusion**  

If you’re affected by the **Bitbucket Free plan limitations**, migrating to **GitHub Free** is a smart move. For individuals, open-source projects, and small teams, GitHub offers **a better long-term free option** with **fewer restrictions** and **more flexibility**.