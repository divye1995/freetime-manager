# Design

![My Algo ](./My%20Algo.excalidraw.svg "App Flow Image")

The app is just like tinder where the user appears when I m confused to what to do.

He is given a option of Tasks in form of swipable cards

The Idea is to make user swipe right for doing , and left for choosing to not do. This forces the user to see the sea of options on things to do , but also makes the user choose in an hierarchy of the choices which is preconfigured by the user.

On left swipe , you see the next card.
on right swipe - you either get redirected to a page about details or notes or plugin

Each task can be attached to a plugin , where these plugin can help me the user to resume that task or start the task.

<B>The idea is very well to make it easy to start and resume a task when in question about what to do </B>

## Ordering of Task

storing a sorted list , which is sorted based on hierarchy defined. Every time , cards is updated / deleted / created - this list is reloaded from local db and sorted again.

## Card Swiping Design

Card samples :

https://dribbble.com/shots/5409113-Installments

We need to create the Cards UI

### Task Plugin

1. Resume Reading Plugin - Reading Cards that can take you back to where you were last time you were reading this.

## Reintroduction of Tasks

Each task can have a custom re-introduction strategy where it can be reintroduced after sometime . This can be different strategy based on the last action on the card ( left or right swipe )
