import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const url = 'http://localhost:5000/';
  const res = http.get(url);
  check(
    res,
    {
      'is status 200': (r) => r.status === 200,
    },
    { my_tag: res.body }
  );
}
