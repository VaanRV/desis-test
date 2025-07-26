export function requestGenerator(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 ) {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject('Error parsing JSON: ' + e);
          }
        } else {
          reject('HTTP error ' + xhr.status);
        }
      }
    };

    if (method === 'POST' && data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  });
}