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

...
 => [project-manager_vite  9/12] COPY . /project-manager                                                                                                                     2.9s
 => [project-manager_vite 10/12] RUN npm install --force                                                                                                                    46.8s
 => [project-manager_vite 11/12] RUN gem install bundler:1.17.2                                                                                                             17.8s
 => [project-manager_vite 12/12] RUN bundle install                                                                                                                        218.4s
 => [project-manager_sidekiq] exporting to image                                                                                                                            11.3s
 => => exporting layers                                                                                                                                                     11.1s
 => => writing image sha256:0768702e90aaa4cdc0e81f478b83784011208d555dde27601fda66d837badd64                                                                                 0.0s
 => => naming to docker.io/library/project-manager_vite                                                                                                                      0.0s
 => => naming to docker.io/library/project-manager_app                                                                                                                       0.0s
 => => naming to docker.io/library/project-manager_sidekiq
```

2. Run the docker container to run the docker environment and pull other images
such as postgres and redis

``` bash
# To run container along with other images
docker compose up

...
project-manager-vite-1     |
project-manager-vite-1     |   ➜  Local:   http://localhost:3036/vite-dev/
project-manager-vite-1     |   ➜  Network: http://172.18.0.5:3036/vite-dev/
project-manager-vite-1     | 2023-06-21T08:26:44.472Z vite:esbuild 1006.21ms tsconfck init /project-manager
project-manager-sidekiq-1  | 2023-06-21T08:26:48.816Z pid=1 tid=gnfo495qt INFO: Booting Sidekiq 6.5.5 with Sidekiq::RedisConnection::RedisAdapter options {:url=>"redis://redis:6380/0", :network_timeout=>10}
project-manager-sidekiq-1  | 2023-06-21T08:26:49.950Z pid=1 tid=gnfo495qt INFO: Booted Rails 6.0.6 application in development environment
project-manager-sidekiq-1  | 2023-06-21T08:26:49.951Z pid=1 tid=gnfo495qt INFO: Running in ruby 2.6.5p114 (2019-10-01 revision 67812) [x86_64-linux]
project-manager-sidekiq-1  | 2023-06-21T08:26:49.951Z pid=1 tid=gnfo495qt INFO: See LICENSE and the LGPL-3.0 for licensing details.
project-manager-sidekiq-1  | 2023-06-21T08:26:49.951Z pid=1 tid=gnfo495qt INFO: Upgrade to Sidekiq Pro for more features and support: https://sidekiq.org
project-manager-app-1      | => Booting Puma
project-manager-app-1      | => Rails 6.0.6 application starting in development
project-manager-app-1      | => Run `rails server --help` for more startup options
project-manager-app-1      | Puma starting in single mode...
project-manager-app-1      | * Version 4.3.12 (ruby 2.6.5-p114), codename: Mysterious Traveller
project-manager-app-1      | * Min threads: 5, max threads: 5
project-manager-app-1      | * Environment: development
project-manager-app-1      | * Listening on tcp://0.0.0.0:3000
project-manager-app-1      | Use Ctrl-C to stop
```
