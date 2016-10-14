# domaindoc v1.0.0

> Generate documentation site of domain models from .md sources

`domaindoc` is a command line tool for creating documentation site of your domain models using markdown files.

# Getting Started

First install it via npm:

    npm install domaindoc

Then write markdowns, for example:

(source/user.md):
```
---
name: User
desc: The user model
props:
  - name: id
    type: string
    desc: The id of the user
  - name: name
    type: string
    desc: The name of the user
---

User represents an user account in the service.
```

(source/item.md):
```
---
name: Item
desc: The item model
props:
  - name: id
    type: string
    desc: The id of the item
  - name: name
    type: string
    desc: The name of the item
---

Item represents the item in the service. An user has 0 or more items.
```

Then run the command like the below:

    $ domaindoc serve
    domaindoc [01:18:38] serving
    domaindoc [01:18:38] Reading: source/**/*.md
    domaindoc [01:18:38] Reading: source/**/*.md
    domaindoc [01:18:38] Reading: source/**/*.css
    domaindoc [01:18:38] Server started at: http://0.0.0.0:8011/
    domaindoc [01:18:38] See debug info at: http://0.0.0.0:8011/__domaindoc__
    domaindoc [01:18:38] Ready: source/**/*.css
    domaindoc [01:18:38] Ready: source/**/*.md
    domaindoc [01:18:38] Ready: source/**/*.md

Then access http://0.0.0.0:8011/index.html and you see the documentation site:

(ScreenShot)

# License

MIT
