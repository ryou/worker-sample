const sumOneToNumber = number => {
    let total = 0;
    for (let i=1; i<=number; i++) {
        total += i;
    }

    return total;
};

self.addEventListener('message', event => {
    console.log(`**** message start ****`);

    const postMessage = (code, message) => {
        self.postMessage({ code, message });
    };

    const number = event.data;
    const sum = sumOneToNumber(number);

    postMessage(200, sum);
});
