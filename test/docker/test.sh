set +e
docker-compose run --rm test
exitcode=$?
docker-compose down
exit $exitcode
set -e
