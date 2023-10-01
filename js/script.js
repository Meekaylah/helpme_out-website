// Get a reference to the video element
var videoPlayer = document.getElementById('videoPlayer');
var videoTitle = document.getElementById('video-title');
var timestamp = document.getElementById('timestamp');
var videoLink = document.getElementById('video-url');

document.addEventListener('DOMContentLoaded', function() {
    // URL that returns the JSON data
    var jsonUrl = 'https://chrome-extension-backend-w4r6.onrender.com/extension/';

    // Fetch the JSON data
    fetch(jsonUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            // Access the 'data' key from the JSON response
            var videoNames = data.data;

            // Get the last video name from the array
            var lastVideoName = videoNames[videoNames.length - 1];

            // Construct the full video URL
            var lastVideoUrl = 'https://chrome-extension-backend-w4r6.onrender.com/extension/' + lastVideoName;
            console.log(lastVideoUrl);
            videoLink.setAttribute('value', lastVideoUrl)
            var lastCharacters = lastVideoUrl.substring(lastVideoUrl.lastIndexOf('/') + 1);
            videoTitle.innerText = lastCharacters;


            // Fetch the video data
            return fetch(lastVideoUrl);
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(function(videoBlob) {
            console.log("From beginning");
            // Create a blob URL for the video data
            var videoBlobUrl = URL.createObjectURL(videoBlob);

            // Set the src attribute of the video element
            videoPlayer.src = videoBlobUrl;
            videoPlayer.load();
            videoPlayer.addEventListener('timeupdate', function() {
                var hours=parseInt(videoPlayer.currentTime/(60*60),10);
                var minutes = parseInt(videoPlayer.currentTime / 60, 10);
                var seconds = videoPlayer.currentTime % 60;
                var dhours=parseInt(videoPlayer.duration/(60*60),10);
                var dminutes = parseInt(videoPlayer.duration / 60, 10);
                var dseconds = videoPlayer.duration % 60;

                if (hours < 10){hours = "0"+hours;}else{hours = hours;}
                if (dhours < 10){dhours = "0"+dhours;}else{dhours = dhours;}
                if (minutes < 10){minutes = "0"+minutes;}else{minutes = minutes;}
                if (dminutes < 10){dminutes = "0"+dminutes;}else{dminutes = dminutes;}
                if (seconds < 10){seconds = "0"+seconds.toFixed(0);}else{seconds = seconds.toFixed(0);}
                if (dseconds<10){dseconds = "0"+dseconds.toFixed(0);}else{dseconds = dseconds.toFixed(0);}

                if (hours==0) { 
                    timestamp.innerHTML=minutes+":"+seconds
                } else { 
                    timestamp.innerHTML=hours+":"+minutes+":"+seconds
                }
            });
            videoPlayer.onloadeddata = () => {
                videoPlayer.play();
            }
            // Set the last video name as a title for the video (optional)
            console.log("to the end...");
        })
        .catch(function(error) {
            console.error('Error fetching video:', error);
        });
});

function edit() {
    var name = prompt("Edit video name:");
    videoTitle.innerText = `${name}`;
}


