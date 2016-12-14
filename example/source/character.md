---
name: Character
desc: The character model.
props:
  - name: id
    type: string
    desc: The id of the character
  - name: name
    type: string
    desc: The name of the character
  - name: position
    type: CharPosition
    desc: The position of the character
  - name: keys
    type: LevelKeyCollection
    desc: The keys which the character has at the moment
  - name: histories
    type: LevelHistoryCollection
    desc: The histories of the levels in the current floor
  - name: playingState
    type: PlayingState
    desc: The playing state of the last level
  - name: locks
    type: LevelLockCollection
    desc: The locks statuses of the levels in the current floor
---

Character represents heros like Ma, Ellen, Emma.
