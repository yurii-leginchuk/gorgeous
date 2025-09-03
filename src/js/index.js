import "./import/modules";
import "./import/components";
import "./inputmask.min";

(() => {
    Inputmask({
        mask: "+7 (999) 999-99-99",
        showMaskOnHover: false,
        clearIncomplete: true
    }).mask("#tel");
})();

(() => {
    const forms = document.querySelectorAll(".gs-form");

    forms.forEach(form => {
        const fioInput = form.querySelector("input[name='fio']");
        const telInput = form.querySelector("input[name='tel']");


        const validateFio = () => {
            const value = fioInput.value.trim();
            return /^[А-Яа-яЁёA-Za-z\s]{2,}$/.test(value);
        };

        const validateTel = () => {
            return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(telInput.value);
        };


        form.addEventListener("submit", (e) => {
            let valid = true;

            if (!validateFio()) {
                fioInput.classList.add("error");
                valid = false;
            }
            if (!validateTel()) {
                telInput.classList.add("error");
                valid = false;
            }

            if (!valid) {
                e.preventDefault();

            }
        });

        fioInput.addEventListener("input", () => {
            if (fioInput.classList.contains("error") && validateFio()) {
                fioInput.classList.remove("error");
            }
        });

        telInput.addEventListener("input", () => {
            if (telInput.classList.contains("error") && validateTel()) {
                telInput.classList.remove("error");
            }
        });
    });
})();

(() => {
    const menuBtn = document.querySelector(".toggle-menu");

    if(menuBtn) {
        menuBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const header = document.querySelector(".main-header");

            if(header) {
                header.classList.toggle("menu-opened");
                document.querySelector("html").classList.toggle("no-scroll");
            }
        });
    }
})();