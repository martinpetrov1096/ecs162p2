"use strict";

function uploadImage() 
{
  const selectedFile = document.getElementById('replaceImage').files[0];
  let label = document.getElementById('replaceImageLabel');
  const formData = new FormData();
  formData.append('newImage', selectedFile, selectedFile.name);


  /* Create AJAX POST request and add functions for onLoadStart and onLoadEnd*/
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


function share() 
{
  let settings = {};
  settings['message'] = document.getElementById('message').textContent;

  /* Store the currently selected font in settings array */
  let fontOptions = document.getElementsByName('font');
  for(let i = 0, length = fontOptions.length; i < length; ++i) {
    if (fontOptions[i].checked) {
      settings['font'] = fontOptions[i].value;
      break;
    }
  }

  /* Store the currently selected color in settings array */
  let colorOptions = document.getElementsByName('color');
  for(let i = 0, length = fontOptions.length; i < length; ++i) {
    if (colorOptions[i].checked) {
      settings['color'] = colorOptions[i].value;
      break;
    }
  }

/* Make AJAX POST request and send send settings[] as JSON */
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'share', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(settings));
}

document.getElementById("replaceImage").addEventListener("change", uploadImage);
document.getElementById('shareButton').addEventListener('click', share);