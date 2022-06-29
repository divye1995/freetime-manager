# Design

![My Algo ](./My%20Algo.excalidraw.svg "App Flow Image")

The app is just like tinder where the user appears when I m confused to what to do.

Then there are two kind of cards

1. Category Cards like : Create , Learn , ...
2. Suggestion Cards - Like : Project - Free time Manager

The Idea is to make user swipe right for doing , and left for choosing to not do. This forces the user to see the sea of options on things to do , but also makes the user choose in an hierarchy of the choices which is preconfigured by the user.

On left swipe , you see the next card.
on right swipe - you either get redirected to a page about details or notes that help you resume/start a task if present or just simply records the choice and shows stats on choices made in last 2 weeks.

Now lets first do the most basic part of the app , swiping cards .

Lets say I have an array

`[ "Cat" "Bat" "Ball" ]`

Now I need to have a infinite rounded queue to populate the screen with cards

Card samples :

https://dribbble.com/shots/5409113-Installments

We need to create the Cards UI
