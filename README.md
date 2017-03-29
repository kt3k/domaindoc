# domaindoc v1.6.0

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Generate documentation site of domain models from markdown sources

`domaindoc` is a command line tool for creating documentation site of your domain models using markdown files.

# Getting Started

First install it via npm:

    npm install domaindoc

Then write markdown files for models like the below:

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

Then run the command `domaindoc serve` like the below:

    $ ./node_modules/.bin/domaindoc serve
    domaindoc [01:18:38] serving
    domaindoc [01:18:38] Reading: source/**/*.md
    domaindoc [01:18:38] Reading: source/**/*.md
    domaindoc [01:18:38] Reading: source/**/*.css
    domaindoc [01:18:38] Server started at: http://0.0.0.0:8011/
    domaindoc [01:18:38] See debug info at: http://0.0.0.0:8011/__domaindoc__
    domaindoc [01:18:38] Ready: source/**/*.css
    domaindoc [01:18:38] Ready: source/**/*.md
    domaindoc [01:18:38] Ready: source/**/*.md

Then access http://0.0.0.0:8011/index.html and you'll be seeing the documentation site:

(ScreenShot)

And when you finish modifying the source files, then hit the command `domaindoc build` like the below:

    $ ./node_modules/.bin/domaindoc build
    domaindoc [20:31:14] building
    domaindoc [20:31:14] done

And then you get html documentation files in `build/` directory.

# Properties

You can use properties in YAML front matter in the markdown sources.

name | type | meaning
-----|------|---------
name | string | The name of the domain model (required)
desc | string | The description of the domain model (required)
src  | string | The url of the source code of the model (optional)
props | Property[] | The properties of the domain model (optional)

Each *Property* object has the following properties in it.

name | type | meaning
-----|------|---------
name | string | The name of the property (required)
type | string | The type of the property (required)
desc | string | The description of the property (optional)

# Example

- [Demo document](http://kt3k.github.io/moneybit/)
  - [The source code](https://github.com/kt3k/moneybit/tree/master/packages/moneybit-domain)

<img src="https://kt3k.github.io/domaindoc/media/demo-page.png" />

<img src="https://kt3k.github.io/domaindoc/media/demo-index.png" />

# License

MIT
