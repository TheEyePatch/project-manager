#!/bin/sh
bin/rails db:prepare

rm -f tmp/pids/server.pid
bin/rails server -b 0.0.0.0