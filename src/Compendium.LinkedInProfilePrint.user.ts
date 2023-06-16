// ==UserScript==
// @name         LinkedIn Profile Print
// @namespace    Compendium
// @copyright    Copyright (c) 2023 Richard Bolhofer
// @version      latest
// @description  Prepares a LinkedIn profile for printing by removing extraneous sections.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @author       SignalRichard
// @homepage     https://github.com/SignalRichard/userscript-compendium-linkedin-profile-print
// @source       https://github.com/SignalRichard/userscript-compendium-linkedin-profile-print
// @match        https://www.linkedin.com/in/*
// @run-at       context-menu
// @license      MIT
// ==/UserScript==

(async function() {
    'use strict';
    let height = window.innerHeight / 2;
    const scrollHeight = height;
    do {
        window.scrollTo(0, height);
        height += scrollHeight;
        await new Promise(r => setTimeout(r, 1000));
    } while(height < document.body.scrollHeight);
    [...document.getElementsByClassName("scaffold-layout__content--has-aside")].forEach((item) => { item.parentElement?.setAttribute("class", ""); item.setAttribute("class", ""); });
    [...document.getElementsByClassName("scaffold-layout__aside"),
    ...document.getElementsByTagName("header"),
    ...document.getElementsByTagName("footer")].forEach((item) => { if(item) { item.remove(); } });
    let iterator = 0;
    [...document.querySelectorAll("section.artdeco-card h2.pvs-header__title>span[aria-hidden=true]")].forEach((item) => {
        iterator++;
        if(item instanceof HTMLElement) {
            switch (item.innerText) {
                case "Highlights":
                case "Featured":
                case "Activity":
                case "Licenses & certifications":
                case "Skills":
                case "Recommendations":
                case "Courses":
                case "Languages":
                case "Organizations":
                case "Causes":
                case "Interests":
                case "People also viewed":
                case "People you may know":
                case "You might like":
                    item.setAttribute("id", `tamper-${iterator}`)
                    document.querySelector(`#tamper-${iterator}`)?.closest(".artdeco-card")?.remove();
                    break;
                default:
                    break;
            }
        }
    });
    [...document.getElementsByClassName("inline-show-more-text__button")].forEach((item) => { if(item instanceof HTMLElement) { item.click(); } });
    await new Promise(r => setTimeout(r, 1000));
    window.scrollTo(0, 0);
    window.print();
})();
