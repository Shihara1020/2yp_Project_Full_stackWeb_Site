---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: cepdnaclk/e21-CO227-PeraMorphiq
title: PeraMorphiq - Full-Stack Web Platform
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# PeraMorphiq - Full-Stack Web Platform

![Main Project Image](./images/main.png)

---

## Team
- E/21/087, D.M.E.S.DEWAGEDARA, [e21087@eng.pdn.ac.lk](mailto:e21087@eng.pdn.ac.lk)
- E/21/302, W.S.S.PERERA, [e21302@eng.pdn.ac.lk](mailto:e21302@eng.pdn.ac.lk)
- E/21/198, J.M.S.D.B.JAYASUNDARA, [e21198@eng.pdn.ac.lk](mailto:e21198@eng.pdn.ac.lk)
- E/21/353, Y.P.SANDEEP, [e21353@eng.pdn.ac.lk](mailto:e21353@eng.pdn.ac.lk)

## Supervisors
- Ms. Yasodha Vimukthi, [yasodhav@eng.pdn.ac.lk](mailto:yasodhav@eng.pdn.ac.lk)

## Table of Contents
1. [Introduction](#introduction)
2. [Solution & Impact](#solution--impact)
3. [Features & Architecture](#features--architecture)
4. [How to Run / Development Notes](#how-to-run--development-notes)
5. [Links](#links)

---

## Introduction

 Neuromorphic systems aim to mimic biological neural processing to achieve highly efficient, parallel, and event-driven computation. In many research settings, managing project artifacts (publications, datasets, code, project descriptions, team info) is fragmented and manual. This increases friction for collaborators, hinders reproducibility, and reduces the visibility of research outputs to the wider community.

 PeraMorphiq addresses this by providing a centralized, production-ready full-stack web platform to manage and showcase neuromorphic research projects, publications, news, and team members.

## Solution & Impact

- Centralized content management: researchers can add and update projects, publications, news, and blogs via an admin dashboard.
- Improved collaboration: contributor profiles, project pages and repository links make it easier for collaborators, students, and supervisors to find and contribute to work.
- Visibility & dissemination: polished project pages and consistent metadata improve discoverability for academic and industry audiences.
- Reproducibility: hosting code links and documented project metadata encourages reproducible research workflows.

This platform reduces manual overhead for research groups and helps accelerate dissemination of results from neuromorphic computing, swarm intelligence, and related bio-inspired technologies.

## Features & Architecture

- Backend: Node.js + Express.js RESTful API
- Database: MongoDB with Mongoose for flexible schemas
- Authentication: JWT-based multi-role authentication (Admin, Publisher, Student, Lecturer)
- Admin Dashboard: Full CRUD for Projects, News, Publications, Blogs, Contributors
- File handling: secure image and document uploads
- Frontend: Responsive HTML/CSS/JavaScript site with dynamic content loading
- Deployment: designed for cloud deployment (example: Railway)

### Selected Project Features
- Project pages with overview, objectives, technical approach, outcomes and contributor list
- Publications & news pages with rich content and images
- Search and filtering for projects and publications
- Repository links (GitHub) and downloadable artifacts


## How to Run / Development Notes

1. Clone repository: `git clone https://github.com/cepdnaclk/e21-CO227-PeraMorphiq.git`
2. Install dependencies (server): `npm install` in `Server/` folder
3. Create a `.env` file (see `config/config.env`) with `MONGO_URI`, `JWT_SECRET`, and other env vars
4. Seed sample data (optional): `node seeder -i` from the `Server/` folder
5. Start server: `npm start` (or `node server.js`) in the `Server/` folder
6. Open the client pages (Admin and public site) in a browser; API base URL is typically `http://localhost:8000/api/v1`

Notes:
- Use the admin dashboard to create projects and contributors; the public site loads data via the REST API.
- Ensure your MongoDB user has permis


## Links
- [Project Repository](https://github.com/cepdnaclk/e21-CO227-PeraMorphiq.git)
- [Main Website](https://peramorphiq.github.io/PeraMorphIQ-Web/)
- [Admin Panel](https://peramorphiq-admin.vercel.app)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

### Tags
`Web Development`, `Full-Stack`, `Node.js`, `MongoDB`, `Express.js`, `Research Platform`, `JWT Authentication`, `Admin Dashboard`

[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)