# Backend Documentation

## Main Functiolity

Gather data from PurpleAir API.

## File Function Documentation

Backend pulls new data from PurpleAir API via datapull.py Python script.

### datapull.py

Data is pulled from PurpleAir API. It is then parsed into JSON format, where the data is both inserted into the database and stored in the current.json file on the server.

## Security Camera Implementation

Use ffmpeg to connect to the camera and start collecting video chunks using the following command, adding in camera URL and location to store chunks and m3u8 file.

sudo ffmpeg -v info -i “rtsp://CAMERA_URL” -c:v copy -c:a copy -bufsize 1835k -pix_fmt yuv420p -flags -global_header -hls_time 10 -hls_list_size 6 -hls_wrap 10 -start_number 1 /WHERE/TO/STORE/FILE.m3u8

Video can be accessed via a Video.js HTML web player. Add the .m3u8 file location on the server as the src. Example here:

<!DOCTYPE html>
<head>
  <link href="https://vjs.zencdn.net/7.18.1/video-js.css" rel="stylesheet" />
</head>
<html>
  <body style="background-color:black;">
    <div style="text-align: center;">
        <video
          id="my-video"
          class="video-js"
          controls
          preload="auto"
          width="1400"
          height="700"
          
          data-setup="{}"
        >
          <source src="http://SERVERIP/LOCATION/OF/FILE.m3u8" type="application/x-mpegURL" />
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank"
              >supports HTML5 video</a
            >
          </p>
      </video>
    </div>
      

  <script src="https://vjs.zencdn.net/7.18.1/video.min.js"></script>
</body>
  </body>
</html>

** [Helpful Markdown Guide](https://www.markdownguide.org/cheat-sheet/) ***
