\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE lifetracker_test;
CREATE DATABASE lifetracker_test;
\connect lifetracker_test;

\i lifetracker_test_schema.sql