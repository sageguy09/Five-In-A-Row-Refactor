## SEI Project 3 - Five in a Row
---

### Deployed Application
[Link to Application on Heroku](https://hidden-temple-14129.herokuapp.com/)

### Project Planning Board

[Link to GitKraken Project](https://app.gitkraken.com/glo/board/XX-h3biuYQAP_SwN)


### Problem Statement and Target Audience

This web app is to provide an online verision of the original board game. 

Through this app, my family will be able to play together over the web while also introducing the internet to our favorite family board game.

### A history on Five in a Row

'Five in a Row' is a boardd game written by my grandmother, Paula Claudill, back in the late 60s. She initially hand crafted 100 boards and sold all of them at craft festivals throughout Indiana. She sold all versions of the game, but 1, which is what us grandkids grew up playing. The availability of the board game is what inspired this web app. 


Not being able to have access to '5 in a row' outside of my Grandparent's home,I wanted to provide a solution for all family members to be able to not only play the game, but to be able to play together from anwhere an internet connection is present.  Through this webapp, our family can play our favorite family board game, from any where in the country. 


![Game Board and Materials](https://i.imgur.com/LhDe900.jpg)
---
### Game Objective

Play cards from hand to place 'pegs' on the board. The goal is to have 5 of your colored pegs in a row 
diagonally, horiztonally, or vertically. 

---
### Game Rules


### Players Per Game
Game can be played with eith 2 or 3 players 
NOTE: This game traditionally can also be played with teams of 2 or 3, making if possible to have up to 9 players. For the MVP, **this version will support 2-3 players.**


### Player Turn and Hand

Players are able to only have up to 4 cards in their hand at a time. 

On player's turn, player may either play a card/place peg or draw a card. 

#### Playing a card/placing peg

When a card is played, a player is able to place the peg on the number listed on the card or any number that is greater than what is displayed on the card **as long as the space has not been played already** (aka when another peg is already in the space). 

![Imgur](https://i.imgur.com/BCVcnBs.jpg)

**a space can not be played on a number lower than the value that is listed on the card**
Example: if someone plays card '90' on space '99', the player holding card 99 can no longer play that card. 
This equates to that player needing to keep now dead card '99' in their hand for the rest of the game, leaving them with onliy 3 playable cards. 

**Lower cards are much more valuable and should be saved for blocking attempts made on lower ranges of numbers**

**'0' is considered the most valuable card in the game, since it can be played on any space on the board**



### ERD and Wireframing

![Initial ERD Diagram](https://i.imgur.com/B3bNxY7.jpg)
![Create Game Wireframe](https://i.imgur.com/Hy7FGEz.jpg?1)
![Main Page Wireframe](https://i.imgur.com/rZHdHCY.jpg)


### credits
react game-board engine and initial gameboard and click cells logic from Nicolo Davis' over at (boardgame.io)[https://boardgame.io]
