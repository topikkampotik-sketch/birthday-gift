import "./style.css";

const app = document.querySelector("#app");


// ==========================================
// ГЛАВНЫЙ ФОН
// ==========================================

function createBackground() {
    const oldBackground = document.querySelector(".background");

    if (oldBackground) {
        oldBackground.remove();
    }

    const background = document.createElement("div");

    background.className = "background";

    background.innerHTML = `
        <div class="stars"></div>

        <div class="moon"></div>

        <div class="cloud cloud-one"></div>
        <div class="cloud cloud-two"></div>

        <div class="hearts">
            <span>♡</span>
            <span>♥</span>
            <span>♡</span>
            <span>✦</span>
            <span>♡</span>
        </div>
    `;

    app.prepend(background);

    createStars();
}


// ==========================================
// ЗВЁЗДЫ
// ==========================================

function createStars() {

    const stars = document.querySelector(".stars");

    if (!stars) return;

    stars.innerHTML = "";

    for (let i = 0; i < 120; i++) {

        const star = document.createElement("span");

        star.style.position = "absolute";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        const size =
            Math.random() > 0.85 ? 4 : 2;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.borderRadius =
            "50%";

        star.style.background =
            "#ffffff";

        star.style.boxShadow =
            "0 0 8px rgba(255,255,255,0.9)";

        star.style.opacity =
            0.3 + Math.random() * 0.7;

        star.style.animation =
            `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`;

        star.style.animationDelay =
            Math.random() * 3 + "s";

        stars.appendChild(star);
    }
}


// ==========================================
// ПЕРВЫЙ ЭКРАН
// ==========================================

function showIntro() {

    app.innerHTML = `

        <div class="intro">

            <div class="intro-card">

                <div class="little-heart">
                    ♡
                </div>

                <p class="small-title">
                    Для одного особенного человека...
                </p>

                <h1>
                    Для тебя,<br>
                    <span>Катенька ❤️</span>
                </h1>

                <p class="description">
                    Я приготовил для тебя одну маленькую
                    штуку. Думаю, тебе понравится...
                </p>

                <button id="startButton">
                    Начать приключение ✨
                </button>

            </div>

        </div>
    `;

    createBackground();

    document
        .querySelector("#startButton")
        .addEventListener("click", showQuiz);
}


// ==========================================
// ВИКТОРИНА
// ==========================================

const questions = [

    {
        text: "Сегодня у нас...",
        answers: [
            ["Обычный день", false],
            ["3 месяца ❤️", true],
            ["Новый год 🎄", false]
        ]
    },

    {
        text: "Кто мой самый любимый человек?",
        answers: [
            ["Катенька ❤️", true],
            ["Какой-то парень", false],
            ["Моя кошка", false]
        ]
    },

    {
        text: "Кого я называю своим малышом?",
        answers: [
            ["Катюшеньку 🥺", true],
            ["Соседа", false],
            ["Себя", false]
        ]
    },

    {
        text: "Чего я больше всего жду?",
        answers: [
            ["Нашей встречи ❤️", true],
            ["Выходных", false],
            ["Конца света", false]
        ]
    },

    {
        text: "С кем я хочу провести всю жизнь?",
        answers: [
            ["С Катенькой ❤️", true],
            ["С холодильником", false],
            ["Один", false]
        ]
    },

    {
        text: "Ты меня любишь? ❤️",
        answers: [
            ["ДА ❤️", true],
            ["НЕТ", false, true]
        ]
    }

];

let currentQuestion = 0;


// ==========================================
// ПОКАЗАТЬ ВИКТОРИНУ
// ==========================================

function showQuiz() {

    currentQuestion = 0;

    app.innerHTML = `

        <div class="quiz-screen">

            <div class="quiz-card">

                <div class="quiz-top">
                    ♡ МАЛЕНЬКАЯ ПРОВЕРКА ♡
                </div>

                <div class="quiz-progress">
                    Вопрос
                    <span id="questionNumber">1</span>
                    из 6
                </div>

                <h1 id="question"></h1>

                <div
                    class="answers"
                    id="answers">
                </div>

                <p
                    class="quiz-hint"
                    id="quizHint">
                    Только не ошибись ❤️
                </p>

            </div>

        </div>
    `;

    createBackground();

    renderQuestion();
}


// ==========================================
// ОТОБРАЖЕНИЕ ВОПРОСА
// ==========================================

function renderQuestion() {

    const question =
        questions[currentQuestion];

    const questionElement =
        document.querySelector("#question");

    const answersElement =
        document.querySelector("#answers");

    const numberElement =
        document.querySelector("#questionNumber");

    const hint =
        document.querySelector("#quizHint");


    numberElement.textContent =
        currentQuestion + 1;

    questionElement.textContent =
        question.text;

    answersElement.innerHTML = "";


    if (currentQuestion === 5) {

        hint.textContent =
            "Последний вопрос. Очень важный... 👀";

    } else {

        hint.textContent =
            "Только не ошибись ❤️";
    }


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            answer[0];


        const correct =
            answer[1];

        const runaway =
            answer[2];


        // ==================================
        // ПРАВИЛЬНЫЙ / НЕПРАВИЛЬНЫЙ
        // ==================================

        button.addEventListener("click", () => {

            if (runaway) {
                return;
            }


            if (correct) {

                button.classList.add("correct");

                hint.textContent =
                    "Правильно ❤️";


                setTimeout(() => {

                    currentQuestion++;

                    if (
                        currentQuestion >=
                        questions.length
                    ) {

                        showSuccess();

                    } else {

                        renderQuestion();

                    }

                }, 700);

            } else {

                button.classList.add("wrong");

                hint.textContent =
                    "Не-а 😈 Попробуй ещё раз";


                setTimeout(() => {

                    button.classList.remove("wrong");

                }, 500);
            }

        });


        // ==================================
        // УБЕГАЮЩАЯ КНОПКА
        // ==================================

        if (runaway) {

            button.addEventListener(
                "mouseenter",
                () => runAway(button)
            );

            button.addEventListener(
                "touchstart",
                () => runAway(button)
            );
        }


        answersElement.appendChild(button);

    });
}


// ==========================================
// КНОПКА НЕТ УБЕГАЕТ
// ==========================================

function runAway(button) {

    button.style.position = "fixed";

    button.style.zIndex = "9999";

    const buttonWidth =
        button.offsetWidth;

    const buttonHeight =
        button.offsetHeight;


    const maxX =
        window.innerWidth -
        buttonWidth -
        30;

    const maxY =
        window.innerHeight -
        buttonHeight -
        30;


    const x =
        30 +
        Math.random() *
        Math.max(0, maxX - 30);

    const y =
        30 +
        Math.random() *
        Math.max(0, maxY - 30);


    button.style.left =
        x + "px";

    button.style.top =
        y + "px";
}


// ==========================================
// ПОСЛЕ ВИКТОРИНЫ
// ==========================================

function showSuccess() {

    app.innerHTML = `

        <div class="success-screen">

            <div class="success-card">

                <div class="success-heart">
                    ❤️
                </div>

                <div class="quiz-top">
                    ПРОВЕРКА ПРОЙДЕНА
                </div>

                <h1>
                    Я так и знал...
                </h1>

                <p>
                    Ты идеально знаешь
                    своего мальчика 🥺
                </p>

                <p class="success-small">
                    Но это ещё не всё...
                </p>

                <button
                    class="main-button"
                    id="giftButton">

                    Получить подарок 🎁

                </button>

            </div>

        </div>
    `;

    createBackground();

    document
        .querySelector("#giftButton")
        .addEventListener("click", showGift);
}


// ==========================================
// ПИСЬМО
// ==========================================

function showGift() {

    app.innerHTML = `

        <div class="gift-screen">

            <div class="gift-card">

                <div class="gift-label">
                    ✦ ДЛЯ ТЕБЯ ✦
                </div>

                <div class="gift-icon">
                    💌
                </div>

                <h1>
                    Катюшенька ❤️
                </h1>

                <div class="divider">
                    ♡ ✦ ♡
                </div>

                <p>
                    Сегодня у нас маленькая,
                    но очень важная дата.
                </p>

                <p>
                    Уже <b>3 месяца</b> мы вместе,
                    и я безумно рад,
                    что именно ты появилась
                    в моей жизни.
                </p>

                <p>
                    Спасибо тебе за наши разговоры,
                    смех, моменты вместе
                    и просто за то,
                    что ты есть.
                </p>

                <button
                    class="secret-button"
                    id="secretButton">

                    🔐 Здесь есть секрет...

                </button>

            </div>

        </div>
    `;

    createBackground();

    document
        .querySelector("#secretButton")
        .addEventListener("click", showSecret);
}


// ==========================================
// СЕКРЕТНОЕ СООБЩЕНИЕ
// ==========================================

function showSecret() {

    app.innerHTML = `

        <div class="secret-screen">

            <div class="secret-header">

                <div class="lock">
                    🔐
                </div>

                <div>

                    <div class="secret-label">
                        СЕКРЕТНЫЙ УРОВЕНЬ
                    </div>

                    <div class="secret-subtitle">
                        Только для тебя ♡
                    </div>

                </div>

            </div>


            <div class="letter">

                <h2>
                    Катюшенька ❤️
                </h2>

                <p>
                    Ты самый дорогой человек для меня.
                    Ты даёшь мне свет и мотивацию
                    становиться лучше в этой жизни!!!
                </p>

                <p>
                    Прости, что я иногда заёбываю тебя
                    отсутствием голосовых, звонков и кружочков 😭
                    Мне всё-таки очень хотелось бы их видеть —
                    пусть даже не часто, хотя бы раз в недельку.
                    Мне было бы безумно приятно 🥺❤️
                </p>

                <p>
                    Я с нетерпением жду нашей встречи.
                    Никогда не мог подумать, что отношения
                    бывают настолько ахуенными и вайбовыми.
                </p>

                <p>
                    Да, бывали моменты, когда мы ссорились,
                    но я безумно рад, что мы всё это прошли вместе.
                </p>

                <p>
                    Если честно, я очень боялся,
                    что ты уйдёшь от меня из-за моих
                    проблем со здоровьем и с головой.
                    Но ты осталась рядом.
                </p>

                <p>
                    Я безумно ценю то, что ты со мной
                    и помогаешь мне преодолевать
                    все трудности.
                </p>

                <div class="letter-ending">
                    Спасибо тебе за эти 3 месяца, малыш. ❤️
                </div>

                <div class="love-ending">
                    Люблю тебя безумно!!!!! ❤️
                </div>

                <div class="signature">
                    Твой Владик/Terroblade Goat 40% ❤️
                </div>

            </div>


            <button
                class="hug-button"
                id="hugButton">

                🫂 Обнять Катеньку

            </button>

        </div>
    `;

    createBackground();

    document
        .querySelector("#hugButton")
        .addEventListener("click", showFinal);
}


// ==========================================
// ФИНАЛ
// ==========================================

function showFinal() {

    app.innerHTML = `

        <div class="final-screen">

            <div class="final-heart">
                ❤️
            </div>

            <div class="final-stars">
                ✦　♡　✦
            </div>

            <h1>
                С нашими<br>
                <span>3 месяцами ❤️</span>
            </h1>

            <p>
                Это только начало...
            </p>

            <div class="final-message">
                Я люблю тебя, малыш.
            </div>

            <div class="signature">
                — твой мальчик ❤️
            </div>

        </div>
    `;

    createBackground();

    createHeartExplosion();
}


// ==========================================
// СЕРДЕЧКИ В ФИНАЛЕ
// ==========================================

function createHeartExplosion() {

    for (let i = 0; i < 60; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.textContent =
                ["❤️", "💗", "💕", "♡", "♥"][
                    Math.floor(Math.random() * 5)
                ];

            heart.style.position =
                "fixed";

            heart.style.left =
                Math.random() * 100 + "%";

            heart.style.bottom =
                "-30px";

            heart.style.fontSize =
                15 + Math.random() * 25 + "px";

            heart.style.zIndex =
                "100";

            heart.style.animation =
                `heartRise ${3 + Math.random() * 4}s linear forwards`;

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 7000);

        }, i * 80);
    }
}


// ==========================================
// ЗАПУСК
// ==========================================

showIntro();