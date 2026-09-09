(function() {
    // Vytvorenie HTML štruktúry dynamicky, aby sa vyly zablokovanému textu vo fóre
    const container = document.currentScript.parentElement;
    
    const wrapper = document.createElement('div');
    wrapper.style.cssText = "background-color: #1a1a1a; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px 0; font-family: 'Georgia', serif; width: 100%; box-sizing: border-box;";
    
    wrapper.innerHTML = `
    <style>
        .zkv-wrap *, .zkv-wrap *:before, .zkv-wrap *:after { box-sizing: border-box; }
        .zkv-box { position: relative; max-width: 1000px; width: 100%; margin: 0 auto; line-height: 0; }
        .zkv-img { width: 100% !important; max-width: 100% !important; height: auto !important; display: block !important; border-radius: 4px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7); margin: 0; padding: 0; }
        .zkv-owl { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://i.ibb.co/vCyCDWsR/zatvoren-o-i.png'); background-size: 100% 100%; background-repeat: no-repeat; pointer-events: none; z-index: 2; opacity: 0; animation: zkvBlink 6s infinite ease-in-out; }
        @keyframes zkvBlink { 0%, 84%, 100% { opacity: 0; } 87%, 91% { opacity: 1; } }
        .zkv-hit { position: absolute; cursor: pointer; z-index: 5; }
        .zkv-h-hodiny { top: 22%; left: 2%; width: 8%; height: 20%; }
        .zkv-h-salka { top: 70%; left: 4%; width: 14%; height: 20%; }
        .zkv-h-pergamen { top: 60%; left: 39%; width: 27%; height: 29%; }
        .zkv-h-foto { top: 38%; left: 76%; width: 22%; height: 38%; }
        .zkv-h-sova { top: 9%; left: 71%; width: 13%; height: 29%; }
        .zkv-h-kniha { top: 73%; left: 75%; width: 21%; height: 22%; }
        .zkv-fire { position: absolute; top: 53%; left: 65%; width: 55px; height: 55px; background: radial-gradient(circle, rgba(255,240,150,0.95) 0%, rgba(255,120,0,0.7) 50%, rgba(255,60,0,0.2) 80%, transparent 100%); border-radius: 50%; pointer-events: none; z-index: 4; mix-blend-mode: screen; animation: zkvFlicker 1s infinite alternate ease-in-out; }
        @keyframes zkvFlicker { 0% { transform: scale(0.8); opacity: 0.7; } 50% { transform: scale(1.3); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.85; } }
        .zkv-steam-box { position: absolute; top: 45%; left: 6%; width: 60px; height: 130px; pointer-events: none; z-index: 4; filter: blur(6px); }
        .zkv-steam { position: absolute; bottom: 0; left: 0; width: 55px; height: 55px; background: rgba(255, 255, 255, 0.75); border-radius: 50%; animation: zkvRise 2.2s infinite linear; }
        @keyframes zkvRise { 0% { transform: translate(0, 0) scale(0.4); opacity: 0; } 20% { opacity: 0.7; } 100% { transform: translate(15px, -110px) scale(2.2) rotate(8deg); opacity: 0; } }
        .zkv-curtain { position: absolute; top: 2%; left: 26.5%; width: 8%; height: 42%; pointer-events: none; z-index: 4; background: linear-gradient(90deg, rgba(255,255,255,0.15), transparent); }
        .zkv-back { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.75); display: flex; justify-content: center; align-items: center; visibility: hidden; opacity: 0; transition: opacity 0.4s ease, visibility 0.4s ease; z-index: 100; }
        .zkv-back.zkv-act { visibility: visible; opacity: 1; }
        .zkv-scroll-cont { position: relative; width: 90%; max-width: 850px; transform-origin: top center; transform: scaleY(0); opacity: 0; transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease; }
        .zkv-scroll-cont.zkv-small { max-width: 450px; }
        .zkv-back.zkv-act .zkv-scroll-cont { transform: scaleY(1); opacity: 1; }
        .zkv-scroll-img { width: 100% !important; height: auto !important; display: block !important; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.8)); }
        .zkv-text-cont { position: absolute; top: 15%; left: 10%; width: 80%; height: 70%; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; text-align: center; color: #2b1705; font-family: 'Georgia', serif; overflow-y: auto; padding: 10px; opacity: 0; transition: opacity 0.4s ease 0.5s; }
        .zkv-back.zkv-act .zkv-text-cont { opacity: 1; }
        .zkv-text-cont h2 { margin-top: 5px; color: #4a270b; font-size: 1.3rem; border-bottom: 2px solid #b8915c; padding-bottom: 5px; margin-bottom: 10px; width: 60%; margin-left: auto; margin-right: auto; }
        .zkv-text-cont p { font-size: 0.9rem; line-height: 1.4; margin-bottom: 10px; text-align: left; }
        .zkv-dropdown { position: absolute; background: #ffffff; border: 1px solid #d0d7de; border-radius: 6px; box-shadow: 0 -8px 24px rgba(140, 149, 159, 0.35); width: 240px; display: none; flex-direction: column; z-index: 150; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; padding: 4px 0; opacity: 0; transform: scale(0.95); transition: opacity 0.2s ease, transform 0.2s ease; }
        .zkv-dropdown.zkv-act { display: flex; opacity: 1; transform: scale(1); }
        .zkv-m-item { display: flex; align-items: center; padding: 6px 12px; font-size: 13px; color: #24292f; text-decoration: none; white-space: nowrap; transition: background-color 0.15s ease, color 0.15s ease; }
        .zkv-m-item:hover { background-color: #0969da; color: #ffffff; }
        .zkv-m-num { display: inline-block; width: 22px; text-align: right; margin-right: 10px; font-weight: 500; color: #57606a; }
        .zkv-m-item:hover .zkv-m-num { color: #ffffff; }
        .zkv-prof-layout { display: flex; align-items: center; justify-content: space-between; gap: 25px; width: 100%; text-align: left; }
        .zkv-prof-text-side { flex: 1; display: flex; flex-direction: column; }
        .zkv-prof-title { font-size: 1.6rem !important; font-weight: bold; color: #4a270b; margin: 0 0 4px 0; border-bottom: 2px solid #b8915c !important; padding-bottom: 5px !important; width: 100% !important; }
        .zkv-prof-subtitle { font-size: 1.15rem !important; font-style: italic; color: #5c3a21; margin: 0 0 15px 0; }
        .zkv-prof-text { font-size: 1.05rem !important; line-height: 1.5 !important; margin: 0; }
        .zkv-prof-photos { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; position: relative; min-width: 190px; }
        .zkv-p-main { width: 155px; height: 190px; object-fit: cover; border: 4px solid #fff; box-shadow: 0 6px 20px rgba(0,0,0,0.35); z-index: 2; }
        .zkv-p-sec { width: 115px; height: 115px; object-fit: cover; border: 4px solid #fff; box-shadow: 0 6px 20px rgba(0,0,0,0.35); position: absolute; top: 105px; right: 105px; z-index: 3; }
        .zkv-cont-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; gap: 10px; }
        .zkv-cont-intro { font-size: 1.05rem !important; font-style: italic; color: #5c3a21; margin-bottom: 8px !important; text-align: center; }
        .zkv-cont-list { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 380px; align-items: flex-start; }
        .zkv-c-item { display: flex; align-items: center; gap: 12px; font-size: 1.05rem !important; color: #2b1705; }
        .zkv-c-icon { width: 28px; height: 28px; object-fit: contain; border-radius: 50%; }
        .zkv-close { position: absolute; top: 6%; right: 10%; background: rgba(92, 58, 33, 0.15); border: 2px solid #5c3a21; border-radius: 50%; width: 42px; height: 42px; display: flex; justify-content: center; align-items: center; font-size: 32px; line-height: 1; cursor: pointer; color: #4a270b; z-index: 10; transition: all 0.2s ease; }
        .zkv-close:hover { background: #5c3a21; color: #fff; transform: scale(1.1); }
        .zkv-note { color: #ffffff; font-size: 0.95rem; font-style: italic; text-align: center; margin-top: 15px; font-family: 'Georgia', serif; letter-spacing: 0.5px; }
    </style>

    <div class="zkv-box">
        <img src="https://i.ibb.co/tT4pQm75/pracovna.png" alt="Pracovňa" class="zkv-img">
        <div class="zkv-owl"></div>
        <div class="zkv-fire"></div>
        <div class="zkv-steam-box">
            <div class="zkv-steam"></div>
            <div class="zkv-steam" style="animation-delay: 1.1s; width: 45px; height: 45px; left: 10px;"></div>
        </div>
        <div class="zkv-curtain"></div>

        <div class="zkv-hit zkv-h-hodiny" id="zkv-btn-hodiny" title="Hodiny"></div>
        <div class="zkv-hit zkv-h-salka" id="zkv-btn-salka" title="Šálka"></div>
        <div class="zkv-hit zkv-h-pergamen" id="zkv-btn-pergamen" title="Pergamen"></div>
        <div class="zkv-hit zkv-h-foto" id="zkv-btn-foto" title="Fotografia"></div>
        <div class="zkv-hit zkv-h-sova" id="zkv-btn-sova" title="Sova"></div>
        <div class="zkv-hit zkv-h-kniha" id="zkv-btn-kniha" title="Kniha kapitol"></div>

        <div id="zkv-backdrop" class="zkv-back">
            <div id="zkv-scroll" class="zkv-scroll-cont">
                <div class="zkv-close" id="zkv-btn-close">&times;</div>
                <img src="https://i.ibb.co/7xYQz5dq/111ab02f-6b6b-4909-bda8-4ce4549fafc9-removebg-preview.png" alt="Pergamen" class="zkv-scroll-img">
                <div id="zkv-text" class="zkv-text-cont"></div>
            </div>
        </div>

        <div id="zkv-menu" class="zkv-dropdown">
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">1.</span><span>Kúzelné formule</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">2.</span><span>OPČM</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">3.</span><span>Dejiny mágie</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">4.</span><span>Premeňovanie</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">5.</span><span>Lektvary</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">6.</span><span>Bylinky, Astronómia</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">7.</span><span>Drakológia, POKT</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">8.</span><span>Štúdium muklov</span></a>
            <a href="#" class="zkv-m-item"><span class="zkv-m-num">9.</span><span>Lietanie</span></a>
        </div>
    </div>
    <div class="zkv-note">(Obrázok je interaktívny. Kliknite na jednotlivé predmety v pracovni a preštudujte si dôležité informácie pred začiatkom šk. roka.)</div>
    `;

    container.appendChild(wrapper);

    // Zvuky a logika
    const zkvPaper = new Audio('https://raw.githubusercontent.com/MarionArrington/ZKV/main/papier.wav');
    const zkvOwl = new Audio('https://raw.githubusercontent.com/MarionArrington/ZKV/main/sova.wav');
    const zkvCup = new Audio('https://raw.githubusercontent.com/MarionArrington/ZKV/main/salka.wav');
    const zkvClock = new Audio('https://raw.githubusercontent.com/MarionArrington/ZKV/main/hodiny.wav');
    let zkvClockTimer;

    const zkvTexts = {
        pergamen: `<h2>Spôsob výučby</h2><p>Ako isto viete, Základy kúzelníckeho vzdelania neprebiehajú formou online výuky, ale na príslušnú nástenku pridelenú triede ZKV C (sekcia 104) pribudnú každý týždeň nové zápisky. V rovnakom intervale budú zverejňované aj zadania domácich úloh.<br>Pre úspešné ukončenie predmetu a postup do ďalšieho ročníka je nutné získať minimálne päť známok, či už vďaka vyššie spomenutým prácam alebo povinnej polročnej a koncoročnej skúške.</p><h2>Domáce úlohy</h2><p>V každej zo zadaných nepovinných prác Vám bude ponúknutých hneď niekoľko možností vypracovania, takže pevne verím, že si každý nájde to, ktoré bude najviac vyhovovať jeho záujmom a schopnostiam. Okrem formulára pod zadaním nám môžete úlohy zasielať i prostredníctvom Discordu, avšak v odosielacom formulári vždy uveďte, z akého účtu ste prácu odovzdali.</p><h2>Učebnica</h2><p>Počas roka budeme používať učebnicu Praise Eveleen: Základy kouzelnického vzdělání. Jej vlastnenie nie je povinné, no každý kto ju bude mať na konci 6. výukového týždňa v inventári, získa známku navyše.</p>`,
        fotografia: `<div class="zkv-prof-layout"><div class="zkv-prof-text-side"><h2 class="zkv-prof-title">Marion G. Arrington</h2><p class="zkv-prof-subtitle">praktikantka</p><p class="zkv-prof-text">Som profesionálna tanečnica, no od začiatku tohto roka pôsobím v Bradaviciach na pozícií praktikantky. Mojim hlavným zameraním sú Lektvary, Obrana proti čiernej mágií a Kúzelnícke liečiteľstvo. Spoločne sa budeme stretávať na hodinách ZKV, ktorých absolvovanie je, nariadením Ministerstva mágie, povinným pre všetkých študentov školy.</p></div><div class="zkv-prof-photos"><img src="https://i.ibb.co/HvYD9RR/740full-mariia-arsentieva.jpg" alt="Marion" class="zkv-p-main"><img src="https://i.ibb.co/nsF6x8Pj/ZABS4-Ath-400x400.jpg" alt="Marion" class="zkv-p-sec"></div></div>`,
        sova: `<h2>Sovička a odkazy</h2><div class="zkv-cont-wrap"><p class="zkv-cont-intro">Ak mi chceš niečo odkázať, pošli sovou list alebo ma zastihni tu:</p><div class="zkv-cont-list"><div class="zkv-c-item"><img src="https://i.ibb.co/GfNHdQt8/1.png" alt="Email" class="zkv-c-icon"><span>i.arden@revelio.cz</span></div><div class="zkv-c-item"><img src="https://i.ibb.co/5WyLF5X8/2.png" alt="Discord" class="zkv-c-icon"><span>isabellearden</span></div><div class="zkv-c-item"><img src="https://i.ibb.co/5WyLF5X8/2.png" alt="Discord" class="zkv-c-icon"><span>Ardenkin pavilón šeliem</span></div></div></div>`,
        hodiny: `<h2>Upozornenie</h2><p style="font-size: 1.15rem; margin-top: 10px;">Nezabudnite pravidelne kontrolovać nástenku.</p>`
    };

    function zkvShow(target) {
        zkvCloseMenu();
        const backdrop = wrapper.querySelector('#zkv-backdrop');
        const textContent = wrapper.querySelector('#zkv-text');
        const scrollBox = wrapper.querySelector('#zkv-scroll');

        clearTimeout(zkvClockTimer);
        zkvClock.pause();

        if (target === 'salka') {
            zkvCup.currentTime = 0;
            zkvCup.play().catch(e => {});
            return;
        }

        if (zkvTexts[target]) {
            textContent.innerHTML = zkvTexts[target];
            if (target === 'hodiny') { scrollBox.classList.add('zkv-small'); } 
            else { scrollBox.classList.remove('zkv-small'); }

            backdrop.classList.add('zkv-act');
            
            if (target === 'pergamen') {
                zkvPaper.currentTime = 0;
                zkvPaper.play().catch(e => {});
            } else if (target === 'sova') {
                zkvOwl.currentTime = 0;
                zkvOwl.play().catch(e => {});
            } else if (target === 'hodiny') {
                zkvClock.currentTime = 0;
                zkvClock.play().catch(e => {});
                zkvClockTimer = setTimeout(() => { zkvClock.pause(); }, 2500);
            }
        }
    }

    function zkvCloseText() {
        const backdrop = wrapper.querySelector('#zkv-backdrop');
        if (backdrop) backdrop.classList.remove('zkv-act');
        clearTimeout(zkvClockTimer);
        zkvClock.pause();
    }

    function zkvToggleMenu(event) {
        event.stopPropagation();
        zkvCloseText();
        const menu = wrapper.querySelector('#zkv-menu');
        if (!menu) return;
        
        const isVisible = menu.classList.contains('zkv-act');
        if (isVisible) {
            zkvCloseMenu();
        } else {
            const rect = event.currentTarget.getBoundingClientRect();
            const containerRect = wrapper.querySelector('.zkv-box').getBoundingClientRect();
            const topPos = (rect.top - containerRect.top) - 265 - 5;
            const leftPos = rect.left - containerRect.left;
            
            menu.style.top = topPos + 'px';
            menu.style.left = leftPos + 'px';
            menu.classList.add('zkv-act');
            
            zkvPaper.currentTime = 0;
            zkvPaper.play().catch(e => {});
        }
    }

    function zkvCloseMenu() {
        const menu = wrapper.querySelector('#zkv-menu');
        if (menu) menu.classList.remove('zkv-act');
    }

    // Event listenery
    wrapper.querySelector('#zkv-btn-hodiny').addEventListener('click', () => zkvShow('hodiny'));
    wrapper.querySelector('#zkv-btn-salka').addEventListener('click', () => zkvShow('salka'));
    wrapper.querySelector('#zkv-btn-pergamen').addEventListener('click', () => zkvShow('pergamen'));
    wrapper.querySelector('#zkv-btn-foto').addEventListener('click', () => zkvShow('fotografia'));
    wrapper.querySelector('#zkv-btn-sova').addEventListener('click', () => zkvShow('sova'));
    wrapper.querySelector('#zkv-btn-kniha').addEventListener('click', zkvToggleMenu);
    wrapper.querySelector('#zkv-btn-close').addEventListener('click', zkvCloseText);
    wrapper.querySelector('#zkv-backdrop').addEventListener('click', zkvCloseText);
    wrapper.querySelector('#zkv-scroll').addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('click', zkvCloseMenu);
})();
