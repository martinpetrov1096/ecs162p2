"use strict";


function uploadImage() 
{
  const selectedFile = document.getElementById('replaceImage').files[0];
  let label = document.querySelector('label[for="replaceImage"]')
  
  const formData = new FormData();
  formData.append('newImage', selectedFile, selectedFile.name);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/uploadImage", true);

  /* Add Uploading caption when request begins */
  xhr.onloadstart = function() {
    label.innerHTML= "Uploading . . ."
  }

  /* Change button to small button after image has been received */
  xhr.onloadend = function() {
    document.getElementById("postcardImg").src = "../images/" +selectedFile.name;
    label.classList.add('button');
    label.classList.remove('bigButton');
    label.textContent="Replace Image";
  }

  xhr.send(formData);
}


/* Handles the AJAX post request to save setings */
function share() 
{
  let settings = {};
  /* Store the current message in settings array */
  settings['message'] = document.getElementById('message').textContent;
  settings['imageUrl'] = document.getElementById('postcardImg').src;

  /* Store the currently selected font in settings array */
  let fontOptions = document.getElementsByName('font');
  for(let i = 0, length = fontOptions.length; i < length; ++i) {
    if (fontOptions[i].checked) {
      settings['font'] = fontOptions[i].id;
      break;
    }
  }

  /* Store the currently selected color in settings array */
  let colorOptions = document.getElementsByName('color');
  for(let i = 0, length = colorOptions.length; i < length; ++i) {
    if (colorOptions[i].checked) {
      settings['color'] = colorOptions[i].id;
      break;
    }
  }

  /* Make AJAX POST request and send send settings[] as JSON */
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'share', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(settings));
}


/* Loads the message, color, font, and image */
function loadConfig() 
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'loadConfig')
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onload = () => {
    let settings = JSON.parse(xhr.responseText);

    document.getElementById(settings['color']).click();
    document.getElementById(settings['font']).click();
    document.getElementById('postcardImg').src = settings['imageUrl'];
    document.getElementById('message').textContent = settings['message'];
  };
}


/////////////////////////////////////////////////
/////////////////  Event Binding ////////////////
/////////////////////////////////////////////////
document.getElementById('replaceImage').addEventListener("change", uploadImage);
document.getElementById('shareButton').addEventListener('click', share);
document.addEventListener('DOMContentLoaded', loadConfig);

document.querySelector('.colorSettings').addEventListener('click', (event) => {
  document.querySelector('.postcard').className = "postcard " + event.target.id;
  //document.querySelector('.postcard').style.backgroundColor = event.target.value;
});
document.querySelector('.fontSettings').addEventListener('click', (event) => {
  document.querySelector('.postcardMessage').className ="postcardMessage " + event.target.id;
  //document.querySelector('.postcardCaption').style.fontFamily = event.target.value;
});

