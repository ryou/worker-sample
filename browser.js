const worker = new Worker('worker.js');

const sumOneToNumber = number => {
    let total = 0;
    for (let i=1; i<=number; i++) {
        total += i;
    }

    return total;
};

const getCurrentInputNumber = () => {
    const inputElement = document.querySelector('input.js-input');

    return inputElement.value;
};

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

const init = () => {
    const sumButtonElement = document.querySelector('.js-sum');
    const workerSumButtonElement = document.querySelector('.js-worker-sum');
    const resultElement = document.querySelector('.js-result');

    const setText = (text) => {
        resultElement.innerHTML = text;
    };

    sumButtonElement.addEventListener('click', () => {
        setText('計算中...');

        setTimeout(() => {
            const sum = sumOneToNumber(getCurrentInputNumber());

            setText(sum);
        }, 0);
    });

    workerSumButtonElement.addEventListener('click', () => {
        setText('計算中...');

        sendMessage(getCurrentInputNumber())
            .then(response => {
                console.log(response);
                
                setText(response.message);
            });
    });
};

init();
