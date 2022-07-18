# Design

![My Algo ](./My%20Algo.excalidraw.svg "App Flow Image")

The app is just like tinder where the user appears when I m confused to what to do.

He is given a option of Tasks in form of swipable cards

The Idea is to make user swipe right for doing , and left for choosing to not do. This forces the user to see the sea of options on things to do , but also makes the user choose in an hierarchy of the choices which is preconfigured by the user.

> TBD - UX for card caction

Each task can be attached to a plugin , where these plugin can help me the user to resume that task or start the task.

<B>The idea is to make it easy to start and resume a task when in question about what to do </B>

## Ordering of Task

storing a sorted list , which is sorted based on hierarchy defined. Every time , cards is updated / deleted / created - this list is reloaded from local db and sorted again.

## UX Ideas

[Card Design ](https://dribbble.com/shots/5409113-Installments)

## Plugin Ideas.

1. Resume Reading Plugin - Reading Cards that can take you back to where you were last time you were reading this.

## Design In progress

### Local Recomendation engine.

- What are some params you would have recommended ?
  Lets say we simplify it. We ask the user to edit / add / delete - main category of tasks.
  Say : Create , Learn , Practice , Consume.

  Then we can ask the user to select the items in order of what they want to do in their free time.

  Lets say then we have an editable array being saved : HierarcyOfTypes in local db

  How to query and save such data

  Lets say i keep an in memory heap. When we query all tasks from local db, we save the cards in a max heap. Where superiority is decided by comparing params:

  - Type ( based on the order selected by user )
  - Oldest lastSeen > Latest lastSeen.
  - Importance : how important is task . score from 5 most important , 1 least.
