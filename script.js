let url = "http://localhost:5685"
let two = document.querySelector('.two2')

axios.get(url + '/tasks')
    .then(res => {
        if(res.status == 200 || res.status == 201) {
            reload(res.data)
        }
    })


function reload(arr) {
    two.innerHTML = ""
    for (let item of arr) {
        let all = document.createElement('div')
        let all2 = document.createElement('div')
        let button = document.createElement('div')

        let buttonx = document.createElement('button')

        let text = document.createElement('span')
        let time = document.createElement('span')


        all.classList.add('div')
        all2.classList.add('div2')

        button.classList.add('button')
        buttonx.classList.add('buttonx')
        buttonx.innerHTML = 'x'

        text = item.task
        time = item.time


        all.append(button)
        button.append(all2, buttonx)
        all2.append(text, time)
        two.append(all)

        buttonx.onclick = () => {
            all.remove()
        }

        button.onclick = () => {
            all.style.display = "none"
        }
    }
}

let form = document.forms.add
let inp = document.querySelector('.inp')

form.onsubmit = (e) => {

    let obj = {
        id: Math.random(),
        isDone: false,
        time: new Date().getHours() + ':' + new Date().getMinutes()
    }

    let fm = new FormData(form)

    if (inp.value.length > 0) {
        fm.forEach((value, key) => {
            obj[key] = value
        })
        axios.post(url + '/tasks', obj)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    console.log('good');
                }
            })
            .catch(err => console.log(err))
    } else {
        alert('Введите текст')
    }
}
