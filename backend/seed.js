async function seed() {
  try {
    console.log("Seeding dresses...");
    await fetch('http://localhost:5000/api/dresses/seed', { method: 'POST' });
    console.log("Seeding bookings...");
    await fetch('http://localhost:5000/api/bookings/seed', { method: 'POST' });
    
    console.log("Registering admin...");
    await fetch('http://localhost:5000/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'admin@glimmer.lk', password: 'admin123', role: 'admin', name: 'Admin User' }) });
    
    console.log("Registering staff...");
    await fetch('http://localhost:5000/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'staff@glimmer.lk', password: 'staff123', role: 'staff', name: 'Staff User' }) });

    console.log("Registering customer...");
    await fetch('http://localhost:5000/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'user@glimmer.lk', password: 'user123', role: 'customer', name: 'Test Customer' }) });

    console.log("Done seeding.");
  } catch(e) {
    console.error(e);
  }
}

seed();
