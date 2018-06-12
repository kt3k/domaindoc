---
name: AppState
type: ValueObject
desc: The state of application
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/language.js
edit: https://github.com/kt3k/moneybit-app/blob/master/src/domain/language.md
props:
- name: userId
  type: Id<User>
  desc: The user id
- name: deviceLanguage
  type: Language
  desc: The device's language
---

AppState model represents the state of the application.
