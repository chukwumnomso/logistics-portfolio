// ////////////////// SCROLL TO TOP /////////////////////////////////////
const toTop = document.getElementById("to-top");

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
} else {
}
// //////////////////  DATE /////////////////////////////////////
const date = new Date();
const copyDate = document.getElementById("date");
if (copyDate) {
  copyDate.textContent = date.getFullYear();
}

// /////////////////////////////////////////////////////////////////////////
//  NAVAVIGATION LOGIC
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const outer = document.getElementById("outer");
if (outer) {
  outer.addEventListener("mouseover", () => {
    const inner = document.querySelector(".inner");
    inner.classList.add("drop-inner");
  });
} else {
}

const navLi = document.querySelectorAll(".nav-li").forEach((nli) => {
  nli.addEventListener("mouseover", () => {
    const inner = document
      .querySelector(".inner")
      .classList.remove("drop-inner");
  });
});

const navBtn = document.getElementById("nav-btn");
if (navBtn) {
  navBtn.addEventListener("click", () => {
    document.getElementById("in-nav").classList.toggle("open-nav");
  });
} else {
}

// //////////////////////////////////////////////////////////////////////
// END OF  NAVAVIGATIONLOGIC;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// SLIDING DIV LOGIC //////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const slideRight = document.querySelectorAll(".slideright");
  // Configuration for my the observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  // The function to run when an intersection occurs
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      // Check if the target element is intersecting with the viewport
      if (entry.isIntersecting) {
        // Add the visible class to make the div appear
        entry.target.classList.add("show");
        // Stop observing the div once it has appeared
        observer.unobserve(entry.target);
      }
    });
  };

  // I Created the Intersection Observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Start observing the target div
  slideRight.forEach((div) => {
    observer.observe(div);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slideLeft = document.querySelectorAll(".slideleft");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  slideLeft.forEach((div) => {
    observer.observe(div);
  });
});
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////END OF SLIDING DIV LOGIC //////////////////////////////

////////////////////////////////////////////////////////////////////////////
/////////////////////////// COUNTING LOGIG////////////////////////////////
//////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.textContent === "0") {
          animateCount(entry.target);
          observer.unobserve(entry.target); // to prevent multiple animations
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  const countElements = document.querySelectorAll(".count");
  countElements.forEach((element) => {
    observer.observe(element);
  });

  function animateCount(element) {
    const targetCount = parseInt(element.dataset.count);
    const speed = parseInt(element.dataset.speed) || 100; // Default speed is 100
    let currentCount = 0;
    const increment = targetCount / speed;

    function updateCount() {
      currentCount += increment;
      element.textContent = Math.ceil(currentCount);
      if (currentCount < targetCount) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = targetCount;
      }
    }

    updateCount();
  }
});

// ///////////////////////////////////////////////////END OF COUNTER//////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////START OF TRACKING//////////////////////////////////////

const supabase = window.supabase.createClient(
  "https://wzsflsxaiehjwsrpzpkk.supabase.co",
  "sb_publishable_XRYGu9FydFzQ8xsCQb1dtg_lnF2XZu_"
);

const trackingBtn = document.querySelector(".tracking-btn");
if (trackingBtn) {
  trackingBtn.addEventListener("click", async () => {
    try {
      const mapid = document.getElementById("mapid");
      const parcelData = document.getElementById("parcel-data");
      const track = document.querySelector(".track");
      const trackingNumber = document.getElementById("track-input").value;
      if (trackingNumber === 200496) {
        window.location.href = "http://127.0.0.1:5500/faq.html";
      }

      const { data: parcel, error } = await supabase
        .from("parcel")
        .select("*")
        .eq("tracking_number", trackingNumber)
        .single();

      if (error) throw error;

      if (parcel) {
        parcelData.style.display = "block";
        parcelData.innerHTML = `
        <h2><span>Tracking No:</span> ${parcel.tracking_number}</h2></br>
        <p><span>Sender:</span> ${parcel.sender}</p></br>
        <p><span>From:</span> ${parcel.from}</p></br>
        <p><span>To:</span> ${parcel.to}</p></br>
         <p><span>Status:</span> ${parcel.status}</p></br>
        <p><span>current_location:</span> ${parcel.current_location}</p></br>
        <p><span>Reciever:</span> ${parcel.reciever}</p></br>
         <p><span>Address:</span> ${parcel.address}</p></br>
        <p><span>registerd_Date:</span> ${parcel.registered_date}</p></br>
        <p><span>Expected_Delivery:</span> ${parcel.expected_delivery}</p></br>
        <p><span>package_Weight:</span> ${parcel.weight}</p></br>
        <p><span>decription:</span> ${parcel.description}</p></br>
        <div ><button class="clear">CLOSE</button></div>
      `;
        updateMarkerByTrackingId(trackingNumber);
        track.style.display = "none";
        const clearBtn = document.querySelector(".clear");
        clearBtn.addEventListener("click", () => {
          parcelData.style.display = "none";
          track.style.display = "block";
        });
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
} else {
}

// /////////////////////////// END OF FORM TRACKING////////////////////

// ///////////////// CONTACT FORM SUbMISSION //////////////////////////////

async function formSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const message = formData.get("message");
  try {
    const { data, error } = await supabase
      .from("form_submittion")
      .insert([{ first_name, last_name, phone, email, message }]);
    if (error) {
      console.error("Error submitting form:", error.message);
    } else {
      event.target.reset();
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// <form onSubmit={handleSubmit}> ... </form>

// ///////////// END OF CONTACT FORM SUbMISSION /////////////////////////

// //////////////////////// MAP INTERGRATION/////////////////////////////

const map = L.map("mapid").setView([0, 0], 1); //  default view

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// ---I Defined the marker variable outside the function so it persists ---
let trackingMarker = null;

/**
 * Fetches coordinates for a specific tracking number and moves the marker.
 * @param {string|number} trackingNumber The unique ID or tracking number to fetch.
 */

async function updateMarkerByTrackingId(trackingNumber) {
  //  Fetchong data for the specific tracking number
  const { data: parcel, error } = await supabase
    .from("parcel")
    .select("latitude, longitude,current_location,status")
    .eq("tracking_number", trackingNumber)
    .single();

  if (error) {
    console.error(
      `Error fetching data for ID ${trackingNumber}:`,
      error.message
    );
    alert(`Location data not found for tracking number ${trackingNumber}.`);
    return;
  }

  if (
    parcel &&
    typeof parcel.latitude === "number" &&
    typeof parcel.longitude === "number"
  ) {
    const newLatLng = [parcel.latitude, parcel.longitude];
    const parcelLocation = parcel.current_location.toUpperCase();
    const parcelStatus = parcel.status.toUpperCase();
    //  Check if the marker already exists
    if (trackingMarker) {
      // If it exists, i will update its position and popup content
      trackingMarker.setLatLng(newLatLng);
      trackingMarker
        .getPopup()
        .setContent(
          `<p>your package is ${parcelStatus}<p></br><p>location: ${parcelLocation}`
        );
    } else {
      // If it's the first time, create the marker and assign it to the variable
      trackingMarker = L.marker(newLatLng).addTo(map);
      trackingMarker
        .bindPopup(
          `<p>your package is ${parcelStatus}<p></br><p>location: ${parcelLocation}`
        )
        .openPopup();
    }

    //   map view smoothly to the new location
    map.flyTo(newLatLng, 13);

    console.log(`Marker updated and map moved to ${parcelLocation}`);
  } else {
    console.error("Invalid coordinates received from Supabase.");
  }
}

// updateMarkerByTrackingId(67890);
// ////////////////////// MAP INTERGRATION END/////////////////////////////

