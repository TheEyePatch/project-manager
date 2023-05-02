# Dependencies

```
  Ruby version 2.6.5
  Node version 16.0
  Yarn version 1.22.19
```

### Using Docker

1. Build the app docker image
``` bash
# to build app image
docker compose build

```
<img width="1088" alt="Screen Shot 2023-05-02 at 4 22 44 PM" src="https://user-images.githubusercontent.com/76772310/235616476-3fa59a4e-8cb2-4aaf-9cc6-f7f2994327ef.png">

2. Run the docker container to run the docker environment and pull other images
such as postgres and redis

``` bash
# To run container along with other images
docker compose up
```
