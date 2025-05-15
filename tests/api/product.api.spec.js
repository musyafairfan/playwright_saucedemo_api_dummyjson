import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const productName = faker.commerce.productName();
const productDescription = faker.commerce.productDescription();
const productPrice = faker.commerce.price();

test('GET All products', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products');
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('products'); // ada products
  expect(data.products.length).toBeGreaterThan(0); // ada product
  expect(data.products[0]).toHaveProperty('id'); // ada id
  expect(data.products[0]).toHaveProperty('title'); // ada title
  expect(data.products[0]).toHaveProperty('description'); // ada description
  expect(data.products[0]).toHaveProperty('price'); // ada price
  expect(data.products[0]).toHaveProperty('category'); // ada category
  expect(data.products[0]).toHaveProperty('images'); // ada image
});

test('GET Single product', async ({ request }) => {
  const id = 1;
  const response = await request.get(`https://dummyjson.com/products/${id}`);
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('id'); // ada id
  expect(data).toHaveProperty('title'); // ada title
  expect(data).toHaveProperty('description'); // ada description
  expect(data).toHaveProperty('price'); // ada price
  expect(data).toHaveProperty('category'); // ada category
  expect(data).toHaveProperty('images'); // ada image
});

test('Get product not found', async ({ request }) => {
  const id = 0;
  // id = 0 tidak ada di dummyjson.com
  const response = await request.get(`https://dummyjson.com/products/${id}`);
  expect(response.status()).toBe(404); // status 404
  const data = await response.json();
  expect(data).not.toHaveProperty('id'); // tidak ada data
  expect(data).toHaveProperty('message'); // ada message
  expect(data.message).toContain('not found'); // message = mengandung Not Found
});

test('Search product', async ({ request }) => {
  const search = 'smartphone';
  const response = await request.get(`https://dummyjson.com/products/search?q=${search}`);
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('products'); // ada products
  expect(data.products.length).toBeGreaterThan(0); // ada product
  expect(data.products[0]).toHaveProperty('id'); // ada id
  expect(data.products[0]).toHaveProperty('title'); // ada title
  expect(data.products[0]).toHaveProperty('description'); // ada description
  expect(data.products[0]).toHaveProperty('price'); // ada price
  expect(data.products[0]).toHaveProperty('category'); // ada category
  expect(data.products[0]).toHaveProperty('images'); // ada image
});

test('Get product by category', async ({ request }) => {
  const category = 'smartphones';
  const response = await request.get(`https://dummyjson.com/products/category/${category}`);
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('products'); // ada products
  expect(data.products.length).toBeGreaterThan(0); // ada product
  expect(data.products[0]).toHaveProperty('id'); // ada id
  expect(data.products[0]).toHaveProperty('title'); // ada title
  expect(data.products[0]).toHaveProperty('description'); // ada description
  expect(data.products[0]).toHaveProperty('price'); // ada price
  expect(data.products[0]).toHaveProperty('category'); // ada category
  expect(data.products[0]).toHaveProperty('images'); // ada image
});

test('Get product category list', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/category-list');
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  expect(data.length).toBeGreaterThan(0); // ada category
  expect(data).toContain('smartphones'); // ada category smartphones
});

test('Add product', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/products/add', {
    data: {
      title: productName,
      description: productDescription,
      price: productPrice,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  expect(response.status()).toBe(201); // status 201
  const data = await response.json();
  expect(data).toHaveProperty('id'); // ada id
  expect(data).toHaveProperty('title'); // ada title
  expect(data).toHaveProperty('description'); // ada description
  expect(data).toHaveProperty('price'); // ada price
  console.log(data); // log data ke console
});

test('Update product', async ({ request }) => {
  const id = 1;
  const response = await request.put(`https://dummyjson.com/products/${id}`, {
    data: {
      title: productName,
      description: productDescription,
      price: productPrice,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('id'); // ada id
  expect(data).toHaveProperty('title'); // ada title
  expect(data).toHaveProperty('description'); // ada description
  expect(data).toHaveProperty('price'); // ada price
});

test('Delete product', async ({ request }) => {
  const id = 1;
  const response = await request.delete(`https://dummyjson.com/products/${id}`);
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