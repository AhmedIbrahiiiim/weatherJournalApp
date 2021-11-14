/* Global Variables */
const apiKey = "&appid=c3a1e8ac9f7c554e83f622b9bcf966fe&units=metric";
const apiUrl = "http://localhost:4500/";

let zip = document.getElementById("zip");
let feeling = document.getElementById("feeling");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");
let btn = document.getElementById("generate");

let errorFound = (error) => console.log(`Some Error Occurred`, error);

// Event listener to add function to existing HTML DOM element
btn.addEventListener("click", gen);
function gen() {
  let today = new Date();
  let data = {
    date:
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate(),
    zipCode: zip.value,
    content: feeling.value,
  };

  // Send Data To The API
  getZipCodeInformation(data.zipCode)
    .then((zipInfos) => {
      // if City Not Found It Will Show an Alert
      if (zipInfos.cod != 200) return alert(zipInfos.message);
      // getting the Temperature & post data to the server for saving it the display it for the user
      data.temp = zipInfos.list[0].main.temp;
      postDataToServer(data);
    })
    .catch(errorFound);
}

// Get zip Code Information Function
async function getZipCodeInformation(zipCode) {
  return await (
    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`
    )
  ).json();
}

// Post Data Function
async function postDataToServer(data) {
  let res = await fetch(`${apiUrl}postData`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    res
      .json()
      .then((data) => {
        if (res.ok) {
          updateUI(); // update UI now
        } else {
          alert(`Process Is Not Successful`);
        }
      })
      .catch(errorFound);
  } catch (error) {
    errorFound(error);
  }
}

// Update UI Function
async function updateUI() {
  let res = await fetch(`${apiUrl}all`);
  try {
    res.json().then((data) => {
      date.innerHTML = `Date is: ${data.date}`;
      temp.innerHTML = `Temperature is: ${data.temp} C`;
      content.innerHTML = `My feeling is: ${data.content}`;
    });
  } catch (error) {
    errorFound(error);
  }
}
