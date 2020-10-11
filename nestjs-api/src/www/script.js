const socket = new WebSocket('ws://localhost:8080');
socket.onopen = async function () {
  console.log('Connected');
  console.log('Test');
  socket.send(
    JSON.stringify({
      event: 'events',
      data: 'test'
    })
  );
  console.log('Login');
  const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'john.marston',
      password: 'password'
    })
  });
  const loginPayload = await loginResponse.json();
  const accessToken = loginPayload.access_token;
  console.log(`Access Token: ${accessToken}`);
  console.log('Get User');
  socket.send(
    JSON.stringify({
      event: 'auth/user',
      data: {
        access_token: accessToken,
        message: 'test'
      }
    })
  );
  socket.onmessage = function (data) {
    console.log(data);
  };
  socket.onerror = function (error) {
    console.error(error);
  }
};