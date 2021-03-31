---
tags: 
    - tools
    - site-tools
title: Eleventy (11ty) Static Site Generator
---
# {{ title }}
This site is built using [Eleventy](https://www.11ty.dev/). I chose it 
because it uses javascript, which I want to learn better, and it takes
a minimalist approach, allowing me to start with a very simple site setup.

The main things to know:
- All input files are referred to as "templates" in the docs ...
- ... because by default they are processed by the ``liquid`` templating engine.

# Daily usage

Build the static site from sources, by default the output goes to _site.
```
npx @11ty/eleventy
```

To serve the project up locally, in a way that will automatically update as you modify the source files:
```
npx @11ty/eleventy --serve
```

TODO: The eleventy site suggests using npx instead of npm, haven't investigated why.

# Installation

You need Node.js. See (my notes)[nodejs] on installing it.

Install npm. 
```
npm install -g npm
```

If you're working on an existing eleventy project, clone it to a local repo and cd into it. Run ``npm install`` to install all the project's dependencies. You're done.

If you are setting up a new project, create a new repo, cd into it, and initialize it as a Node.js project:
```
npm init -y
```

Install Eleventy in this project, as a tool that's needed only for development (not production):
```
npm install --save-dev @11ty/eleventy
```

Add a .gitignore file. You can find templates online for Node.js projects. Or if you created the repo on GitHub, you can add a .gitignore file in GitHub's Web interface, and it will offer templates you can choose from. In any case, add a  line containing ``sites/`` to .gitignore so that eleventy's outputs don't get checked in. 

Now refer to the Daily usage section above.

# Publishing via GitHub pages

There are lots of articles on this topic, but here are important things that tended to be glossed over.

If you're using the ``peaceiris/actions-gh-pages`` package to deploy the built site from a GitHub Action, note that it
"deploys" the build results by checking the site into the gh-pages branch (by default). This is fine for a
site associated with a project, but can be surprising for a user or organization GitHub pages project, which
by default publishes the ``main`` branch. You can change the branch that is published in the repository's
settings. Change it to gh-pages.

Since you're not using Jekyll (the static site generator directly supported by GitHub), it may be a good idea to
add a ``.nojekyll`` flag file to your project. This prevents some behavior/activity that you don't need.

# References

- [Eleventy](https://www.11ty.dev/)
- [Eleventy Tutorial Level 1](https://www.zachleat.com/web/eleventy-tutorial-level-1/) and [Level 2](https://www.zachleat.com/web/eleventy-tutorial-level-2/): A gentle intro.
- [Eleventy Walkthrough](https://rphunt.github.io/eleventy-walkthrough/)
- [How to Deploy Eleventy to GitHub Pages With GitHub Actions](https://www.rockyourcode.com/how-to-deploy-eleventy-to-github-pages-with-github-actions/)
- [Build Eleventy Using GitHub Actions and GitHub Pages](https://avinash.com.np/2020/05/18/build-eleventy-using-github-actions-and-github-pages/)

