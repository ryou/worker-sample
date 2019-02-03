# Workerのサンプル

## メインスレッド側

```
const worker = new Worker('worker.js');

const sendMessage = message => {
    return new Promise((resolve, reject) => {
        worker.onmessage = e => {
            if (e.data.error) {
                reject(e.data.error);
            } else {
                resolve(e.data);
            }
        };

        worker.postMessage(message);
    });
};

sendMessage('workerに送るメッセージ')
    .then(response => {
        // レスポンスに対して任意の処理を行う
    });
```

## Workerスレッド側

```
self.addEventListener('message', event => {
    const request = event.data; // event.dataにメインスレッドで与えられたパラメータが格納されている
    self.postMessage('メインスレッドへ送るメッセージ');
});
```
