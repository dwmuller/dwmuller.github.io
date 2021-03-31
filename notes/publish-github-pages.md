---
tags: 
    - techniques
    - site-tools
title: How to Publish GitHub Pages Using Actions
---
# {{ title }}
There are lots of articles on this topic, but here are important things that tend to be omitted from other articles.

If you're using the ``peaceiris/actions-gh-pages`` package to deploy the built site from a GitHub Action, note that it
"deploys" the build results by checking the site into the gh-pages branch (by default). This is fine for a
site associated with a project, but can be surprising for a user or organization GitHub pages project, which
by default publishes the ``main`` branch. You can change the branch that is published in the repository's
settings. Change it to gh-pages.

Since you're not using Jekyll (the static site generator directly supported by GitHub), it may be a good idea to
add a ``.nojekyll`` flag file to your project. This prevents some behavior/activity that you don't need.

## References
- [How to Deploy Eleventy to GitHub Pages With GitHub Actions](https://www.rockyourcode.com/how-to-deploy-eleventy-to-github-pages-with-github-actions/)
- [Build Eleventy Using GitHub Actions and GitHub Pages](https://avinash.com.np/2020/05/18/build-eleventy-using-github-actions-and-github-pages/)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages): A node package to help publish SSG output in GitHub pages.
