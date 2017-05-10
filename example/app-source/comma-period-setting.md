---
name: CommaPeriodSetting
desc: The setting of comma and period for separating digits.
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/comma-period-setting.js
edit: https://github.com/kt3k/moneybit-app/blob/master/src/domain/comma-period-setting.md
props:
- name: name
  type: string
  desc: The name of the setting
---

CommaPeriodSetting represents the setting of the use of commas and periods in digits in number notation.

### Examples

- `comma-period` means notations like `$1,000,000.00`.
- `period-comma` means notations like `$1.000.000,00`.
