"use strict";

var speciesList = [];

function handleSpeciesListDownload(result) {
	if ((result.readyState != 4) || (result.status != 200)) {
		return;
	}
	
    speciesList = JSON.parse(result.responseText);
    var list = document.getElementById("species-list-select");

    for (var i = 0; i < speciesList.length; i++) {
        createHTMLElement({
            "tag": "option",
            "parent": list,
            "text": speciesList[i].species_list,
            "attributes": { "value": speciesList[i].species_list_id }
        });
    }
}

function isAlphanumeric(phrase) {
    const legalChars = "1234567890qwertyuiopasdfghjklzxcvbnm";
    phrase = phrase.toLowerCase();

    for (var i = 0;i < phrase.length; i++) {
        if (legalChars.indexOf(phrase[i]) == -1) {
            // char not found in legalChars.
            return false;
        }
    }

    return true;
}

function findInvalidField(sessionId, touristIds) {
    var isSessionIdValid = ((sessionId.length == 5) && isAlphanumeric(sessionId));
    if (!isSessionIdValid) {
        return "Session ID must be 5 letters or numbers.";
    }

    const maxTouristCount = 3;
    var isValidTouristCount = ((touristIds.length > 0) && (touristIds.length <= maxTouristCount));
    if (!isValidTouristCount)
        return "There must be between 1 and 3 tourist IDs.";


    for (var i = 0; i < touristIds.length; i++) {
        var isValid = ((touristIds[i].length == 5) && isAlphanumeric(touristIds[i]));
        if (!isValid) return "Tourist IDs must be 5 letters or numbers.";
    }

    return "";
}

function footerButton_click() {
    var sessionId = document.getElementById("session-id-input").value.toLowerCase();
    var speciesListId = document.getElementById("species-list-select").value;

    var touristIds = [];
    const noOfTourists = 3;
    for (let i = 0; i < noOfTourists; i++) {
        var tourist = document.getElementById("tourist-input-" + i).value.toLowerCase();
        if (tourist != "")
            touristIds.push(tourist);
    }

    var invalidField = findInvalidField(sessionId, touristIds);

    if (invalidField != "") {
        alert(invalidField);
        return;
    }

    window.localStorage.setItem("sessionId", sessionId);
    window.localStorage.setItem("speciesList", speciesListId);
    window.localStorage.setItem("touristIds", touristIds);
    window.localStorage.setItem("species", JSON.stringify(speciesList));

    window.location = "./survey.html";
}

function initialise() {
    const speciesListsURL = "/api/getSpeciesLists";
    getData(speciesListsURL, (result) => handleSpeciesListDownload(result));
    document.getElementById("footer-button").addEventListener("click", footerButton_click);
}

window.onload = initialise;
