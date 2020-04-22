/* Loads the message, color, font, and image */
function loadConfig() 
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'loadConfig')
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send();
  xhr.onload = () => {
    let settings = JSON.parse(xhr.responseText);
    document.querySelector('.postcard').className = "postcard " + settings['color'];
    document.getElementById('message').className ="postcardMessage " + settings['font'];
    document.getElementById('postcardImg').src = settings['imageUrl'];
    document.getElementById('message').textContent = settings['message'];
  };
}

document.addEventListener('DOMContentLoaded', loadConfig);