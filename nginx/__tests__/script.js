import { check } from 'k6';
import http from 'k6/http';

export default function testLoadBalancer() {
  const url = 'http://host.docker.internal:5100/';
  const res = http.get(url);
  check(
    res,
    {
      'is status 200': (r) => r.status === 200,
    },
    { my_tag: res.body },
  );
}

/* to run this test use this command:
docker run --rm -i grafana/k6 run -u 200 -d 30s - <script.js
NB: rate limiter should be off
*/
