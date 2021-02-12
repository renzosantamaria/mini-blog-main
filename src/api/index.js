const BASE_URL = `http://localhost:5000/api/posts`;

export async function createPost(payload){
    const request = await fetch('http://localhost:5000/api/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
    })
    return request
  }

export async function readPost() {
    try {
        const request = await fetch(`${BASE_URL}`);
        const data = await request.json();
        return data;
      } catch (error) {
        return error.message;
      }
}
export async function updatePost(payload) {
    await fetch(`http://localhost:5000/api/posts/${payload.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
    })
}
export async function deletePost(payload) {
    await fetch(`http://localhost:5000/api/posts/${payload}`, {
    method: 'DELETE',
    })
}
