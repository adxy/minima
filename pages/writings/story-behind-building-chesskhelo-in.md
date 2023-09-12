---
title: "The story behind  building ChessKhelo.in"
date: 2020-04-22 00:20:28
published: true
math: false
---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1688298661609/6a104571-edb9-4aa5-94c1-cbad5589455c.gif)

ChessKhelo is a project which was never meant to be what it is today. One day I was sitting in front of my computer, getting bored and thought "Let's design a chessboard pattern with [***CSS***](https://developer.mozilla.org/en-US/docs/Web/CSS)". After that was implemented, I thought "Why not render pieces in it", "Why not add drag-n-drop to this", "It would be cool to have move-validation", and so on...

Slowly with each small iteration, it was getting clear to me that I was going to make a Chess Platform & make it Open Source.

At this moment, ChessKhelo supports the following:

* Rendering a single-player board (move both Black & White pieces).
    
* Displaying & able to copy FEN & PGN notations.
    
* Socket-based Multiplayer Games.
    
* Saving Finished Games (Not shown to end users ATM).
    
* User Avatar Display.
    
* Ability to chat with the opponent.
    
* OAuth 2.0-based Login with Google SSO.
    

## **The Tricky Part**

Since, initially, ChessKhelo was never meant to be a full-fledged, production-ready project, I did not consider a few things.

The biggest of them would be to add "Touch Devices Support". ChessKhelo uses [***HTML Drag and Drop API***](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) to move pieces. By nature, this API is not supported on touch (touch-only) devices as the browser does not support [***HTML Drag and Drop API***](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

While the whole website is responsive for mobile devices, it's not possible to move the pieces on board by dragging them.

There's a way around this without removing the [***HTML Drag and Drop API***](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) but it's not as graceful. Instead of allowing drag-and-drop, the user can touch the piece followed by touching the square they want it to move. But I am not a fan of it. I would rather have both drag-and-drop and touch-to-move.

> *The solution: Spoiler: Getting rid of HTML Drag and Drop API.*

To support touch-only devices we have to use something that is supported by both touch-only devices and desktops. Well, the idea is to not use any pre-built packages so I guess we will have to do it the hard way. There come [***Mouse Events***](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent). While mouse events will not work out-of-the-box on touch-only devices they can be easily translated into [***Touch Events***](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events).

[***Read this article***](https://javascript.info/mouse-drag-and-drop) to understand mouse events.

## **Upcoming Features**

* Touch-only devices support. (Released: [***See Release)***](https://github.com/adxy/chesskhelo.in/releases/tag/v0.6.0)
    
* Allow opening the same game only in 1 tab of the browser & location.
    
* At the moment, users can play multiple multiplayer games simultaneously. This will be restricted to only one.
    
* A multiplayer game once created never expires, unless the server restarts. This will change, each game will expire after a given time, followed by time-controlled multiplayer games in the far future.
    
* User Profiles.
    
* Change Avatars, Board Colors, Change Pieces.
    
* Ability to set a custom username (Gamertag).
    

## **Pieces & Sounds**

Do the pieces & sounds feel familiar? Indeed they do! They are taken directly from [***Chess.com***](http://Chess.com).

***What exactly is taken?***

*The Pieces* - PNG images of the pieces. Well, I can design stuff but [chess.com](http://chess.com) pieces are just unique.

*The Sounds* - .webm audio files for piece capture, promotion, game end, etc. Nothing beats the checkmate sound by [chess.com](http://chess.com). Just kidding, all [Chess.com](http://chess.com) sounds are mesmerizing. 😌 Except that one sound when you're [***low on time***](https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/default/tenseconds.webm). 🥲

## **Infra & Deployment**

Frontend: Built with [***Next.js***](https://nextjs.org/), styled with [***Styled-Components***](https://styled-components.com/) & deployed on [***Vercel***](https://vercel.com/).

Backend: Built with [***Node.js***](https://nodejs.org/en/) & [***Express***](https://expressjs.com/), multiplayer handled with [***Socket.io***](http://Socket.io), sign in with [***SSO by Google***](https://developers.google.com/identity/gsi/web/guides/overview) coupled with custom [***OAuth 2.0***](https://datatracker.ietf.org/doc/html/rfc6749) mechanism, deployed on [***AWS EC2***](https://aws.amazon.com/ec2/) with [***NGINX***](https://www.nginx.com/) as reverse proxy & SSL by [***Certbot***](https://certbot.eff.org/) (Let's Encrypt).

## **Not Enough Features For You?**

Contribute! ChessKhelo is an Open Source project and is open to Pull Requests. But before anything, read the [***contribution guide here.***](https://github.com/adxy/chesskhelo.in)

> *Being a developer who knows Chess & not contributing is a sin.😏 Not a developer? Sharing is also contributing. 😎*

## **Love this? Star it on GitHub!**

* Live Project: [***https://chesskhelo.in/***](https://chesskhelo.in/)
    
* Source Code FE: [***https://github.com/adxy/chesskhelo.in***](https://github.com/adxy/chesskhelo.in)
    
* Source Code BE: [***https://github.com/adxy/chesskhelo.in-be***](https://github.com/adxy/chesskhelo.in-be)
    

## **Footnotes**

Follow me on Twitter for updates about this project and more. [***@theadxy***](https://twitter.com/theadxy)
