set +e
docker-compose build
docker-compose run --rm test
exitcode=$?
docker-compose down
exit $exitcode
set -e
