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

(() => {
    function updateContainerRightGap() {
        const container = document.querySelector('.container');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const gap = window.innerWidth - rect.right;

        document.documentElement.style.setProperty('--container-right-gap', `${gap}px`);
    }

    updateContainerRightGap();
    window.addEventListener('resize', updateContainerRightGap);

})();

(() => {
    const videoSlider = document.querySelector(".video-slider");
    const videoSliderInstance = new Swiper(videoSlider, {
        slidesPerView: "auto",
        spaceBetween: 13,
        breakpoints: {
            768: {
                spaceBetween: 25
            },
        },
        navigation: {
            nextEl: videoSlider.closest(".slider-container").querySelector(".next"),
            prevEl: videoSlider.closest(".slider-container").querySelector(".prev"),
        },
    });
})();

(() => {
    const wrappers = document.querySelectorAll('.video-wrapper');
    if (!wrappers.length) return;

    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
    const videos = [];

    wrappers.forEach((wrapper) => {
        const video = wrapper.querySelector('.video');
        const playBtn = wrapper.querySelector('.play-btn');
        const progress = wrapper.querySelector('.progress');
        if (!video) return;

        videos.push(video);

        video.muted = false;
        video.playsInline = true;
        video.preload = video.preload || 'metadata';

        const showBtn = () => wrapper.classList.remove('is-playing');
        const hideBtn = () => wrapper.classList.add('is-playing');
        const togglePlay = () => { if (video.paused) video.play(); else video.pause(); };
        const pauseOthers = (current) => { videos.forEach(v => { if (v !== current && !v.paused) v.pause(); }); };

        const onMouseEnter = () => { if (isDesktop() && video.paused) video.play(); };
        const onMouseLeave = () => { if (isDesktop() && !video.paused) video.pause(); };
        const onClick = (e) => {
            if (isDesktop()) return;
            if (e.target.closest('.progressbar')) return;
            togglePlay();
        };

        const onPlay = () => { pauseOthers(video); hideBtn(); };
        const onPause = () => showBtn();
        const onTimeUpdate = () => {
            if (!progress) return;
            const dur = video.duration;
            if (!dur || !isFinite(dur)) return;
            const percent = Math.min(100, Math.max(0, (video.currentTime / dur) * 100));
            progress.style.width = percent + '%';
        };

        let rTO;
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting && !video.paused) video.pause();
                });
            }, { threshold: 0.1 });
            io.observe(wrapper);
        }

        wrapper.addEventListener('mouseenter', onMouseEnter);
        wrapper.addEventListener('mouseleave', onMouseLeave);
        wrapper.addEventListener('click', onClick);
        if (playBtn) playBtn.addEventListener('click', onClick);

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('timeupdate', onTimeUpdate);

        if (video.paused) showBtn(); else hideBtn();

        window.addEventListener('resize', () => {
            clearTimeout(rTO);
            rTO = setTimeout(() => {
                if (!video.paused) video.pause();
            }, 150);
        });
    });
})();

(() => {
    const tabs = document.querySelector('.tabs');

    if(!tabs) return;

    const dots = tabs.querySelectorAll('.doctors-pagination__dot');

    if(dots.length === 0) return;

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();

            dots.forEach((item) => {
                item.classList.remove('active');
            });

            dot.classList.add('active');

            const i = dot.dataset.tab;

            const boxes = tabs.querySelectorAll(`.spec-tab-container-box[data-t="${i}"]`);

            if(boxes.length) {
                tabs.querySelectorAll(`.spec-tab-container-box`).forEach((item) => {
                    item.classList.remove('active');
                });

                boxes.forEach(box => {
                    box.classList.add('active');
                });
            }
        });
    });
})();

(() => {
    const includesSlider = document.querySelector(".includes-slider");

    if(includesSlider) {
        new Swiper(includesSlider, {
            slidesPerView: 3,
            spaceBetween: 24,
            breakpoints: {
                320: {
                    slidesPerView: "auto",
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2
                },
                1080: {
                    slidesPerView: 3
                },
            },
            navigation: {
                nextEl: includesSlider.closest(".slider-container").querySelector(".next"),
                prevEl: includesSlider.closest(".slider-container").querySelector(".prev"),
            },
        });
    }

})();

(() => {
    const slider = document.querySelector(".increase-slider");

    if(slider) {
        new Swiper(slider, {
            slidesPerView: 2,
            spaceBetween: 10,
            breakpoints: {
                320: {
                    slidesPerView: "auto",
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2
                },
                1080: {
                    slidesPerView: 2
                },
            },
            navigation: {
                nextEl: slider.closest(".slider-container").querySelector(".next"),
                prevEl: slider.closest(".slider-container").querySelector(".prev"),
            },
        });
    }

})();

(() => {
    const slider = document.querySelector(".implants-slider");

    if(slider) {
        new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 95,
            breakpoints: {
                320: {
                    slidesPerView: "auto",
                    spaceBetween: 32,
                },
                1124: {
                    slidesPerView: 3,
                    spaceBetween: 95,
                },
            },
        });
    }

})();

(() => {
    const items = document.querySelectorAll('.s-accorderon__item');
    if (!items.length) return;

    items.forEach(item => {
        const head = item.querySelector('.s-accorderon__head');
        if (!head) return;

        head.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(el => el.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();


