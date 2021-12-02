var languageData = {
    navigation: {
        menu: {
            en: ["home", "about", "reservation", "menu", "contact"],
            fr: ["domicile", "À propos", "réservation", "menu", "contact"],
        },
    },
    home: {
        content: {
            en: [
                ["hours", "Tuesday - Sunday", "11AM - 10PM"],
                ["address", "70 Grand Ave", "Brooklyn, New York"],
                ["contact", "917-111-2222", "info@peterlogan.com"],
            ],
            fr: [
                ["les heures", "Mardi - Dimanche", "11h - 22h"],
                ["adresse", "70, Avenue Grand", "Brooklyn, New York"],
                ["contact", "917-111-2222", "info@peterlogan.com"],
            ],
        },
    },
    footer: {
        address: {
            en: "70 Grand Ave, Brooklyn, New York",
            fr: "70 Avenue Grand, Brooklyn, New York",
        },
        copyright: {
            en: "DESIGN BY YML",
            fr: "CONCEPTION PAR YML",
        },
        company: {
            en: "PETER LOGAN'S STEAK HOUSE",
            fr: "STEAK HOUSE DE PETER LOGAN",
        },
    },
};

var header = document.querySelector("#header");
var responsiveMenuOpen = document.querySelector("#responsive-menu-open");
var responsiveMenuClose = document.querySelector("#overlay-menu-close");
var responsiveMenuOverlay = document.querySelector(".responsive-menu-overlay");
var navigationMenu = document.querySelector(".navigation-menu");
var selectLanguage = document.querySelector(".select-language");
var selectLanguageResponsive = document.querySelector(
    ".select-language-responsive"
);
var homeContentText = document.querySelectorAll(".home-content-text");
var footerAddressLine = document.querySelector(".footer-address-line");
var footerCopyright = document.querySelector(".footer-copyright");
var footerCompany = document.querySelector(".footer-company");
var languagesDropdown = document.querySelector(".dropdown-content");

window.addEventListener("scroll", function () {
    if (window.scrollY === 0) {
        // remove background styling from header
        header.classList.remove("header-scroll");
    } else if (window.scrollY > 32) {
        // add background styling to header
        header.classList.add("header-scroll");
    }
});

responsiveMenuOpen.addEventListener("click", function () {
    // add background styling to header
    header.classList.add("header-scroll");
    // open responsive overlay menu open button
    responsiveMenuOverlay.style.height = "calc(100% - 64px)";
    // stop body scroll
    document.body.style.overflow = "hidden";
    // hide overlay menu open button
    responsiveMenuOpen.style.display = "none";
    // show overlay menu close button
    responsiveMenuClose.style.display = "block";
});

responsiveMenuClose.addEventListener("click", function () {
    if (window.scrollY === 0) {
        // remove background styling from header
        header.classList.remove("header-scroll");
    }
    // close responsive overlay
    responsiveMenuOverlay.style.height = "0";
    // reset body scroll
    document.body.style.overflow = "auto";
    // hide overlay menu close button
    responsiveMenuClose.style.display = "none";
    // show overlay menu open button
    responsiveMenuOpen.style.display = "block";
});

// hide responsive menu when viewport width is greater than 768px (for desktop)
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        responsiveMenuOpen.style.display = "none";
        responsiveMenuClose.style.display = "none";
        // close responsive overlay
        responsiveMenuOverlay.style.height = "0";
        // reset body scroll
        document.body.style.overflow = "auto";
    } else {
        responsiveMenuOpen.style.display = "block";
    }
});

/*******************************************************************************
              Global user experience functionality. (ie. dark mode)
 *******************************************************************************/

/**************************
   Toast message handler.
 **************************/

// Creating a toast message container and putting a toast message in it and adding it to the body.
let toastMsgContainerElem = document.createElement("div");
toastMsgContainerElem.className = "toast-msg-container";
toastMsgContainerElem.innerHTML = "<span class='toast-msg'>Msg here</span>";
document.body.appendChild(toastMsgContainerElem);

// Creating a constant variable of the toast container to interact with
const toastMsgContainer = document.querySelector("div.toast-msg-container");

// Creating a variable to directly interact with the toast message.
const toastMsg = toastMsgContainer.querySelector("span");

// Check for the toast message being displayed or not (this is to prevent spamming).
var toastShowing = false;
function toastMessage(message) {
    // Indicating to the client js that the toast function is already being ran.
    toastShowing = true;

    // Setting the message to display in the toast.
    toastMsg.innerHTML = message;
    // Setting the opacity to 0.
    toastMsgContainer.style.opacity = 0.00;

    // Displaying the toast message to the user.
    var fadeIn = setInterval(function() {
        if (toastMsgContainer.style.opacity <= '1.00') {
            toastMsgContainer.style.opacity = parseFloat(toastMsgContainer.style.opacity) + 0.01;
        } else {
            clearInterval(fadeIn);
        }
    });

    setTimeout(function() {
        var fadeOut = setInterval(function() {
            if (toastMsgContainer.style.opacity > '0.00') {
                toastMsgContainer.style.opacity = parseFloat(toastMsgContainer.style.opacity) - 0.01;
            } else {
                clearInterval(fadeOut);
            }
        });

        // Indicating to the client js that the toast is not longer being shown.
        toastShowing = false;
    },1000);
}

// Getting all the user option buttons.
const uxButtons = document.querySelectorAll("div[class='features']");

// Getting both the non responsive and responsive theme toggle buttons.
const themeToggleButtons = [uxButtons[0].children[0], uxButtons[1].children[0]];

// Getting both the non responsive and responsive language buttons.
const languageToggleButtons = [uxButtons[0].children[1], uxButtons[1].children[1]]; // Toggle for language.

// Any elements that can be queried once.
const inquiryForm = document.querySelector("div.container");

/*****************************
    Dark mode functionality.
 *****************************/

// Adding the CSS for the themes.
const themeStyles = document.createElement("style");
themeStyles.innerHTML = ".dark-mode-heading { border: 1px solid rgb(226, 226, 226); color: rgb(226, 226, 226); } .dark-mode-text { color: rgb(226, 226, 226); } div.toast-msg-container { position: fixed; width: 100%; display: flex; justify-content: center; margin: auto; bottom: 10%; opacity: 0; user-select: none; } span.toast-msg { padding: 10px; width: wrap-content; background-color: rgba(0, 0, 0, 0.5); color: white; text-align: center; font-size: 20px; border-radius: 5px; } span.toast-msg-dark { padding: 10px; background-color: rgba(255, 255, 255, 0.5); color: black; text-align: center; font-size: 20px; border-radius: 5px; }";
document.querySelector("head").appendChild(themeStyles);

/*
Checking if the theme was last set to dark. If it was, it will update the theme to be dark. If it was light,
it doesn't have to do anything because the default class styles are already dark.

Also checks if the theme is undefined, because if it is, it means the theme is light, as it's the user's
first time on the page.
*/
if (localStorage.theme == "dark") {
    enableDarkTheme();
} else if (localStorage.theme == undefined) {
    localStorage.theme = "light";
}

// Event listener to make each of the theme toggle buttons work (both responsive and non responsive).
themeToggleButtons.forEach((button) => {
    button.addEventListener("click", function() {
        if (!toastShowing) {
            // If the theme is light theme...
            if (localStorage.theme == "light") {
                // Set the theme to dark theme.
                enableDarkTheme();
                // Show a toast message to indicate to the user they just enabled light mode.
                toastMessage("Dark mode enabled.");
            // If the theme is dark theme...
            } else {
                // Set the theme to light theme.
                enableLightTheme();
                // Show a toast message to indicate to the user they just enabled light mode.
                toastMessage("Light mode enabled.");
            }
        }
    });
});

// Enable light theme.
function enableLightTheme() {
    // Updating the theme reference to light.
    localStorage.theme = "light";
    // Setting the body background to white.
    document.body.style.backgroundColor = "white";
    // Setting both of the corresponding buttons to black (for contrast).
    themeToggleButtons.forEach((button) => {
        button.style.color = 'white';
    });
    // Setting the textinfo-headings to light mode.
    document.querySelectorAll("div[class='textinfo-heading dark-mode-heading']").forEach((heading) => {
        Array.from(heading.parentNode.children).forEach((child) => {
            child.classList == "textinfo-heading dark-mode-heading" ? child.classList = "textinfo-heading" : child.removeAttribute("class");
        });
    });
    // Setting the main section paragraphs (quotes and text bodies) to black (for contrast) by removing the dark-mode-text class.
    document.querySelectorAll("p:not(#chef-name)").forEach((text) => {
        text.classList == 'dark-mode-text' ? text.removeAttribute("class") : text.classList = text.classList.value.replace(" dark-mode-text", "");
    });
    // If the form is on this page, set its text to black (for contrast) by removing the dark-mode-text class.
    if (inquiryForm != null) {
        inquiryForm.querySelector("h3").removeAttribute("class");
        inquiryForm.querySelectorAll("label").forEach((label) => {
            label.removeAttribute("class");
        });
    }
    // Setting the toast message to light mode version.
    document.querySelector("span.toast-msg-dark").classList = "toast-msg";
}

// Enable dark theme.
function enableDarkTheme() {
    // Updating the theme reference to dark.
    localStorage.theme = "dark";
    // Setting the body background to black.
    document.body.style.backgroundColor = "black";
    // Setting both of the corresponding buttons to black.
    themeToggleButtons.forEach((button) => {
        button.style.color = 'black';
    });
    // Setting the textinfo-headings to white (for contrast).
    document.querySelectorAll("div[class='textinfo-heading']").forEach((heading) => {
        Array.from(heading.parentNode.children).forEach((child) => {
            child.classList == "textinfo-heading" ? child.classList = "textinfo-heading dark-mode-heading" : child.classList = "dark-mode-text";
        });
    });
    // Setting the main section paragraphs (quotes and text bodies) to white (for contrast).
    document.querySelectorAll("p:not(#chef-name)").forEach((text) => {
        text.classList == '' ? text.classList = "dark-mode-text" : text.classList += " dark-mode-text";
    });
    // If the form is on this page, set its text to white (for contrast).
    if (inquiryForm != null) {
        inquiryForm.querySelector("h3").classList = "dark-mode-text";
        inquiryForm.querySelectorAll("label").forEach((label) => {
            label.classList = "dark-mode-text";
        });
    }
    // Setting the toast message to dark mode version.
    document.querySelector("span.toast-msg").classList = "toast-msg-dark";
}

// proof of concept for multiple languages

// language
var language = localStorage.getItem("language");
// if localStorage language is null, set the default languauge to "en"
if (language === null) {
    language = "en";
}
// initialize language
updateLanguage(language);

// update language on HTML
function updateLanguage(lang = "en") {
    // navigation menu
    const menuLength = languageData.navigation.menu.en.length;
    for (var index = 0; index < menuLength; index++) {
        navigationMenu.children[index].children[0].textContent =
            languageData.navigation.menu[lang][index];
    }

    // responsive navigation menu
    for (var index = 0; index < menuLength; index++) {
        responsiveMenuOverlay.children[0].children[
            index
        ].children[0].textContent = languageData.navigation.menu[lang][index];
    }

    // home -> content text
    for (var index = 0; index < homeContentText.length; index++) {
        homeContentText[index].children[0].textContent =
            languageData.home.content[lang][index][0];
        homeContentText[index].children[1].textContent =
            languageData.home.content[lang][index][1];
        homeContentText[index].children[2].textContent =
            languageData.home.content[lang][index][2];
    }

    // footer
    footerAddressLine.textContent = languageData.footer.address[lang];
    footerCopyright.textContent = languageData.footer.copyright[lang];
    footerCompany.textContent = languageData.footer.company[lang];

    // update <select>
    handleSelectOptions(lang);
}

// handle language select
selectLanguage.addEventListener("change", function (e) {
    const newLanguage = e.target.value;
    updateLanguageOnSelect(newLanguage);

    if (newLanguage === "en") {
        var en = selectLanguage.options[0];
        en.setAttribute("selected", true);
    } else if (newLanguage === "fr") {
        var fr = selectLanguage.options[1];
        fr.setAttribute("selected", true);
    }
});

// handle language select - responsive menu
selectLanguageResponsive.addEventListener("change", function (e) {
    const newLanguage = e.target.value;
    updateLanguageOnSelect(newLanguage);

    handleSelectOptions(newLanguage);
});

function updateLanguageOnSelect(newLanguage) {
    // save new language
    localStorage.setItem("language", newLanguage);
    updateLanguage(newLanguage);

    handleSelectOptions(newLanguage);
}

function handleSelectOptions(newLanguage) {
    if (newLanguage === "en") {
        var en = selectLanguage.options[0];
        en.setAttribute("selected", true);

        var enResponsive = selectLanguageResponsive.options[0];
        enResponsive.setAttribute("selected", true);
    } else if (newLanguage === "fr") {
        var fr = selectLanguage.options[1];
        fr.setAttribute("selected", true);

        var frResponsive = selectLanguageResponsive.options[1];
        frResponsive.setAttribute("selected", true);
    }
}
