// ------------------------------------------------------------------
//                          Render Contributors Table
// -------------------------------------------------------------------
function updateContributorsTable(contributors) {
  const tbody = document.querySelector("#contributorsTable tbody");
  let html = "";

  if (contributors.length > 0) {
    contributors.forEach((contributor) => {
      const statusBadge = contributor.isActive
        ? '<span> class="badge" style="background-color:success" >Active</span>'
        : '<span class="badge" class="background-color:secondary">Inactive</span>';

      html += `
              <tr>
                  <td>${contributor.name}</td>
                  <td>${contributor.email}</td>
                  <td>${contributor.position}</td>
                  <td>${contributor.department}</td>
                  <td>${statusBadge}</td>
                  <td>
                      <button class="btn btn-sm btn-outline-primary me-1" onclick="openContributorModal(${JSON.stringify(contributor).replace(/"/g, "&apos;")})">
                      <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" onclick="deleteItem('${contributor._id}','contributors',updateContributorsTable)">
                      <i class="fas fa-trash"></i>
                  </button>
                  </td>
                  `;
    });
  } else {
    html =
      '<tr><td colspan="6" class="text-center">No contributors found.</td></tr>';
  }

  tbody.innerHTML = html;
}



// -------------------------------------------------------------------
//                    Open Modal (Add/Edit)
// -------------------------------------------------------------------
function openContributorModal(contributor = null) {
  const modal = document.getElementById("contributorModal");
  const title = document.getElementById("contributorModalTitle");
  const form = document.getElementById("contributorForm");
  const submitBtn = document.getElementById("contributorSubmitBtn");

  if (contributor) {
    // Edit Mode
    title.textContent = "Edit Contributor";
    submitBtn.textContent = "Save Changes";

    document.getElementById("contributorId").value = contributor._id;
    document.getElementById("contributorName").value = contributor.name;
    document.getElementById("contributorEmail").value = contributor.email;
    document.getElementById("contributorPosition").value = contributor.position;
    document.getElementById("contributorDepartment").value = contributor.department;
    document.getElementById("contributorBio").value = contributor.bio || "";
    document.getElementById("contributorPhone").value = contributor.phone || "";
    document.getElementById("contributorLinkedIn").value = contributor.linkedIn || "";
    document.getElementById("contributorExpertise").value = contributor.expertise?.join(", ") || "";
    document.getElementById("contributorActive").checked = contributor.active || false;
  } else {
    // Add Mode
    title.textContent = "Add Contributor";
    submitBtn.textContent = "Add Contributor";
    form.reset();
    document.getElementById("contributorId").value = "";
  }

  modal.classList.add("active");
}

// -----------------------------------------------------------------------------------------
//                                    Handle Form Submit
// ------------------------------------------------------------------------------------------
document.getElementById("contributorForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const contributorId = document.getElementById("contributorId").value;
  const contributorData = {
    name: document.getElementById("contributorName").value,
    email: document.getElementById("contributorEmail").value,
    position: document.getElementById("contributorPosition").value,
    department: document.getElementById("contributorDepartment").value,
    bio: document.getElementById("contributorBio").value,
    phone: document.getElementById("contributorPhone").value,
    linkedIn: document.getElementById("contributorLinkedIn").value,
    expertise: document.getElementById("contributorExpertise").value.split(",").map(s => s.trim()),
    active: document.getElementById("contributorActive").checked
  };

  if (contributorId) {
    // Edit existing contributor
    await editItem("contributors",contributorId,contributorData,"contributors",updateContributorsTable, "contributorModal");
  } else {
    // Create new contributor
    await createItem("contributors", contributorData,updateContributorsTable,"contributorModal", "contributors");
  }
});
