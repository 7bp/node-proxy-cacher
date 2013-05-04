node-proxy-cacher
=================

A simple node.js proxy service that caches response on filesystem. Good for developing purpose that requires live data.

Sidenote: Does not support HTTPS.

Usage:
```
node proxy.js server port [localport]
```
This will start the proxy server on localport, default 8080 piping all queries forward to the given server port.

Example
```
node proxy.js www.apple.com 80
4 May 04:53:52 - Deleted 0 cache files
4 May 04:53:52 - Listening on port 8080...
4 May 04:53:59 - FETCH 127.0.0.1: GET / > www.apple.com:80/
4 May 04:53:59 - FETCH 127.0.0.1: GET /v/home/t/styles/home.css > www.apple.com:80/v/home/t/styles/home.css
4 May 04:53:59 - FETCH 127.0.0.1: GET /v/home/t/styles/billboard.css > www.apple.com:80/v/home/t/styles/billboard.css
4 May 04:53:59 - FETCH 127.0.0.1: GET /itunes/shared/counter/styles/counter.css > www.apple.com:80/itunes/shared/counter/styles/counter.css
4 May 04:53:59 - FETCH 127.0.0.1: GET /v/itunes/shared/counter/a/styles/counter.css > www.apple.com:80/v/itunes/shared/counter/a/styles/counter.css
4 May 04:53:59 - FETCH 127.0.0.1: GET /global/styles/base.css > www.apple.com:80/global/styles/base.css
4 May 04:53:59 - FETCH 127.0.0.1: GET /home/styles/home.css > www.apple.com:80/home/styles/home.css
4 May 04:53:59 - FETCH 127.0.0.1: GET /v/home/t/scripts/home-promo-counter.js > www.apple.com:80/v/home/t/scripts/home-promo-counter.js
4 May 04:53:59 - FETCH 127.0.0.1: GET /v/home/t/scripts/home.js > www.apple.com:80/v/home/t/scripts/home.js
4 May 04:53:59 - FETCH 127.0.0.1: GET /v/itunes/shared/counter/a/scripts/counter.js > www.apple.com:80/v/itunes/shared/counter/a/scripts/counter.js
4 May 04:53:59 - FETCH 127.0.0.1: GET /global/scripts/promomanager.js > www.apple.com:80/global/scripts/promomanager.js
4 May 04:53:59 - FETCH 127.0.0.1: GET /home/images/billboard_iphone_title.png > www.apple.com:80/home/images/billboard_iphone_title.png
4 May 04:53:59 - FETCH 127.0.0.1: GET /home/images/billboard_ipad_title.png > www.apple.com:80/home/images/billboard_ipad_title.png
4 May 04:53:59 - FETCH 127.0.0.1: GET /global/elements/flags/22x22/usa.png > www.apple.com:80/global/elements/flags/22x22/usa.png
4 May 04:53:59 - FETCH 127.0.0.1: GET /home/images/billboard_iphone_hero.jpg > www.apple.com:80/home/images/billboard_iphone_hero.jpg
4 May 04:53:59 - FETCH 127.0.0.1: GET /itunes/store/counters/il6ark7ec.js > www.apple.com:80/itunes/store/counters/il6ark7ec.js
4 May 04:53:59 - FETCH 127.0.0.1: GET /home/images/billboard_ipad_hero.jpg > www.apple.com:80/home/images/billboard_ipad_hero.jpg
4 May 04:53:59 - FETCH 127.0.0.1: GET /global/elements/arrows/morearrow_08c.svg > www.apple.com:80/global/elements/arrows/morearrow_08c.svg
4 May 04:53:59 - FETCH 127.0.0.1: GET /v/home/t/images/video_play_medium.svg > www.apple.com:80/v/home/t/images/video_play_medium.svg
<<FORCED RELOAD>>
4 May 04:54:50 - CACHE 127.0.0.1: GET / > www.apple.com:80/
4 May 04:54:51 - CACHE 127.0.0.1: GET /global/styles/base.css > www.apple.com:80/global/styles/base.css
4 May 04:54:51 - CACHE 127.0.0.1: GET /v/home/t/styles/billboard.css > www.apple.com:80/v/home/t/styles/billboard.css
4 May 04:54:51 - CACHE 127.0.0.1: GET /v/home/t/styles/home.css > www.apple.com:80/v/home/t/styles/home.css
4 May 04:54:51 - CACHE 127.0.0.1: GET /home/styles/home.css > www.apple.com:80/home/styles/home.css
4 May 04:54:51 - CACHE 127.0.0.1: GET /itunes/shared/counter/styles/counter.css > www.apple.com:80/itunes/shared/counter/styles/counter.css
4 May 04:54:51 - CACHE 127.0.0.1: GET /v/itunes/shared/counter/a/styles/counter.css > www.apple.com:80/v/itunes/shared/counter/a/styles/counter.css
4 May 04:54:51 - CACHE 127.0.0.1: GET /global/scripts/promomanager.js > www.apple.com:80/global/scripts/promomanager.js
4 May 04:54:51 - CACHE 127.0.0.1: GET /v/home/t/scripts/home.js > www.apple.com:80/v/home/t/scripts/home.js
4 May 04:54:51 - CACHE 127.0.0.1: GET /v/itunes/shared/counter/a/scripts/counter.js > www.apple.com:80/v/itunes/shared/counter/a/scripts/counter.js
4 May 04:54:51 - CACHE 127.0.0.1: GET /v/home/t/scripts/home-promo-counter.js > www.apple.com:80/v/home/t/scripts/home-promo-counter.js
4 May 04:54:51 - CACHE 127.0.0.1: GET /home/images/billboard_iphone_title.png > www.apple.com:80/home/images/billboard_iphone_title.png
4 May 04:54:51 - CACHE 127.0.0.1: GET /home/images/billboard_iphone_hero.jpg > www.apple.com:80/home/images/billboard_iphone_hero.jpg
4 May 04:54:51 - CACHE 127.0.0.1: GET /global/elements/flags/22x22/usa.png > www.apple.com:80/global/elements/flags/22x22/usa.png
4 May 04:54:51 - CACHE 127.0.0.1: GET /home/images/billboard_ipad_hero.jpg > www.apple.com:80/home/images/billboard_ipad_hero.jpg
4 May 04:54:51 - CACHE 127.0.0.1: GET /home/images/billboard_ipad_title.png > www.apple.com:80/home/images/billboard_ipad_title.png
4 May 04:54:51 - CACHE 127.0.0.1: GET /v/home/t/images/video_play_medium.svg > www.apple.com:80/v/home/t/images/video_play_medium.svg
4 May 04:54:51 - CACHE 127.0.0.1: GET /itunes/store/counters/il6ark7ec.js > www.apple.com:80/itunes/store/counters/il6ark7ec.js
4 May 04:54:51 - CACHE 127.0.0.1: GET /global/elements/arrows/morearrow_08c.svg > www.apple.com:80/global/elements/arrows/morearrow_08c.svg
```

Any request to localhost:8080/* will be piped through to www.apple.com and immediately cached in the cache folder. Any further request with the same url will result in a simple cache output.