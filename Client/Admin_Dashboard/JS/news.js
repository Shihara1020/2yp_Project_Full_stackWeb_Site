// News functions
function updateNewsTable(sampleData) {
  const tableBody = document.querySelector("#newsTable tbody");
  let html = "";

  if (sampleData.length > 0) {
    sampleData.forEach((news) => {
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
                          <button class="btn btn-primary btn-sm" onclick='openNewsModal(${JSON.stringify(news).replace(/'/g, "&apos;")})'>
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onClick="deleteItem('${news._id}','news',updateNewsTable)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
    });
  } else {
    html = '<tr><td colspan="6" class="text-center">No news found.</td></tr>';
  }

  tableBody.innerHTML = html;
}


//--------------------------------------
//     Open modal for Add/Edit user
//--------------------------------------
function openNewsModal(news = null) {
  console.log('call');
  const modal = document.getElementById("newsModal");
  const title = document.getElementById("newsModalTitle");
  const form = document.getElementById("newsForm");
  const submitBtn = document.getElementById("newsSubmitBtn");

  if (news) {
    //Edit mode
    title.textContent = "Edit News";
    submitBtn.textContent = "Save Changes";

    document.getElementById("newsId").value = news._id;
    document.getElementById("newsTitle").value = news.title;
    document.getElementById("newsSummary").value = news.summary;
    document.getElementById("newsContent").value = news.content;
    document.getElementById("newsAuthor").value = news.author;
    document.getElementById("newsCategory").value = news.category;
  } else {
    //Add mode
    title.textContent = "Add News";
    submitBtn.textContent = "Add News";
    form.reset();
    document.getElementById("newsId").value = "";
  }

  modal.classList.add("active");
}


document.getElementById("newsForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const newsId = document.getElementById("newsId").value;
  const title = document.getElementById("newsTitle").value;
  const summary = document.getElementById("newsSummary").value;
  const content = document.getElementById("newsContent").value;
  const author = document.getElementById("newsAuthor").value;
  const category = document.getElementById("newsCategory").value;

  const newsData = { title, summary, content, author, category };

  if (newsId) {
    // Edit existing news
    await editItem("news",newsId,newsData,"news",updateNewsTable, "newsModal");
  } else {
    // Create new news
    await createItem("news",newsData,updateNewsTable, "newsModal","news");
  }
});

