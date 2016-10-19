---
name: LevelHistory
alias:
- LevelHistoryCollection
desc: The history of the level.
props:
  - name: levelId
    type: string
    desc: The level id of the history
  - name: score
    type: string
    desc: The high score of the level
  - name: cleared
    type: boolean
    desc: True iff the level is cleared
  - name: clearedAt
    type: string
    desc: The time when the level is cleared
---
