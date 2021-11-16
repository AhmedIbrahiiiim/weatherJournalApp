/* Global Variables */
const apiUrl = "http://localhost:4500/";
const apiKey = "&appid=c3a1e8ac9f7c554e83f622b9bcf966fe&units=metric";
let zip = document.getElementById("zip");
let feeling = document.getElementById("feeling");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");
let btn = document.getElementById("generate");
let errorFound = function (error) {
  console.log(`Some Error Occurred`, error);
};

// Event listener to add function to existing HTML DOM element
btn.addEventListener("click", gen);
function gen() {
  let today = new Date();
  let data = {
    // to get the date in just dd/mm/yyyy
    date:
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear(),
    // top get the zip input from the user
    zipCode: zip.value,
    // top get the feeling input from the user
    content: feeling.value,
  };
  // Send Data To The API
  getZipCodeInformation(data.zipCode)
    .then(function (zipInfos) {
      // if City Not Found It Will Show an Alert Of The Message That Was Received From The API
      if (zipInfos.cod != 200) {
        return alert(zipInfos.message);
      } else {
        // getting the Temperature & post data to the server for saving it the display it for the user
        data.temp = zipInfos.list[0].main.temp;
        postDataToServer(data);
      }
    })
    .catch(errorFound);
}
// Get zip Code Information Function
async function getZipCodeInformation(zipCode) {
  let apiLink = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`
  );
  return apiLink.json();
}
// Post Data Function
async function postDataToServer(data) {
  let res = await fetch(`${apiUrl}postData`, {
    headers: { "content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  // to Update The Page With The New Infos & if Not It Will Return an Alert of Not Successful
  try {
    res
      .json()
      .then(function (data) {
        if (res.ok) {
          updatePage(); // update Page now
        } else {
          alert(`Process Is Not Successful`);
        }
      })
      .catch(errorFound);
  } catch (error) {
    errorFound(error);
  }
}
// Update Page Function
async function updatePage() {
  let res = await fetch(`${apiUrl}all`);
  // All The Changes on The HTML of The Data Received From The API
  try {
    res.json().then(function (data) {
      date.innerHTML = `Date is: <span style="font-weight: 700;">${data.date}</span>`;
      temp.innerHTML = `Temperature is: <span style="font-weight: 700;">${data.temp}</span> <span style="font-weight: bold;">&deg;</span><span style="font-weight: 400">C</span>`;
      content.innerHTML = `My feeling is: <span style="font-weight: 700;">${data.content}</span>`;
    });
  } catch (error) {
    errorFound(error);
  }
}
