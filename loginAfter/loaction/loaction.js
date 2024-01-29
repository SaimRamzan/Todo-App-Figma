const task = document.querySelector(".task");
const logout = document.getElementById("logout");
const checkIn = document.querySelector(".addTask");
const locationn = document.getElementById("incomleteTask");

const loactionActive = document.querySelector(".loaction");

let active = () => {
  if (loactionActive == true) {
    loactionActive.style.backgroundColor = "white";
  } else {
    loactionActive.style.backgroundColor = "black";
    loactionActive.style.color = "white";
  }
};
active();

function getSuccessLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log("latitude:", latitude, "N", "longitude:", longitude, "E");
  const wetherApi = `https://api.weatherapi.com/v1/current.json?key=c5ada4e27ed847fe9f8110605240801&q=${latitude},${longitude}&aqi=yes`;

  apiFun(wetherApi)
    .then((data) => {
      const city = data.location.name || "Unknown City";
      const region = data.location.region;
      const tzId = data.location.tz_id;
      console.log("city", city);
      const loactionData = {
        city: city,
        region: region,
        tzId: tzId,
        latitude: latitude,
        longitude: longitude,
      };
      localStorage.setItem("loactionData", JSON.stringify(loactionData));
      previousLocation();
      let createElement = document.createElement("div");
      createElement.innerHTML = `
     <p class="checkbox"  id="">📍</p>
        <h3>${city},s ${region}, ${tzId}</h3>
        <h5>${latitude}° N, ${longitude}° E</h5>
    `;
      locationn.appendChild(createElement);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
function getFailedLocation() {
  alert("Some issue to get you Location ( allow location access ) ");
}

let apiFun = async (url) => {
  try {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

checkIn.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(
    getSuccessLocation,
    getFailedLocation
  );
});

const previousLocation = () => {
  const completeTask = document.querySelector(".completeTask");
  const currentDiv = document.createElement("div");
  setTimeout(() => {
    const loactionData = localStorage.getItem("loactionData");
    if (loactionData) {
      const dataParse = JSON.parse(loactionData);
      currentDiv.innerHTML = `
            <p class="checkbox"  id="">📍</p>
            <h3>${dataParse.city},s ${dataParse.region}, ${dataParse.tzId}</h3>
            <h5>${dataParse.latitude}° N, ${dataParse.longitude}° E</h5>
        `;
      localStorage.setItem("previousLocation", JSON.stringify(dataParse));
      completeTask.appendChild(currentDiv);
      removeChild(getSuccessLocation);
      localStorage.setItem(
        "previousLocation",
        JSON.stringify(currentDiv.innerHTML)
      );
    }
  }, 2000);
};
task.addEventListener("click", () => {
  window.location.href = "../sucessLogin.html";
});
logout.addEventListener("click", () => {
  window.location.href = "../../index.html";
});

(() => {
  const loactionData = localStorage.getItem("loactionData");
  if (loactionData) {
    const dataParse = JSON.parse(loactionData);
    let createElement = document.createElement("div");
    createElement.innerHTML = `
     <p class="checkbox"  id="">📍</p>
        <h3>${dataParse.city},s ${dataParse.region}, ${dataParse.tzId}</h3>
        <h5>${dataParse.latitude}° N, ${dataParse.longitude}° E</h5>
    `;
    locationn.appendChild(createElement);
  }

  const previousLocationData = localStorage.getItem("previousLocation");
  if (previousLocationData) {
    const dataParse = JSON.parse(loactionData);
    const completeTask = document.querySelector(".completeTask");
    const currentDiv = document.createElement("div");
    currentDiv.innerHTML = `
    <p class="checkbox"  id="">📍</p>
        <h3>${dataParse.city},s ${dataParse.region}, ${dataParse.tzId}</h3>
        <h5>${dataParse.latitude}° N, ${dataParse.longitude}° E</h5>
    `;
    completeTask.appendChild(currentDiv);
  }
})();
