const Supabase = window.supabase.createClient(
  "https://wzsflsxaiehjwsrpzpkk.supabase.co",
  "sb_publishable_XRYGu9FydFzQ8xsCQb1dtg_lnF2XZu_"
);
////// PACKAGE CREATION//////////////////////////////
async function createPackage(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const tracking_number = formData.get("tracking_number");
  const status = formData.get("status");
  const current_location = formData.get("current_Location");
  const expected_delivery = formData.get("expected_delivery");
  const reciever = formData.get("reciever");
  const address = formData.get("address");
  const sender = formData.get("sender");
  const from = formData.get("from");
  const to = formData.get("to");
  const registered_date = formData.get("registered_date");
  const weight = formData.get("weight");
  const description = formData.get("description");
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");

  try {
    const { data, error } = await Supabase.from("parcel").insert([
      {
        tracking_number,
        status,
        current_location,
        expected_delivery,
        reciever,
        address,
        sender,
        from,
        to,
        registered_date,
        weight,
        description,
        latitude,
        longitude,
      },
    ]);
    if (error) {
      console.error("Error submitting form:", error.message);
    } else {
      event.target.reset();
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
// //////////////////// END OF PACKAGE CREATION//////////////////////////

// ///////////////////////////////////////////////////////////////////////////////////////// ////////////LOGIN FUNCTION///////////////////////////

function login() {
  const input = document.querySelector("input").value;
  if (input === "create" || input === "update" || input === "delete") {
    document.querySelector(".login-div").style.display = "none";
  }
  if (input === "create") {
    const parcel = (document.querySelector(".parcelform").style.display =
      "block");
    return;
  } else if (input === "update") {
    document.querySelector(".update-form").style.display = "block";
    return;
  } else if (input === "delete") {
    document.querySelector(".delete-form").style.display = "block";
  } else {
    alert("network erro");
  }
}

// //////////////// UPDATE FUNCTION //////////////////////////////////// 1. Initialize the Supabase Client
// Replace with your Supabase project URL and public anon key
// const SUPABASE_URL = "YOUR_SUPABASE_URL";
// const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Select the form and status message elements
const updateForm = document.getElementById("updateForm");

// 3. Add an event listener to the form for submission
updateForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get values from the form inputs
  const tracking_number = document.getElementById("tracking_number").value;
  const sender = document.getElementById("sender").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const status = document.getElementById("status").value;
  const current_location = document.getElementById("current_location").value;
  const reciever = document.getElementById("reciever").value;
  const address = document.getElementById("address").value;
  const registered_date = document.getElementById("registered_date").value;
  const expected_delivery = document.getElementById("expected_delivery").value;
  const weight = document.getElementById("weight").value;
  const description = document.getElementById("description").value;

  await updateRecord(
    tracking_number,
    sender,
    from,
    to,
    status,
    current_location,
    reciever,
    address,
    registered_date,
    expected_delivery,
    weight,
    description
  );
});

// 4. Create the asynchronous function to update data in Supabase
async function updateRecord(
  tracking_number,
  sender,
  from,
  to,
  status,
  current_location,
  reciever,
  address,
  registered_date,
  expected_delivery,
  weight,
  description
) {
  // The core Supabase update call
  const { data, error } = await Supabase.from("parcel") // The table name
    .update({
      sender: sender,
      from: from,
      to: to,
      status: status,
      current_location: current_location,
      reciever: reciever,
      address: address,
      registered_date: registered_date,
      expected_delivery: expected_delivery,
      weight: weight,
      description: description,
    }) // The object with updated values
    .eq("tracking_number", tracking_number); // The filter to target the specific row by its ID
  // You can add .select() here if you need the updated rows returned

  if (error) {
    console.error("Error updating record:", error.message);
  } else {
    console.log("Record updated successfully:", data);
    updateForm.reset();
  }
}
// ///////////////////////DELETE FUNCTION/////////////////////////////////

const deleteButton = document.getElementById("deleteBtn");

if (deleteButton) {
  deleteButton.addEventListener("click", async () => {
    const trackingNumber = document.getElementById("track-input").value;
    const { error } = await Supabase.from("parcel")
      .delete()
      .eq("tracking_number", trackingNumber);

    if (error) {
      console.error(error);
    } else {
      console.log("Deleted successfully.");
      trackingNumber = "";
    }
  });
}
