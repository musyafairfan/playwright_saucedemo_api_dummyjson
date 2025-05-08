import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const age = faker.number.int({ min: 1, max: 100 });

test('GET All users', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/users');
  expect(response.status('OK')).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('users'); // ada users
  expect(data.users.length).toBeGreaterThan(0); // ada user
});

test('GET Single user', async ({ request }) => {
  const id = 2;
  const response = await request.get(`https://dummyjson.com/users/${id}`);
  expect(response.status('OK')).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('role'); // ada role
  expect(data).toHaveProperty('id'); // ada id
  expect(data.id).toBe(2); // id = 2
  console.log(data); // log data ke console
});

test('Get user not found', async ({ request }) => {
  const id = 0;
  // id = 0 tidak ada di dummyjson.com
  const response = await request.get(`https://dummyjson.com/users/${id}`);
  expect(response.status('Not Found')).toBe(404); // status 404
  const data = await response.json();
  expect(data).not.toHaveProperty('role'); // tidak ada data
  expect(data).toHaveProperty('message'); // ada message
  expect(data.message).toContain('not found'); // message = mengandung Not Found
  console.log(data); // log data ke console
});

test('Add user', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/users/add', {
    data: {
      firstName: firstname,
      lastName: lastname,
      age: age
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
  expect(response.status('Created')).toBe(201); // status 201
  const data = await response.json();
  console.log(data); // log data ke console
  expect(data).toHaveProperty('firstName'); // ada firstName
  expect(data).toHaveProperty('lastName'); // ada lastName
  expect(data).toHaveProperty('age'); // ada age
  expect(data).toHaveProperty('id'); // ada id
  expect(data.firstName).toBe(`${firstname}`); // firstName = menyesuaikan dari faker
  console.log(data.firstName); // log firstName ke console
  expect(data.lastName).toBe(`${lastname}`); // lastName = menyesuaikan dari faker
  console.log(data.lastName); // log lastName ke console
  expect(data.age).toBe(age); // age = menyesuaikan dari faker
  console.log(data.age); // log age ke console
});

test('Update user', async ({ request }) => {
  const id = 1;
  const response = await request.put(`https://dummyjson.com/users/${id}`, {
    data: {
      firstName: firstname,
      lastName: lastname,
      age: age
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
  expect(response.status('OK')).toBe(200); // status 200
  const data = await response.json();
  console.log(data); // log data ke console
  expect(data).toHaveProperty('firstName'); // ada firstName
  expect(data).toHaveProperty('lastName'); // ada lastName
  expect(data).toHaveProperty('age'); // ada age
  expect(data).toHaveProperty('id'); // ada id
  expect(data.firstName).toBe(`${firstname}`); // firstName = menyesuaikan dari faker
  console.log(data.firstName); // log firstName ke console
  expect(data.lastName).toBe(`${lastname}`); // lastName = menyesuaikan dari faker
  console.log(data.lastName); // log lastName ke console
  expect(data.age).toBe(age); // age = menyesuaikan dari faker
  console.log(data.age); // log age ke console
});

test('Delete user', async ({ request }) => {
  const id = 1;
  const response = await request.delete(`https://dummyjson.com/users/${id}`);
  expect(response.status('OK')).toBe(200); // status 200
  const data = await response.json();
  console.log(data); // log data ke console
  expect(data.isDeleted).toBe(true); // ada message
  const deletedOn = data.deletedOn; // define deletedOn
  expect(deletedOn).toBeDefined(); // ada deletedOn
  const deletedDate = new Date(data.deletedOn);
  const today = new Date();
  // Ambil hanya bagian tanggal, bulan, dan tahun
  const deletedDateOnly = deletedDate.toISOString().split('T')[0];
  const todayOnly = today.toISOString().split('T')[0];
  expect(deletedDateOnly).toBe(todayOnly); // Pastikan deletedOn adalah hari ini
});