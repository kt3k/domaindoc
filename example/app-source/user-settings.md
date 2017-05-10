---
name: UserSettings
desc: The miscellaneous settings of the user
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/user-settings.js
edit: https://github.com/kt3k/moneybit-app/blob/master/src/domain/user-settings.md
props:
- name: defaultChartId
  type: string
  ref: AccountTypeChart
  desc: The chart id of the default chart the user use when they create the new document
- name: language
  type: Language
  desc: The language the user use
---
The miscellaneous settings of the user.
