import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const randomUserId = faker.number.int({ min: 1, max: 500 });
const userId = faker.number.int({ min: 1, max: 10 });


test('GET All Carts', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/carts');
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  // Pastikan ada property 'carts' dan itu adalah array
  expect(Array.isArray(data.carts)).toBeTruthy();
  // Loop semua carts
  for (const cart of data.carts) {
    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('products');
    expect(Array.isArray(cart.products)).toBeTruthy();
    // Loop semua produk di dalam cart tersebut
    for (const product of cart.products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('quantity');
      expect(product).toHaveProperty('total');
      expect(product).toHaveProperty('discountPercentage');
      expect(product).toHaveProperty('discountedTotal');
      expect(product).toHaveProperty('thumbnail');
    }
    expect(cart).toHaveProperty('total');
    expect(cart).toHaveProperty('discountedTotal');
    expect(cart).toHaveProperty('userId');
    expect(cart).toHaveProperty('totalProducts');
    expect(cart).toHaveProperty('totalQuantity');    
  }
});

test('GET Single Cart', async ({ request }) => {
  const id = 1;
  const response = await request.get(`https://dummyjson.com/carts/${id}`);
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('products');
    expect(Array.isArray(data.products)).toBeTruthy();
    // Loop semua produk di dalam cart tersebut
    for (const product of data.products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('quantity');
      expect(product).toHaveProperty('total');
      expect(product).toHaveProperty('discountPercentage');
      expect(product).toHaveProperty('discountedTotal');
      expect(product).toHaveProperty('thumbnail');
    }
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('discountedTotal');
    expect(data).toHaveProperty('userId');
    expect(data).toHaveProperty('totalProducts');
    expect(data).toHaveProperty('totalQuantity');    
});

test('Get Cart Not Found', async ({ request }) => {
  const id = 0;
  // id = 0 tidak ada di dummyjson.com
  const response = await request.get(`https://dummyjson.com/carts/${id}`);
  expect(response.status()).toBe(404); // status 404
  const data = await response.json();
  expect(data).not.toHaveProperty('id'); // tidak ada data
  expect(data).toHaveProperty('message'); // ada message
  expect(data.message).toContain('not found'); // message = mengandung Not Found
});

test('Get Cart by User ID', async ({ request }) => {
  const response = await request.get(`https://dummyjson.com/carts/user/${randomUserId}`);
// cek userId ada atau tidak
if (response.status() === 200) {
  const data = await response.json();
  // cek apakah ada carts
  if (data.carts.length > 0) {
    // ✅ Kondisi 1: User ID ada cart-nya
    console.log(`User ${randomUserId} has carts`);
    expect(data.carts.length).toBeGreaterThan(0);
    expect(Array.isArray(data.carts)).toBeTruthy();
  // Loop semua carts
  for (const cart of data.carts) {
    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('products');
    expect(Array.isArray(cart.products)).toBeTruthy();
    // Loop semua produk di dalam cart tersebut
    for (const product of cart.products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('quantity');
      expect(product).toHaveProperty('total');
      expect(product).toHaveProperty('discountPercentage');
      expect(product).toHaveProperty('discountedTotal');
      expect(product).toHaveProperty('thumbnail');
    }
    expect(cart).toHaveProperty('total');
    expect(cart).toHaveProperty('discountedTotal');
    expect(cart).toHaveProperty('userId');
    expect(cart).toHaveProperty('totalProducts');
    expect(cart).toHaveProperty('totalQuantity');    
  }
  } else {
    // ✅ Kondisi 2: User ID valid, tapi cart kosong
    console.log(`User ${randomUserId} has no carts`);
    expect(data.carts.length).toBe(0);
    expect(data.carts).toEqual([]);
    expect(data.total).toBe(0);
  }

} else if (response.status() === 404) {
  // ✅ Kondisi 3: User ID tidak ditemukan
  console.log(`User ${randomUserId} not found`);
  expect(response.status()).toBe(404);
}

});

test('Add cart', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/carts/add', {
    data: {
      userId: userId,
      products: [
        {
          id: 1,
          quantity: 1,
        },
        {
          id: 2,
          quantity: 2,
        },
      ],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  expect(response.status()).toBe(201); // status 201
  const data = await response.json();
  expect(data).toHaveProperty('id'); // ada id
  expect(data).toHaveProperty('products'); // ada products
  expect(Array.isArray(data.products)).toBeTruthy(); // products adalah array
  for (const product of data.products) {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('quantity');
    expect(product).toHaveProperty('total');
    expect(product).toHaveProperty('discountPercentage');
    expect(product).toHaveProperty('discountedPrice');
    expect(product).toHaveProperty('thumbnail');
  }
  expect(data).toHaveProperty('total');
  expect(data).toHaveProperty('discountedTotal');
  expect(data).toHaveProperty('userId');
  expect(data).toHaveProperty('totalProducts');
  expect(data).toHaveProperty('totalQuantity');
  console.log(data); // log data ke console
});

test('Update cart', async ({ request }) => {
  const id = 1;
  const response = await request.put(`https://dummyjson.com/carts/${id}`, {
    data: {
      merge: true,
      products: [
        {
          id: 1,
          quantity: 2,
        },
        {
          id: 2,
          quantity: 3,
        },
      ],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  expect(response.status()).toBe(200); // status 200
  const data = await response.json();
  expect(data).toHaveProperty('id'); // ada id
  expect(data).toHaveProperty('products'); // ada products
  expect(Array.isArray(data.products)).toBeTruthy(); // products adalah array
  for (const product of data.products) {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('quantity');
    expect(product).toHaveProperty('total');
    expect(product).toHaveProperty('discountPercentage');
    expect(product).toHaveProperty('discountedPrice');
    expect(product).toHaveProperty('thumbnail');
  }
  expect(data).toHaveProperty('total');
  expect(data).toHaveProperty('discountedTotal');
  expect(data).toHaveProperty('userId');
  expect(data).toHaveProperty('totalProducts');
  expect(data).toHaveProperty('totalQuantity');
  console.log(data); // log data ke console
});

test('Delete cart', async ({ request }) => {
  const id = 1;
  const response = await request.delete(`https://dummyjson.com/carts/${id}`);
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