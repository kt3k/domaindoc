---
name: Document
desc: The document model
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/document.js
edit: https://github.com/kt3k/moneybit-app/blob/master/src/domain/document.md
props:
- name: id
  type: string
  desc: The id of the document
- name: name
  type: string
  desc: The name of the document
- name: journalId
  type: string
  desc: The id of the journal of the document
- name: chartId
  type: string
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
---

Document is the unit of the accounting document in moneybit app.
