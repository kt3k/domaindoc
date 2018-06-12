---
name: Model
type: ValueObject
desc: Model represents the domain model of the domain
src: https://github.com/kt3k/domaindoc/blob/master/src/domain/model.js
edit: https://github.com/kt3k/domaindoc/edit/master/src/domain/model.md
props:
- name: name
  type: string
  desc: The name of the domain model
- name: type
  type: string
  desc: The type of the model
- name: labels
  type: string[]
  desc: The arbitrary list of labels of the model e.g. AggregateRoot etc
- name: path
  type: string
  desc: The path of the domain model document
- name: aliases
  type: string[]
  desc: The aliases of the domain model
- name: groupLabel
  type: string
  desc: The label of the group
- name: groupColor
  type: string
  desc: The color of the group
- name: description
  type: string
  desc: The description of the model
- name: sourceUrl
  type: string
  desc: The url of the source code of the model
- name: editUrl
  type: string
  desc: The url of the edit page of the source code of the model
- name: notes
  type: string
  desc: The notes about the model
- name: owners
  type: Model[]
  desc: The owners of the model
---
