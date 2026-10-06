document.addEventListener("DOMContentLoaded", () => {
    const pinkfloyd = document.getElementById("pinkfloyd");
    const kk = document.getElementById("kk");
    const spectre = document.getElementById("spectre");
    const textkk = document.querySelector(".textkk");
    const textpf = document.querySelector(".textpf");
    const textrh = document.querySelector(".textrh");

    const treugp = document.querySelector(".treugp");
    const treugl = document.querySelector(".treugl");
    const skolko = document.querySelector(".skolko");

    const sint = document.querySelector(".sint");
    const piano1 = document.querySelector(".piano1");
    const piano2 = document.querySelector(".piano2");
    const piano3 = document.querySelector(".piano3");
    const piano4 = document.querySelector(".piano4");
    const piano5 = document.querySelector(".piano5");

    const klava1 = document.querySelector(".klava1");
    const klava2 = document.querySelector(".klava2");
    const klava3 = document.querySelector(".klava3");
    const klava4 = document.querySelector(".klava4");

    const uspeh1 = document.querySelector(".uspeh1");
    const knopka1 = document.querySelector(".knopka1");
    const si = document.querySelector(".si");
    const fa = document.querySelector(".fa");
    const sol = document.querySelector(".sol");
    const mi = document.querySelector(".mi");
    const pec31 = document.querySelector(".pec31");
    const pec32 = document.querySelector(".pec32");
    const instrum = document.querySelector(".instrum");
    const skripka = document.querySelector(".skripka");
    const fleyta = document.querySelector(".fleyta");
    const gitara = document.querySelector(".gitara");
    const uspeh2 = document.querySelector(".uspeh2");
    const knopka2 = document.querySelector(".knopka2");
    const shitke = document.querySelector(".shitke");

    let currentTrack = 0;
    let gameStarted = false;
    let gameFinished = false;
    let userAnswer = [];
    let pianoTimers = [];
    let game3Finished = false;
    let skripkaDone = false;
    let fleytaDone = false;

    // музыка

    const stopMusic = () => {
        pinkfloyd.pause();
        kk.pause();
        spectre.pause();
        pinkfloyd.currentTime = 0;
        kk.currentTime = 0;
        spectre.currentTime = 0;
    };

    const hideTrackTexts = () => {
        textkk.style.display = "none";
        textpf.style.display = "none";
        textrh.style.display = "none";
    };

    const playMusic = () => {
        stopMusic();
        hideTrackTexts();

        if (currentTrack == 1) {
            pinkfloyd.play();
            textpf.style.display = "block";
        }
        if (currentTrack == 2) {
            kk.play();
            textkk.style.display = "block";
        }
        if (currentTrack == 3) {
            spectre.play();
            textrh.style.display = "block";
        }
    };

    treugp.addEventListener("click", () => {
        if (currentTrack < 3) {
            currentTrack++;
        } else {
            currentTrack = 0;
        }
        playMusic();
    });

    treugl.addEventListener("click", () => {
        if (currentTrack > 0) {
            currentTrack--;
        } else {
            currentTrack = 3;
        }
        playMusic();
    });

    // начальное состояние

    piano1.style.display = "none";
    piano2.style.display = "none";
    piano3.style.display = "none";
    piano4.style.display = "none";
    piano5.style.display = "none";
    uspeh1.style.display = "none";
    knopka1.style.display = "none";
    pec32.style.display = "none";
    instrum.style.display = "none";
    skripka.style.display = "none";
    fleyta.style.display = "none";
    gitara.style.display = "none";
    uspeh2.style.display = "none";
    knopka2.style.display = "none";
    hideTrackTexts();

    klava1.style.opacity = "0";
    klava2.style.opacity = "0";
    klava3.style.opacity = "0";
    klava4.style.opacity = "0";

    klava1.style.cursor = "pointer";
    klava2.style.cursor = "pointer";
    klava3.style.cursor = "pointer";
    klava4.style.cursor = "pointer";
    pec31.style.cursor = "pointer";
    skripka.style.cursor = "pointer";
    fleyta.style.cursor = "pointer";
    gitara.style.cursor = "pointer";
    knopka1.style.cursor = "pointer";
    knopka2.style.cursor = "pointer";

    // игра с пианино

    const stopNotes = () => {
        si.pause();
        fa.pause();
        sol.pause();
        mi.pause();
        si.currentTime = 0;
        fa.currentTime = 0;
        sol.currentTime = 0;
        mi.currentTime = 0;
    };

    const hidePiano = () => {
        piano1.style.display = "none";
        piano2.style.display = "none";
        piano3.style.display = "none";
        piano4.style.display = "none";
        piano5.style.display = "none";
    };

    const showPiano = (piano, note) => {
        hidePiano();
        piano.style.display = "block";
        stopNotes();
        if (note) {
            note.play();
        }
    };

    sint.addEventListener("click", () => {
        if (gameFinished || gameStarted) {
            return;
        }

        gameStarted = true;
        userAnswer = [];
        uspeh1.style.display = "none";
        hidePiano();
        piano1.style.display = "block";
        knopka1.style.display = "block";

        pianoTimers = [
            setTimeout(() => showPiano(piano2, si), 2000),
            setTimeout(() => showPiano(piano3, fa), 3000),
            setTimeout(() => showPiano(piano4, sol), 4000),
            setTimeout(() => showPiano(piano5, mi), 5000),
            setTimeout(() => showPiano(piano1), 6000)
        ];
    });

    knopka1.addEventListener("click", () => {
        for (let i = 0; i < pianoTimers.length; i++) {
            clearTimeout(pianoTimers[i]);
        }
        pianoTimers = [];
        stopNotes();
        hidePiano();
        knopka1.style.display = "none";
        gameStarted = false;
        userAnswer = [];
    });

    const wrongAnswer = () => {
        alert("Неправильная последовательность! Попробуй ещё раз");
        userAnswer = [];
        gameStarted = false;
        hidePiano();
        knopka1.style.display = "none";
    };

    const closeUspeh = (event) => {
        if (uspeh1.contains(event.target)) {
            return;
        }
        uspeh1.style.display = "none";
        knopka1.style.display = "none";
        document.removeEventListener("click", closeUspeh);
    };

    const successGame = () => {
        gameFinished = true;
        gameStarted = false;
        hidePiano();
        uspeh1.style.display = "block";

        setTimeout(() => {
            document.addEventListener("click", closeUspeh);
        }, 0);
    };

    const checkAnswer = () => {
        const right = ["klava1", "klava2", "klava3", "klava4"];

        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] != right[i]) {
                wrongAnswer();
                return;
            }
        }

        if (userAnswer.length == 4) {
            successGame();
        }
    };

    const clickKlava = (name, button, note) => {
        if (!gameStarted || gameFinished) {
            return;
        }

        userAnswer.push(name);
        note.currentTime = 0;
        note.play();

        button.style.opacity = "0.2";
        setTimeout(() => {
            button.style.opacity = "0";
        }, 150);

        checkAnswer();
    };

    klava1.addEventListener("click", () => clickKlava("klava1", klava1, si));
    klava2.addEventListener("click", () => clickKlava("klava2", klava2, fa));
    klava3.addEventListener("click", () => clickKlava("klava3", klava3, sol));
    klava4.addEventListener("click", () => clickKlava("klava4", klava4, mi));

    // игра с инструментами

    const openGame3 = () => {
        skripkaDone = false;
        fleytaDone = false;
        instrum.style.display = "block";
        knopka2.style.display = "block";
        skripka.style.display = "block";
        fleyta.style.display = "block";
        gitara.style.display = "block";
        shitke.loop = true;
        shitke.currentTime = 0;
        shitke.play();
    };

    const closeGame3 = () => {
        instrum.style.display = "none";
        skripka.style.display = "none";
        fleyta.style.display = "none";
        gitara.style.display = "none";
        shitke.pause();
        shitke.currentTime = 0;
    };

    const closeUspeh2 = (event) => {
        if (uspeh2.contains(event.target)) {
            return;
        }
        uspeh2.style.display = "none";
        knopka2.style.display = "none";
        document.removeEventListener("click", closeUspeh2);
    };

    const successGame3 = () => {
        game3Finished = true;
        closeGame3();
        pec31.style.display = "none";
        pec32.style.display = "block";
        pec32.style.opacity = "1";
        pec32.style.animation = "none";
        uspeh2.style.display = "block";

        setTimeout(() => {
            document.addEventListener("click", closeUspeh2);
        }, 0);
    };

    pec31.addEventListener("click", () => {
        if (!game3Finished) {
            openGame3();
        }
    });

    skripka.addEventListener("click", () => {
        skripkaDone = true;
        if (fleytaDone) {
            successGame3();
        }
    });

    fleyta.addEventListener("click", () => {
        fleytaDone = true;
        if (skripkaDone) {
            successGame3();
        }
    });

    gitara.addEventListener("click", () => {
        alert("Неправильный инструмент! попробуйте ещё раз");
    });

    // звёзды

    if (skolko) {
        skolko.addEventListener("click", () => {
            const answer = prompt("Сколько звёзд вы насчитали?");
            if (answer == "5") {
                alert("Правильно!");
            } else {
                alert("Неправильно :( Попробуйте ещё раз!");
            }
        });
    }
});