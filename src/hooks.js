// src/hooks.js
export async function handleError({ error }) {
    console.error('Caught Error:', error); // Log the error (optional)
    return {
      message: 'An error occurred, but we handled it gracefully.',
      status: 500,
    };
  }
  