development: &development
  adapter: postgresql
  encoding: unicode
  database: pj_manager_development
  pool: 5
  username: username
  password: password

test:
  <<: *development
  database: pj_manager_test