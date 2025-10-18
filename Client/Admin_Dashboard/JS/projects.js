// Projects functions
function updateProjectsTable(sampleData) {
  const tableBody = document.querySelector("#projectsTable tbody");
  let html = "";
  if (sampleData.length > 0) {
    sampleData.forEach((project) => {
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
                        <button class="btn btn-primary btn-sm" onClick="openProjectModal(${JSON.stringify(project).replace(/"/g, "&apos;")})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onClick="deleteItem('${project._id}','projects',updateProjectsTable)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
    });
  } else {
    html =
      '<tr><td colspan="6" class="text-center">No projects found.</td></tr>';
  }

  tableBody.innerHTML = html;
}


// -------------------------------------------------------------------
//                    Open Modal (Add/Edit Project)
// -------------------------------------------------------------------
async function openProjectModal(project = null) {
  const modal = document.getElementById("projectModal");
  const title = document.getElementById("projectModalTitle");
  const form = document.getElementById("projectForm");
  const submitBtn = document.getElementById("projectSubmitBtn");
  const teamLeadSelect = document.getElementById("projectTeamLead");

  // Load team leads before opening modal
  await loadContributorsForDropdown(teamLeadSelect);

  if (project) {
    // Edit Mode
    title.textContent = "Edit Project";
    submitBtn.textContent = "Save Changes";

    document.getElementById("projectId").value = project._id;
    document.getElementById("projectTitle").value = project.title;
    document.getElementById("projectDesc").value = project.description;
    document.getElementById("projectShortDesc").value = project.shortDescription;
    document.getElementById("projectCategory").value = project.category;
    document.getElementById("projectStatus").value = project.status;
    document.getElementById("projectPriority").value = project.priority;
    document.getElementById("projectStartDate").value = project.startDate ? project.startDate.split("T")[0] : "";
    document.getElementById("projectEndDate").value = project.endDate ? project.endDate.split("T")[0] : "";
    document.getElementById("projectBudget").value = project.budget?.amount || "";
    document.getElementById("projectFunding").value = project.fundingSource || "";
    document.getElementById("projectTeamLead").value = project.teamLead?._id || "";
    document.getElementById("projectTechnologies").value = project.technologies?.join(", ") || "";
    document.getElementById("projectPublic").checked = project.isPublic || false;
    document.getElementById("projectFeatured").checked = project.isFeatured || false;
    document.getElementById("projectProgress").value = project.progress || 0;
  } else {
    // Add Mode
    title.textContent = "Add Project";
    submitBtn.textContent = "Add Project";
    form.reset();
    document.getElementById("projectId").value = "";
  }

  modal.classList.add("active");
}

// -------------------------------------------------------------------
//                     Load Contributors (Team Leads)
// -------------------------------------------------------------------
async function loadContributorsForDropdown(selectElement) {
  try {
    // Clear existing options
    selectElement.innerHTML = '<option value="">Select Team Lead</option>';

    const res = await fetch(`${API_BASE_URL}/contributors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await res.json();

    if (data.success && Array.isArray(data.data)) {
      data.data.forEach((contributor) => {
        const option = document.createElement("option");
        option.value = contributor._id;
        option.textContent = `${contributor.name} (${contributor.department || "No Dept"})`;
        selectElement.appendChild(option);
      });
    } else {
      console.error("Failed to load contributors.");
    }
  } catch (error) {
    console.error("Error fetching contributors:", error);
  }
}

// -------------------------------------------------------------------
//                           Handle Form Submit
// -------------------------------------------------------------------
document.getElementById("projectForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const projectId = document.getElementById("projectId").value;

  const projectData = {
    title: document.getElementById("projectTitle").value,
    description: document.getElementById("projectDesc").value,
    shortDescription: document.getElementById("projectShortDesc").value,
    category: document.getElementById("projectCategory").value,
    status: document.getElementById("projectStatus").value,
    priority: document.getElementById("projectPriority").value,
    startDate: document.getElementById("projectStartDate").value,
    endDate: document.getElementById("projectEndDate").value || null,
    budget: {
      amount: parseFloat(document.getElementById("projectBudget").value) || 0,
    },
    fundingSource: document.getElementById("projectFunding").value,
    teamLead: document.getElementById("projectTeamLead").value,
    technologies: document.getElementById("projectTechnologies").value.split(",").map(s => s.trim()).filter(Boolean),
    isPublic: document.getElementById("projectPublic").checked,
    isFeatured: document.getElementById("projectFeatured").checked,
    progress: parseInt(document.getElementById("projectProgress").value) || 0
  };

  if (projectId) {
    // Edit existing project
    await editItem("projects", projectId, projectData, "projects", updateProjectsTable, "projectModal");
  } else {
    // Create new project
    await createItem("projects", projectData, updateProjectsTable, "projectModal", "projects");
  }
});
