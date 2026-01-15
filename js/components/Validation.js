export function initValidation() {
    const validation = new JustValidate('#form')

    validation.addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Введите ваше имя'
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальная длина три символа'
        },
        {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Максимальная длина двадцать символов'
        },

    ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Введите вашу почту'
            },
            {
                rule: 'email',
                errorMessage: 'Почта введена неверно'
            }
        ])
        .addField('#agree', [
            {
                rule: 'required',
                errorMessage: 'Согласие обязательно'
            },

        ])
        .onSuccess(event => {
            event.preventDefault();
            handleFormSubmit(event.target);
        });
}

async function handleFormSubmit(form) {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const agree = document.getElementById("agree").checked;

    const dataForm = {
        name: name,
        email: email,
        agree: agree
    };
    await createDataFormServer(dataForm)
    form.reset();
}


function initModal() {
    const modal = document.querySelector('.modal');
    const modalBtn = document.querySelector('.modal__btn');
    const errorMessage = document.querySelector('.modal__message--error');
    const successMessage = document.querySelector('.modal__message--success');

    modalBtn.addEventListener('click', (e) => {
        e.preventDefault(); // если кнопка <a>
        modal.classList.remove('modal--open');
        errorMessage.classList.remove('is-visible');
        successMessage.classList.remove('is-visible');
    });

    modal.addEventListener('click', (e) => {
        e.preventDefault(); // если кнопка <a>
        modal.classList.remove('modal--open');
    });
}

function showModal(success) {
    const modal = document.querySelector('.modal');
    const errorMessage = document.querySelector('.modal__message--error');
    const successMessage = document.querySelector('.modal__message--success');

    modal.classList.add('modal--open');
    errorMessage.classList.remove('is-visible');
    successMessage.classList.remove('is-visible');

    if (success) {
        successMessage.classList.add('is-visible');
    } else {
        errorMessage.classList.add('is-visible');
    }
}

initModal();

async function createDataFormServer(dataForm) {
    console.log('Отправляем данные на сервер с формы', dataForm);

    try {
        const response = await fetch("https://httpbin.org/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const result = await response.json();
        console.log('Ответ сервера:', result);
        showModal(true);

    } catch (error) {
        console.error('Произошла ошибка при отправке:', error);
        showModal(false);
    }
}

