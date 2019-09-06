(function() {
    const modals = document.querySelectorAll('.modal');
    const forms = document.querySelectorAll('form');
    const formTitle = document.querySelector('.first__right');
    const showModalButtons = document.querySelectorAll('.show-modal-button');
    let animationDuration = 300;

    validate(formTitle);

    showModalButtons.forEach(button => {
        button.onclick = (e) => {
            const modalRequest = document.querySelector('.modal');
            modalRequest.style.display = 'block';
            modalRequest.style.transition = `${animationDuration}ms`;
            setTimeout(() => {
                modalRequest.style.opacity = 1;
            }, 0);
        }
    });

    modals.forEach(modal => {
        modal.onclick = (e) => {
            if (e.target === modal || e.target.id === 'modal__close') {
                modal.style.transition = `${animationDuration}ms`;
                modal.style.opacity = 0;
                setTimeout(() => {
                    modal.style.display = 'none';
                }, animationDuration);
            }
        }
    });

    forms.forEach(form => {
        validate(modal, true);
        form.onsubmit = (e) => {
            e.preventDefault();
            const inputs = form.getElementsByTagName("input");
            const inputList = Array.prototype.slice.call(inputs);
            let err = [];
            let request = {};

            inputList.forEach((elem) => {
                if (elem.name && (elem.style.borderBottom === '1px solid red' || elem.value === '')) {
                    err.push(`${elem.name} invalid`);
                } else if (elem.value.length > 0 && elem.name) {
                    request[elem.name] = elem.value;
                }
            });

            if (err.length) {
                console.error(err);
            } else {
                fetch('http://cdn.khodyr.ru/folder/backend/api.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request)
                })
                .then(data => data.text())
                .then(response => {
                    console.log(response);
                    alert('Готово');
                })
            }
        }
    });

    function validate(container) {
        container.onclick = e => {
            switch (e.target.name) {
                case 'phone':
                    if (e.target.value === '') {
                        e.target.value = '+7';
                        e.target.style.backgroundImage = 'url(img/invalid.png)';
                    }
                    if (!e.target.onblur) {
                        const defaultBorder = e.target.style.borderBottom;
                        e.target.onblur = () => {
                            if (e.target.value === '+7') {
                                e.target.value = '';
                                e.target.style.backgroundImage = 'url()';
                                e.target.style.borderBottom = defaultBorder;
                                e.target.parentNode.style.color = 'transparent';
                            } else if (e.target.value === '') {
                                e.target.style.backgroundImage = 'url()';
                                e.target.style.borderBottom = defaultBorder;
                                e.target.parentNode.style.color = 'transparent';
                            } else {
                                if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g.test(e.target.value)) {
                                    e.target.style.borderBottom = '1px solid red';
                                    e.target.style.backgroundImage = 'url(img/invalid.png)';
                                    e.target.parentNode.style.color = '#fff';
                                } else {
                                    e.target.style.backgroundImage = 'url()';
                                    e.target.style.borderBottom = defaultBorder;
                                    e.target.parentNode.style.color = 'transparent';
                                }
                            }
                        }
                    }
                    break;
            }
        }

        container.onkeydown = (e) => {
            switch (e.target.name) {
                case 'phone':
                    if (e.target.value.length > 1 && !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g.test(e.target.value)) {
                        e.target.parentNode.style.color = '#fff';
                        e.target.style.backgroundImage = 'url(img/invalid.png)';
                    } else {
                        e.target.parentNode.style.color = 'transparent';
                        e.target.style.backgroundImage = 'url()';
                    }
                    break;

                case 'time':

                    break;
            }
        }
    }
})();


