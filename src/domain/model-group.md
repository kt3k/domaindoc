---
name: ModelGroup
type: ValueObject
desc: ModelGroup represents the group of model.
src: https://github.com/kt3k/domaindoc/blob/master/src/domain/model-group.js
edit: https://github.com/kt3k/domaindoc/edit/master/src/domain/model-group.md
props:
- name: label
  type: string
  desc: The label of the group
- name: color
  type: string
  desc: The color of the group
- name: models
  type: Model[]
  desc: The models which belong the group
---
