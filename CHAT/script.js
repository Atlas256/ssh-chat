console.log('chat')

const chat = document.querySelector(".chat");
const btnSend = document.querySelector("#btnSend");

let lastSize = 0;
let currentSize = 1;




window.onload = e => e.preventDefault()

const delay = (delay) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

const update = () => {
    console.log(lastSize + ' ' + currentSize)

    delay(100).then(() => {
        fetch("server/chat.chat")
            .then(file =>
                file.blob().then(blob => {

                    currentSize = blob.size;
                    update();

                    if (currentSize !== lastSize) {
                        lastSize = currentSize;
                        render();
                    }
                })
            )
    })
}

const render = () => {

    chat.removeChild(document.querySelector('.list'));
    const list = document.createElement('div');
    list.className = "list";
    chat.appendChild(list);

    fetch("server/chat.chat")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let str = data.split('\n');
            str.forEach(line => {
                const mail = document.createElement('p');
                mail.className = "mail";
                mail.textContent = line + '\n';
                list.appendChild(mail)
            })
        });

    btnSend.addEventListener("click", (e) => {
        window.location.reload(true);
    })
}

update();