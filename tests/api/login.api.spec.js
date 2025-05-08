import { test, expect } from '@playwright/test';

test('Auth Login', async ({ request }) => {
    const response = await request.post('https://dummyjson.com/auth/login', {
      data: {
        username: 'samanthal',
        password: 'samanthalpass',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(response.status('OK')).toBe(200); // status 200
    const data = await response.json();
    expect(data).toHaveProperty('accessToken'); // ada accessToken
    expect(data).toHaveProperty('refreshToken'); // ada refreshToken
    expect(data).toHaveProperty('id'); // ada id
    expect(data).toHaveProperty('username'); // ada username
    expect(data).toHaveProperty('email'); // ada email
    expect(data).toHaveProperty('firstName'); // ada firstName
    expect(data).toHaveProperty('lastName'); // ada lastName
    expect(data).toHaveProperty('gender'); // ada gander
    expect(data).toHaveProperty('image'); // ada image
  });