# TODO

- Add fm.type optional property
- Show in tree structure of has-a relationship
- Show the model's owners, for example Credit's owner is Trade etc.

# DONE
- Enable multiple source directories
- Make configfile yaml .domodoc.yml
- .domodoc.yml
  - title: The Foo App Domain Models
    source:
    - src/domain
    - node_modules/foo-core-domain/
    dest: build
    port: 9660
    basepath: ./
