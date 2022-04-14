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

Video can be accessed via a Video.js HTML web player. Add the .m3u8 file location on the server as the src. Example in player.html


** [Helpful Markdown Guide](https://www.markdownguide.org/cheat-sheet/) ***
