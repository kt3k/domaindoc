---
name: User
desc: The user
type: Entity
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/user.js
edit: https://github.com/kt3k/moneybit-app/blob/master/src/domain/user.md
props:
- name: id
  type: string
  desc: The id of the user, randomly generated, maybe never used
- name: documents
  type: JournalDocument[]
  desc: The documents of the user
- name: settings
  type: UserSettings
  desc: The settings of the user
- name: currentDocument
  type: JournalDocument
  desc: The current document id
---

The user model.
