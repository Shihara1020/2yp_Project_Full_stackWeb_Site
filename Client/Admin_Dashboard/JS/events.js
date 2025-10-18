//-----------------------------------------------------------------------
//                       Render event table
//-----------------------------------------------------------------------
function updateEventsTable(sampleData) {
  const tableBody = document.querySelector("#eventsTable tbody");
  let html = "";

  if (sampleData.length > 0) {
    sampleData.forEach((event) => {
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
                        <button class="btn btn-primary btn-sm" onclick='openEventModal(${JSON.stringify(event)})'>
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteItem('${event._id}','events',updateEventsTable)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
    });
  } else {
    html = '<tr><td colspan="6" class="text-center">No events found.</td></tr>';
  }

  tableBody.innerHTML = html;
}

function showEditEventModal(id, title, type, date, status, organizer) {
  document.getElementById("editEventId").value = id;
  document.getElementById("editEventTitle").value = title;
  document.getElementById("editEventType").value = type;
  document.getElementById("editEventDate").value = date.split("T")[0];
  document.getElementById("editEventStatus").value = status;
  document.getElementById("editEventOrganizer").value = organizer;

  openModal("editEventModal");
}


//--------------------------------------
//    Open Add/Edit Event Modal
//--------------------------------------
function openEventModal(event = null) {
  const modal = document.getElementById('eventModal');
  const title = document.getElementById('eventModalTitle');
  const submitBtn = document.getElementById('eventSubmitBtn');
  const form = document.getElementById('eventForm');

  if (event) {
    // Editing existing event
    title.textContent = 'Edit Event';
    submitBtn.textContent = 'Save Changes';
    document.getElementById("eventId").value = event._id;
    document.getElementById("eventTitle").value = event.title;
    document.getElementById("eventDescription").value = event.description;
    document.getElementById("eventType").value = event.eventType;
    document.getElementById("eventStartDate").value = event.startDate.split('T')[0];;
    document.getElementById("eventEndDate").value = event.endDate.split('T')[0];;
    document.getElementById("eventStartTime").value = event.startTime.split(" ")[0];
    document.getElementById("eventEndTime").value = event.endTime.split(" ")[0];
    document.getElementById("venue").value = event.location?.venue || "";
    document.getElementById("address").value = event.location?.address || "";
    document.getElementById("city").value = event.location?.city || "";
    document.getElementById("country").value = event.location?.country || "";
    document.getElementById("eventOrganizer").value = event.organizer || "";
  } else {
    // Adding a new event
    title.textContent = 'Add Event';
    submitBtn.textContent = 'Create Event';
    form.reset();
    document.getElementById('eventId').value = '';
  }

  modal.classList.add('active');
}



// Handle form submit
document.getElementById('eventForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const eventId=document.getElementById("eventId").value;
  const title = document.getElementById("eventTitle").value;
  const description = document.getElementById("eventDescription").value;
  const eventType = document.getElementById("eventType").value;
  const startDate = document.getElementById("eventStartDate").value;
  const endDate = document.getElementById("eventEndDate").value;
  const startTime = document.getElementById("eventStartTime").value;
  const endTime = document.getElementById("eventEndTime").value;
  const venue = document.getElementById("venue").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  const organizer = document.getElementById("eventOrganizer").value;

  const eventData={title,description,eventType,startDate,endDate,startDate,endDate,startTime,endTime, location: { venue, address, city, country },organizer,};

  if (eventId) {
    // Update existing user
    await editItem("events",eventId,eventData,"events",updateEventsTable,"eventModal");
  } else {
    // Create new user
    await createItem("events",eventData,updateEventsTable,"eventModal","events")
  }
});




