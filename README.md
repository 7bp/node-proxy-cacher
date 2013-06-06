node-proxy-cacher
=================

This simple proxy implementation can be used to prevent api-hammering in development stage, reduce loading time after second refresh and serve always the same result and server headers.

Sidenote: Does not support HTTPS.

Usage:
```
node proxy.js server port [localport]
```
This will start the proxy server on localport, default 8080 piping all queries forward to the given server port.

Example
```
node proxy.js www.apple.com 80
11 May 02:07:18 - Deleted 13 cache files
11 May 02:07:18 - Listening on port 8080...
11 May 02:07:33 - FETCH / - /
11 May 02:07:33 - FETCH /v/itunes/shared/counter/a/styles/counter.css - /v/itunes/shared/counter/a/styles/counter.css
11 May 02:07:33 - FETCH /v/home/t/styles/home.css - /v/home/t/styles/home.css
11 May 02:07:33 - FETCH /v/home/t/styles/billboard.css - /v/home/t/styles/billboard.css
11 May 02:07:33 - FETCH /itunes/shared/counter/styles/counter.css - /itunes/shared/counter/styles/counter.css
11 May 02:07:33 - FETCH /home/styles/home.css - /home/styles/home.css
11 May 02:07:33 - FETCH /global/styles/base.css - /global/styles/base.css
11 May 02:07:33 - FETCH /v/home/t/scripts/home-hero-counter.js - /v/home/t/scripts/home-hero-counter.js
11 May 02:07:33 - FETCH /v/home/t/scripts/home.js - /v/home/t/scripts/home.js
11 May 02:07:33 - FETCH /global/scripts/promomanager.js - /global/scripts/promomanager.js
11 May 02:07:33 - FETCH /v/itunes/shared/counter/a/scripts/counter.js - /v/itunes/shared/counter/a/scripts/counter.js
11 May 02:07:33 - FETCH /itunes/50-billion-app-countdown/images/50billion_home_title.png - /itunes/50-billion-app-countdown/images/50billion_home_title.png
11 May 02:07:33 - FETCH /itunes/50-billion-app-countdown/images/50billion_home_sub_counting.png - /itunes/50-billion-app-countdown/images/50billion_home_sub_counting.png
11 May 02:07:33 - FETCH /itunes/50-billion-app-countdown/images/50billion_home_sub_earth.png - /itunes/50-billion-app-countdown/images/50billion_home_sub_earth.png
11 May 02:07:33 - FETCH /itunes/50-billion-app-countdown/images/50billion_home_sub_china.png - /itunes/50-billion-app-countdown/images/50billion_home_sub_china.png
11 May 02:07:34 - FETCH /global/elements/flags/22x22/usa.png - /global/elements/flags/22x22/usa.png
11 May 02:07:34 - FETCH /v/home/t/images/video_play_medium.svg - /v/home/t/images/video_play_medium.svg
11 May 02:07:34 - FETCH /itunes/store/counters/il6ark7ec.js - /itunes/store/counters/il6ark7ec.js
11 May 02:07:34 - FETCH /itunes/50-billion-app-countdown/images/50billion_home_hero_earth.jpg - /itunes/50-billion-app-countdown/images/50billion_home_hero_earth.jpg
11 May 02:07:34 - FETCH /itunes/50-billion-app-countdown/images/50billion_home_hero_china.jpg - /itunes/50-billion-app-countdown/images/50billion_home_hero_china.jpg
11 May 02:07:34 - FETCH /global/elements/arrows/morearrow_08c.svg - /global/elements/arrows/morearrow_08c.svg
11 May 02:07:34 - FETCH /itunes/50-billion-app-countdown/images/50billion_home_hero_counting.jpg - /itunes/50-billion-app-countdown/images/50billion_home_hero_counting.jpg
11 May 02:07:34 - FETCH /favicon.ico - /favicon.ico
```
Now force-refreshing the browser:
```
11 May 02:07:45 - CACHE /
11 May 02:07:46 - CACHE /global/styles/base.css
11 May 02:07:46 - CACHE /v/home/t/styles/home.css
11 May 02:07:46 - CACHE /v/home/t/styles/billboard.css
11 May 02:07:46 - CACHE /v/itunes/shared/counter/a/styles/counter.css
11 May 02:07:46 - CACHE /itunes/shared/counter/styles/counter.css
11 May 02:07:46 - CACHE /home/styles/home.css
11 May 02:07:46 - CACHE /global/scripts/promomanager.js
11 May 02:07:46 - CACHE /v/home/t/scripts/home-hero-counter.js
11 May 02:07:46 - CACHE /v/itunes/shared/counter/a/scripts/counter.js
11 May 02:07:46 - CACHE /v/home/t/scripts/home.js
11 May 02:07:46 - CACHE /itunes/50-billion-app-countdown/images/50billion_home_title.png
11 May 02:07:46 - CACHE /itunes/50-billion-app-countdown/images/50billion_home_hero_earth.jpg
11 May 02:07:46 - CACHE /itunes/50-billion-app-countdown/images/50billion_home_sub_earth.png
11 May 02:07:46 - CACHE /itunes/50-billion-app-countdown/images/50billion_home_sub_counting.png
11 May 02:07:46 - CACHE /itunes/50-billion-app-countdown/images/50billion_home_hero_china.jpg
11 May 02:07:46 - CACHE /itunes/50-billion-app-countdown/images/50billion_home_sub_china.png
11 May 02:07:46 - CACHE /itunes/50-billion-app-countdown/images/50billion_home_hero_counting.jpg
11 May 02:07:46 - CACHE /global/elements/flags/22x22/usa.png
11 May 02:07:46 - CACHE /itunes/store/counters/il6ark7ec.js
11 May 02:07:46 - CACHE /v/home/t/images/video_play_medium.svg
11 May 02:07:46 - CACHE /global/elements/arrows/morearrow_08c.svg
```
Any request to localhost:8080/* will be piped through to www.apple.com and immediately cached in the cache folder. Any further request with the same url will result in a simple cache output.


Another example showing the use of FILTER
```
node proxy.js apidomain.example.com 80 8181 cmd
11 May 02:09:18 - Deleted 0 cache files
11 May 02:09:18 - Listening on port 8080...
11 May 02:09:33 - FETCH /api.php?cmd=test - /api.php?cmd=test&session=abc&random=913123881
```
Now re-firing the query:
```
11 May 02:09:45 - CACHE /api.php?cmd=test
```
Any request with the same parameter values for the keys given as filter parameter will result in the same cache output.
