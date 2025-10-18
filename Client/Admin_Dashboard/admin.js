// // ********************
// //  API CONFIGURATION
// // ********************
// const API_BASE_URL="https://localhost:5000/api/v1";
// let authToken=localStorage.getItem('adminToken');

// // ********************
// //  DOM ELEMETNS
// // ********************
// const loginPage  = document.getElemenntById('loginPage');
// const adminPanel = document.getElementById('adminPanel');
// const loginForm  = document.getElementById('loginForm');
// const loginError = document.getElementById('loginError');
// const loadingSpinner = document.getElementById('loadingSpinner');

// // ******************************
// //  INITIALIZE THE APPLICATION
// // ******************************
// document.addEventListener('')

// Sample data for demonstration
const sampleData = {
  contributors: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "s.johnson@neuromphis.org",
      position: "Senior Researcher",
      department: "Neuroscience",
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "m.chen@neuromphis.org",
      position: "Research Director",
      department: "Research",
      status: "Active",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "e.rodriguez@neuromphis.org",
      position: "Clinical Specialist",
      department: "Clinical",
      status: "Inactive",
    },
  ],
  news: [
    {
      id: 1,
      title: "Breakthrough in Neural Imaging",
      author: "Dr. Sarah Johnson",
      category: "Research",
      status: "Published",
      date: "2023-10-15",
    },
    {
      id: 2,
      title: "Annual Research Symposium",
      author: "Dr. Michael Chen",
      category: "Events",
      status: "Draft",
      date: "2023-11-05",
    },
  ],
  events: [
    {
      id: 1,
      title: "Neuroscience Conference 2023",
      type: "Conference",
      startDate: "2023-12-10",
      status: "Upcoming",
      organizer: "Dr. Michael Chen",
    },
    {
      id: 2,
      title: "Research Methodology Workshop",
      type: "Workshop",
      startDate: "2023-11-20",
      status: "Upcoming",
      organizer: "Dr. Emily Rodriguez",
    },
  ],
  projects: [
    {
      id: 1,
      title: "AI-Based Diagnosis System",
      category: "Technology",
      status: "In Progress",
      progress: 65,
      teamLead: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      title: "Neuroplasticity Study",
      category: "Research",
      status: "Planning",
      progress: 20,
      teamLead: "Dr. Michael Chen",
    },
  ],
  users: [
    {
      id: 1,
      name: "Admin User",
      email: "admin@neuromphis.org",
      role: "Administrator",
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      name: "Research Manager",
      email: "manager@neuromphis.org",
      role: "Manager",
      createdAt: "2023-03-22",
    },
  ],
};




// ******************************************
//            DOM Elements
//**********************************************/
const loginPage = document.getElementById("loginPage");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const navLinks = document.querySelectorAll(".nav-link");
const contentSections = document.querySelectorAll(".content-section");
const pageTitle = document.getElementById("pageTitle");



//****************************************** */
//          Initialize the application
//******************************************** */
document.addEventListener("DOMContentLoaded", function () {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    showAdminPanel();
  }

  // Set up navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const section = this.getAttribute("data-section");

      // Update active nav link
      navLinks.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding section
      contentSections.forEach((section) => section.classList.remove("active"));
      document.getElementById(section).classList.add("active");

      // Update page title
      pageTitle.textContent = this.querySelector("span").textContent;

      // Load section data
      loadSectionData(section);
    });
  });

  // Set up login form
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple authentication (in a real app, this would be a server call)
    if (email === "admin@neuromphis.org" && password === 1234) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminName", "Admin User");
      showAdminPanel();
    } else {
      showLoginError("Invalid email or password");
    }
  });

  // Load initial dashboard data
  if (isLoggedIn) {
    loadSectionData("dashboard");
  }
});



//************************************************** */
//              Basic Functions 
//************************************************** */


// Show admin panel and hide login
function showAdminPanel() {
  loginPage.style.display = "none";
  adminPanel.style.display = "flex";
  document.getElementById("adminName").textContent =
    localStorage.getItem("adminName") || "Admin";
}

// Show login error
function showLoginError(message) {
  loginError.textContent = message;
  loginError.style.display = "block";
}

// Logout function
function logout() {
  localStorage.removeItem("isLoggedIn");
  loginPage.style.display = "flex";
  adminPanel.style.display = "none";
  loginForm.reset();
  loginError.style.display = "none";
}




//************************************************** */
//      Load data for a specific section
//************************************************** */

function loadSectionData(section) {
  switch (section) {
    case "dashboard":
      loadDashboardData();
      break;
    case "contributors":
      loadContributorsData();
      break;
    case "news":
      loadNewsData();
      break;
    case "events":
      loadEventsData();
      break;
    case "projects":
      loadProjectsData();
      break;
    case "users":
      loadUsersData();
      break;
  }
}



//************************************************** */
//          Functions for load the data
//************************************************** */

//************************************************** */
// Load dashboard data
function loadDashboardData() {
  
  // Update Count
  document.getElementById("totalContributors").textContent =sampleData.contributors.length;
  document.getElementById("totalNews").textContent = sampleData.news.length;
  document.getElementById("totalEvents").textContent = sampleData.events.length;
  document.getElementById("totalProjects").textContent =sampleData.projects.length;





  // Load recent activities
  const activities = [
    "Dr. Sarah Johnson updated project 'AI-Based Diagnosis System'",
    "New contributor 'Dr. Emily Rodriguez' added",
    "Research paper 'Neural Pathways in Learning' published",
    "Upcoming event 'Neuroscience Conference 2023' scheduled",
  ];


  let activitiesHTML = '<ul style="list-style: none; padding: 0;">';
  activities.forEach((activity) => {
    activitiesHTML += `<li style="padding: 8px 0; border-bottom: 1px solid var(--gray-light);">
                    <i class="fas fa-circle" style="color: var(--primary); font-size: 0.5rem; margin-right: 10px;"></i>
                    ${activity}
                </li>`;
  });
  activitiesHTML += "</ul>";

  document.getElementById("recentActivities").innerHTML = activitiesHTML;







  // Load upcoming events
  let eventsHTML = '<ul style="list-style: none; padding: 0;">';
  sampleData.events.forEach((event) => {
    eventsHTML += `<li style="padding: 10px 0; border-bottom: 1px solid var(--gray-light);">
                    <div style="font-weight: 500;">${event.title}</div>
                    <div style="font-size: 0.8rem; color: var(--gray);">${event.startDate} • ${event.organizer}</div>
                </li>`;
  });
  eventsHTML += "</ul>";
  document.getElementById("upcomingEvents").innerHTML = eventsHTML;
}



//*************************************************************************** */
// Load contributors data
function loadContributorsData() {
  const tableBody = document.querySelector("#contributorsTable tbody");
  let html = "";

  sampleData.contributors.forEach((contributor) => {
    const statusClass =
      contributor.status === "Active" ? "badge-success" : "badge-danger";
    html += `
                <tr>
                    <td>${contributor.name}</td>
                    <td>${contributor.email}</td>
                    <td>${contributor.position}</td>
                    <td>${contributor.department}</td>
                    <td><span class="badge ${statusClass}">${contributor.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm" onclick="editContributor(${contributor.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteContributor(${contributor.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
  });

  tableBody.innerHTML = html;
}



//****************************************************************************************************** */
// Load news data
function loadNewsData() {
  const tableBody = document.querySelector("#newsTable tbody");
  let html = "";

  sampleData.news.forEach((news) => {
    const statusClass =
      news.status === "Published" ? "badge-success" : "badge-warning";
    html += `
                <tr>
                    <td>${news.title}</td>
                    <td>${news.author}</td>
                    <td>${news.category}</td>
                    <td><span class="badge ${statusClass}">${news.status}</span></td>
                    <td>${news.date}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
  });

  tableBody.innerHTML = html;
}



//*************************************************************************************** */
// Load events data
function loadEventsData() {
  const tableBody = document.querySelector("#eventsTable tbody");
  let html = "";

  sampleData.events.forEach((event) => {
    const statusClass =
      event.status === "Upcoming" ? "badge-info" : "badge-warning";
    html += `
                <tr>
                    <td>${event.title}</td>
                    <td>${event.type}</td>
                    <td>${event.startDate}</td>
                    <td><span class="badge ${statusClass}">${event.status}</span></td>
                    <td>${event.organizer}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
  });

  tableBody.innerHTML = html;
}



//*************************************************************************************************************** */
// Load projects data
function loadProjectsData() {
  const tableBody = document.querySelector("#projectsTable tbody");
  let html = "";

  sampleData.projects.forEach((project) => {
    const statusClass =
      project.status === "In Progress" ? "badge-success" : "badge-warning";
    html += `
                <tr>
                    <td>${project.title}</td>
                    <td>${project.category}</td>
                    <td><span class="badge ${statusClass}">${project.status}</span></td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div class="progress" style="flex: 1;">
                                <div class="progress-bar" style="width: ${project.progress}%"></div>
                            </div>
                            <span>${project.progress}%</span>
                        </div>
                    </td>
                    <td>${project.teamLead}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
  });

  tableBody.innerHTML = html;
}




//***************************************************************************************** */
// Load users data
function loadUsersData() {
  const tableBody = document.querySelector("#usersTable tbody");
  let html = "";

  sampleData.users.forEach((user) => {
    html += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${user.createdAt}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
  });

  tableBody.innerHTML = html;
}



//********************************************************************************************* */
// Modal functions
function showModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

function showAddContributorModal() {
  showModal("editContributorModal");
  document.querySelector("#editContributorModal .modal-header h3").textContent =
    "Add Contributor";
  document.getElementById("editContributorForm").reset();
}

function editContributor(id) {
  const contributor = sampleData.contributors.find((c) => c.id === id);
  if (contributor) {
    document.getElementById("editContributorId").value = contributor.id;
    document.getElementById("editContributorName").value = contributor.name;
    document.getElementById("editContributorEmail").value = contributor.email;
    document.getElementById("editContributorPosition").value =
      contributor.position;
    document.getElementById("editContributorDepartment").value =
      contributor.department;
    document.getElementById("editContributorActive").checked =
      contributor.status === "Active";

    showModal("editContributorModal");
    document.querySelector(
      "#editContributorModal .modal-header h3"
    ).textContent = "Edit Contributor";
  }
}

function deleteContributor(id) {
  if (confirm("Are you sure you want to delete this contributor?")) {
    // In a real app, this would be an API call
    alert(`Contributor with ID ${id} would be deleted in a real application.`);
  }
}

// Handle edit contributor form submission
document
  .getElementById("editContributorForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Contributor data would be saved in a real application.");
    closeModal("editContributorModal");
  });
