/* =========================================================
   AKARI — INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE SYSTEM
       ===================================================== */

    const pages = Array.from(document.querySelectorAll(".page"));

    const progressNumber =
        document.getElementById("progressNumber");

    const progressFill =
        document.getElementById("progressFill");


    let currentPage = 0;


    function showPage(index) {

        if (index < 0 || index >= pages.length) return;

        pages.forEach((page, i) => {
            page.classList.toggle("active", i === index);
        });

        currentPage = index;

        updateProgress();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function updateProgress() {

        /*
         * صفحه‌ی شروع را جزو مراحل بازی حساب نمی‌کنیم.
         */

        const totalSteps = pages.length - 1;

        const step = Math.max(
            0,
            currentPage
        );

        const percent =
            totalSteps > 0
                ? (step / totalSteps) * 100
                : 0;

        progressFill.style.width =
            `${percent}%`;

        progressNumber.textContent =
            String(step).padStart(2, "0");
    }


    function createContinueButton(
        responseElement,
        nextPage,
        text = "ادامه ↗"
    ) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "continue-button";

        button.textContent =
            text;

        button.addEventListener(
            "click",
            () => showPage(nextPage)
        );

        responseElement.appendChild(button);
    }


    function showResponse(
        element,
        text,
        nextPage,
        buttonText = "ادامه ↗"
    ) {

        element.innerHTML = "";

        const message =
            document.createElement("div");

        message.className =
            "response-text";

        message.textContent =
            text;

        element.appendChild(message);

        createContinueButton(
            element,
            nextPage,
            buttonText
        );

        requestAnimationFrame(() => {
            element.classList.add("visible");
        });
    }



    /* =====================================================
       START BUTTON
       ===================================================== */

    const startBtn =
        document.getElementById("startBtn");


    if (startBtn) {

        startBtn.addEventListener(
            "click",
            () => {

                /*
                 * صفحه‌ی 0 = مقدمه
                 * صفحه‌ی 1 = اولین مینی‌گیم
                 */

                showPage(1);

            }
        );

    }



    /* =====================================================
       GAME 01 — NAME
       ===================================================== */

    const nameGame =
        document.getElementById("nameGame");

    const nameResponse =
        document.getElementById("nameResponse");


    if (nameGame) {

        const buttons =
            nameGame.querySelectorAll("button");


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        b => b.disabled = true
                    );


                    if (
                        button.textContent.trim()
                        === "مهدیه"
                    ) {

                        button.classList.add(
                            "correct"
                        );


                        showResponse(
                            nameResponse,

                            "مهدیه. چون بعضی اسم‌ها را نمی‌شود اشتباه گفت. مخصوصاً وقتی فقط در لحظه‌های مهم صدایشان می‌کنی.",

                            2
                        );

                    } else {

                        button.disabled = false;

                        showResponse(
                            nameResponse,

                            "نه. یک بار دیگر فکر کن. این یکی را قرار نبود با حدس رد کنیم.",

                            1,

                            "دوباره امتحان کن"
                        );

                    }

                }
            );

        });

    }



    /* =====================================================
       GAME 02 — NIGHT
       ===================================================== */

    const nightGame =
        document.getElementById("nightGame");

    const nightResponse =
        document.getElementById("nightResponse");

    const lamp =
        nightGame
            ? nightGame.querySelector(".lamp")
            : null;


    let nightActivated = false;


    if (lamp) {

        const activateNight =
            () => {

                if (nightActivated) return;

                nightActivated = true;

                nightGame.classList.add("lit");

                const clock =
                    document.getElementById(
                        "nightClock"
                    );

                if (clock) {
                    clock.textContent =
                        "تا صبح";
                }


                showResponse(
                    nightResponse,

                    "بعضی شب‌ها واقعاً قرار نبود زود تمام شوند. حرف داشتیم، خنده داشتیم، تعریف کردنِ تمام اتفاقات روز را داشتیم... و گاهی تا صبح.",

                    3
                );

            };


        lamp.addEventListener(
            "click",
            activateNight
        );


        lamp.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    activateNight();

                }

            }
        );

    }



    /* =====================================================
       GAME 03 — COCOA
       ===================================================== */

    const cocoaGame =
        document.getElementById("cocoaIngredients");

    const cocoaResponse =
        document.getElementById("cocoaResponse");

    const cocoaLiquid =
        document.getElementById("cocoaLiquid");


    let cocoaProgress = 0;


    if (cocoaGame) {

        const ingredients =
            cocoaGame.querySelectorAll(
                "button"
            );


        ingredients.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.classList.contains(
                            "used"
                        )
                    ) return;


                    button.classList.add(
                        "used"
                    );

                    cocoaProgress++;


                    if (cocoaLiquid) {

                        cocoaLiquid.style.height =
                            `${Math.min(
                                cocoaProgress * 25,
                                100
                            )}%`;

                    }


                    if (cocoaProgress >= 4) {

                        showResponse(
                            cocoaResponse,

                            "فرمول نهایی مشخص شد: شیرکاکائو، کمی آرامش، یک عالمه خنده و یک آدم که احتمالاً باز هم سر چیزی باهاش بحث می‌کنی.",

                            4
                        );

                    }

                }
            );

        });

    }



    /* =====================================================
       GAME 04 — FLOWER
       ===================================================== */

    const flowerGame =
        document.getElementById("flowerGame");

    const flowerResponse =
        document.getElementById("flowerResponse");


    let removedWeights = 0;


    if (flowerGame) {

        const weights =
            flowerGame.querySelectorAll(
                ".weight"
            );


        weights.forEach(weight => {

            weight.addEventListener(
                "click",
                () => {

                    if (
                        weight.classList.contains(
                            "removed"
                        )
                    ) return;


                    weight.classList.add(
                        "removed"
                    );

                    removedWeights++;


                    if (removedWeights >= weights.length) {

                        showResponse(
                            flowerResponse,

                            "همه را نمی‌شود نگه داشت. بعضی دلخوری‌ها، بعضی غرورها و بعضی انتظارها فقط سنگین‌ترمان می‌کنند. گاهی سبک‌تر بودن، بد نیست.",

                            5
                        );

                    }

                }
            );

        });

    }



    /* =====================================================
       GAME 05 — DOG & CAT
       ===================================================== */

    const animalGame =
        document.getElementById("animalGame");

    const animalResponse =
        document.getElementById("animalResponse");

    const dog =
        document.getElementById("dog");

    const cat =
        document.getElementById("cat");


    let animalTouches = 0;


    if (animalGame) {

        animalGame.addEventListener(
            "click",
            event => {

                /*
                 * فقط وقتی روی خود حیوان‌ها
                 * کلیک شده باشد.
                 */

                const target =
                    event.target.closest(
                        ".animal"
                    );

                if (!target) return;


                animalTouches++;


                if (animalTouches === 1) {

                    dog.style.left =
                        "38%";

                    cat.style.right =
                        "38%";

                }


                if (animalTouches === 2) {

                    dog.style.left =
                        "45%";

                    cat.style.right =
                        "45%";

                }


                if (animalTouches >= 3) {

                    showResponse(
                        animalResponse,

                        "ما واقعاً استاد این بودیم که مثل سگ و گربه به هم بپریم، و چند ساعت بعد طوری بخندیم که انگار هیچ اتفاقی نیفتاده. عجیب بود. ولی واقعی بود.",

                        6
                    );

                }

            }
        );

    }



    /* =====================================================
       GAME 06 — WRITING
       ===================================================== */

    const wordGame =
        document.getElementById("wordGame");

    const sentence =
        document.getElementById("sentence");

    const lastDrawerBtn =
        document.getElementById(
            "lastDrawerBtn"
        );


    const selectedWords = [];


    if (wordGame) {

        const words =
            wordGame.querySelectorAll(
                "button"
            );


        words.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const word =
                        button.textContent.trim();


                    /*
                     * حذف کلمه‌ی انتخاب‌شده
                     */

                    if (
                        button.classList.contains(
                            "selected"
                        )
                    ) {

                        button.classList.remove(
                            "selected"
                        );

                        const index =
                            selectedWords.indexOf(
                                word
                            );

                        if (index !== -1) {
                            selectedWords.splice(
                                index,
                                1
                            );
                        }

                    }

                    /*
                     * اضافه کردن کلمه
                     */

                    else {

                        if (
                            selectedWords.length >= 3
                        ) return;

                        button.classList.add(
                            "selected"
                        );

                        selectedWords.push(
                            word
                        );

                    }


                    updateSentence();

                }
            );

        });

    }


    function updateSentence() {

        if (!sentence) return;


        if (selectedWords.length === 0) {

            sentence.textContent =
                "سه کلمه را انتخاب کن.";

            sentence.classList.remove(
                "has-words"
            );

            lastDrawerBtn.classList.add(
                "hidden"
            );

            return;

        }


        sentence.classList.add(
            "has-words"
        );


        sentence.innerHTML =
            selectedWords
                .map(
                    word =>
                        `<span>${word}</span>`
                )
                .join(" · ");


        if (
            selectedWords.length === 3
        ) {

            lastDrawerBtn.classList.remove(
                "hidden"
            );

        } else {

            lastDrawerBtn.classList.add(
                "hidden"
            );

        }

    }



    /* =====================================================
       LAST DRAWER BUTTON
       ===================================================== */

    if (lastDrawerBtn) {

        lastDrawerBtn.addEventListener(
            "click",
            () => {

                showPage(7);

            }
        );

    }



    /* =====================================================
       FINAL DRAWER
       ===================================================== */

    const openDrawerBtn =
        document.getElementById(
            "openDrawerBtn"
        );

    const drawer =
        document.getElementById(
            "drawer"
        );

    const finalMessage =
        document.getElementById(
            "finalMessage"
        );


    if (openDrawerBtn) {

        openDrawerBtn.addEventListener(
            "click",
            () => {

                drawer.classList.add(
                    "hidden"
                );

                finalMessage.classList.remove(
                    "hidden"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       INITIAL STATE
       ===================================================== */

    showPage(0);

});
