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