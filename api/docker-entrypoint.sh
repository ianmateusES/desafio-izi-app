#!/bin/sh

if [ -e $(pwd)/'rundb' ]; then
  echo 'Tabelas já criadas'
else
  yarn typeorm:run migration:run
  echo '' >> rundb
fi

exec "$@"
