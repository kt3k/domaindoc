---
name: JournalDocument
type: Entity
desc: The journal document model
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/journal-document.js
edit: https://github.com/kt3k/moneybit-app/blob/master/src/domain/journal-document.md
props:
- name: id
  type: string
  desc: The id of the document
- name: title
  type: string
  desc: The title of the document
- name: journalId
  type: Id<Journal>
  desc: The id of the journal of the document
- name: chartId
  type: Id<AccountTypeChart>
  desc: The id of the chart of the account types
- name: currency
  type: Currency
  desc: The currency of the document
- name: start
  type: moment
  desc: The start date of the document
- name: end
  type: moment
  desc: The end date of the document
- name: commaPeriodSetting
  type: CommaPeriodSetting
  desc: The setting of comma and period for separating number
- name: accountTypeRecentList
  type: AccountTypeRecentList
  desc: The recently used account types
---

JournalDocument is the unit of the accounting document in moneybit app.
