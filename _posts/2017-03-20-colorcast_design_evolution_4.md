---
layout: post
author: pazalla
title:  "COLORCAST - Design Evolution (IV)"
categories: [ COLORCAST, Cocos, Funcional Design ]
image: assets/images/posts/colorcast_evolution_4.png
---
This screenshot shows the **Smart Box**'s development up to the final design.

It was crucial to us that this component be uncomplicated and obvious. When a player interacts with a Smart Box, the configuration of its exterior and interior can change the game's status.
* An enabled outside, denoted by an external triangle, lets the player send color in its direction.
* An enabled interior, shown as an inner triangle with a translucent backdrop, enables the smart box to receive color in its direction.

In order to better understand the player's response, we ultimately chose to add an extra little black triangle to the inside configuration.