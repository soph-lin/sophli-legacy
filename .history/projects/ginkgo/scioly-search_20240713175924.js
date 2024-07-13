/* Note that searchTerm includes both search terms and urls.*/

import treeFams from '/projects/ginkgo/treeFams.json' assert {type: 'json'};
import treesDict from '/projects/ginkgo/treesDict.json' assert {type: 'json'};

const autosave = true;
const errorAlert = 'Error, something went wrong with program!';

const searchTermElement = document.getElementById('search-term');
const selectTypeElement = document.getElementById('select-type');
let selectType = 'range select';
const searchByElement = document.getElementById('search-by');
const openTypeElement = document.getElementById('open-type');
const resultsTypeElement = document.getElementById('results-type');

const startingFamily = document.getElementById('starting-family');
const endingFamily = document.getElementById('ending-family');
const startingTree = document.getElementById('starting-tree');
const endingTree = document.getElementById('ending-tree');

const multiFamily = document.getElementById('multi-family');
const multiTrees = document.getElementById('multi-trees');

const searchesToOpenHeader = document.getElementById('searches-to-open-header');
const searchesToOpenList = document.getElementById('searches-to-open-list');

const noSearchesMsgContainer = document.getElementById('no-searches-msg');
const noSearchesMsg = 'Wow, such empty.';
noSearchesMsgContainer.textContent = noSearchesMsg;

var activeSearches = [];

setup();

document.addEventListener('keydown', function(e) {
    if (e.key === ' ' && activeSearches.length > 0) {
        openSearchLogic();
    }
    else if (e.key === 'Enter') {
        let res = null;
        if (selectType === 'range select') {
            res = createSearchDataFromRange();
        }
        else if (selectType === 'multi select families'){
            res = createSearchesFromMultiFamilies();
        }
        else if (selectType === 'multi select trees'){
            res = createSearchesFromMultiTrees();
        }
        if (res) {
            updateSearchesCount();
        }
    }
})

function updateSearchesCount() {
    if (activeSearches.length > 0) {
        searchesToOpenHeader.innerText = `searches to open (${activeSearches.length})`;
    }
    else {
        searchesToOpenHeader.innerText = 'searches to open';
        noSearchesMsgContainer.textContent = noSearchesMsg;
    }
}

function setup() {
    setupElementFunctions();
    setupSavedSearches();
    setupTreeOptions();
    setupSavedInputs();
}

function setupElementFunctions() {
    selectTypeElement.onchange = function () {
        autosaveSettings();
        changeSelectType();
    }
    resultsTypeElement.onchange = function () {
        autosaveSettings();
        changeSearchPlaceholder();
    } 
    
    let inputsElsToSave = [
        searchTermElement, searchByElement, openTypeElement,
        startingFamily, endingFamily, startingTree, endingTree // tree range stuff
    ];
    inputsElsToSave.forEach((el)=>{
        el.onchange = autosaveSettings;
    })
    
    document.getElementById('clear-searches').onclick = clearSearches;
}

function setupSavedSearches() {
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches'));
    if (Array.isArray(savedSearches)) {
        activeSearches = savedSearches;
        if (savedSearches.length > 0) {
            noSearchesMsgContainer.textContent = '';
            savedSearches.forEach((savedSearch) => {
                addSearchToDisplay(savedSearch.treeNameToSearch, savedSearch.searchTerm, savedSearch.resultsType);
            })
            updateSearchesCount();
        }
    }
}

function setupTreeOptions() {
    treeFams.forEach((fam) => {
        // add family options
        [startingFamily, endingFamily, multiFamily].forEach((parentElement) => {
            let famOption = document.createElement('option');
            famOption.innerText = fam;
            parentElement.appendChild(famOption);
        })
        // add tree options
        treesDict[fam].forEach((tree) => {
            [startingTree, endingTree, multiTrees].forEach((parentElement) => {
                let treeOption = document.createElement('option');
                treeOption.innerText = tree.commonName;
                treeOption.setAttribute("family", fam);
                treeOption.setAttribute("treeObject", JSON.stringify(tree));
                parentElement.appendChild(treeOption);
            })
        })
    });
    MultiselectDropdown(window.MultiselectDropdownOptions);
}

function setupSavedInputs() {
    const savedInputs = JSON.parse(localStorage.getItem('savedInputs'));
    if (savedInputs && typeof savedInputs === 'object') {
        selectTypeElement.value = savedInputs.selectType;
        if (savedInputs.selectType !== 'range select') {
            changeSelectType();
        }
        let savedInputElements = [
            [searchTermElement, 'searchTerm'],
            [searchByElement, 'searchBy'],
            [openTypeElement, 'openType'],
            [resultsTypeElement, 'resultsType'],
            [startingFamily, 'startingFamily'],
            [endingFamily, 'endingFamily'],
            [startingTree, 'startingTree'],
            [endingTree, 'endingTree']
        ];

        savedInputElements.forEach((pair) => {
            let el = pair[0];
            let input = pair[1];
            if (savedInputs[input]) {
                el.value = savedInputs[input];
            }
        });
    }
    changeSearchPlaceholder();
}

function changeSelectType() {
    selectType = selectTypeElement.value;

    let rangeSelectElements = [startingFamily, endingFamily, startingTree, endingTree];
    let multiSelectElements = [multiFamily, multiTrees];

    const multiFamilyDropdown = document.getElementById('multi-family-dropdown');
    const multiTreesDropdown = document.getElementById('multi-trees-dropdown');
    
    let scriptedMultiSelectElements = [multiFamilyDropdown, multiTreesDropdown];

    if (selectType === 'range select') {
        hideElements(multiSelectElements.concat([multiFamily, multiTrees]));
        hideElements(scriptedMultiSelectElements);
        showElements(rangeSelectElements);
    }
    else if (selectType === 'multi select families') {
        hideElements(rangeSelectElements);
        multiTreesDropdown.style.display = 'none';
        multiFamilyDropdown.style.display = 'inline-block';
    }
    else if (selectType === 'multi select trees') {
        hideElements(rangeSelectElements);
        multiFamilyDropdown.style.display = 'none';
        multiTreesDropdown.style.display = 'inline-block';
    }
}

function changeSearchPlaceholder() {
    if (resultsTypeElement.value === 'url') {
        searchTermElement.placeholder = 'url';
    }
    else {
        searchTermElement.placeholder = 'search term(s)';
    }
}

function hideElements(elements) {
    elements.forEach((element) => {
        element.style.display = 'none';
    })
}

function showElements(elements, displayType) {
    if (!displayType) displayType = 'inline';
    elements.forEach((element) => {
        element.style.display = displayType;
    })
}

function createSearchDataFromRange() { 
    if ([startingTree, endingTree, startingFamily, endingFamily].some(val => val === null)) {
        alert(errorAlert);
        console.error('elements not set up correctly');
        return false;
    }

    const searchTermVal = searchTermElement.value.trim();
    let startingTreeVal = (startingTree.value !== "starting tree") ? startingTree.value : null;
    let endingTreeVal = (endingTree.value !== "ending tree") ? endingTree.value : null;
    let startingFamilyVal = (startingFamily.value !== "starting family") ? startingFamily.value : null;
    let endingFamilyVal = (endingFamily.value !== "ending family") ? endingFamily.value : null;

    if (endingFamilyVal && !startingFamilyVal) {
        alert('Input a starting family!');
        return false;
    }
    if (endingTreeVal && !startingTreeVal) {
        alert('Input a starting tree!');
        return false;
    }
    
    if (startingTreeVal) { 
        // To save time if starting tree's family is later than starting family
        startingFamilyVal = startingTree.options[startingTree.selectedIndex].getAttribute('family');
        endingFamilyVal = endingTree.options[endingTree.selectedIndex].getAttribute('family');
    }
    else if (startingFamilyVal) { 
        // No starting tree, get from starting family
        startingTreeVal = treesDict[startingFamilyVal][0].commonName;
    }

    if (!endingFamilyVal && startingFamilyVal) {
        endingFamilyVal = startingFamilyVal;
    }

    if (!endingTreeVal && endingFamilyVal) { // No ending tree, get from ending family
        endingTreeVal = treesDict[endingFamilyVal][treesDict[endingFamilyVal].length - 1].commonName;
    }

    console.log(startingTreeVal, endingTreeVal, startingFamilyVal, endingFamilyVal);

    // If any input values are blank, then don't create a search
    if ([startingTreeVal, endingTreeVal, startingFamilyVal, endingFamilyVal].some(val => val === null)) {
        alert(`You're missing something!`);
        return false;
    }
    else if (!searchTermVal) {
        alert('Enter a search term!');
        return false;
    }

    createSearchesFromRange({
        startingFamily: startingFamilyVal,
        endingFamily: endingFamilyVal,
        startingTree: startingTreeVal,
        endingTree: endingTreeVal,
        searchTerm: searchTermVal
    });

    return true;
}

function createSearchesFromRange(data) {
    if (!data.startingFamily) {
        return false;
    }

    let currentFamily = data.startingFamily;
    let currentTree = data.startingTree;
    let currentTrees = treesDict[currentFamily];
    let famIndex = treeFams.indexOf(currentFamily);
    let treeIndex = -1;
    for (let i = 0; i < currentTrees.length; i++) {
        if (currentTrees[i].commonName === data.startingTree) {
            treeIndex = i;
            break;
        }
    }

    if (famIndex === -1 || treeIndex === -1) {
        alert(errorAlert);
        console.error('famindex or treeindex is not found (-1): ', `famIndex: ${famIndex}`, `treeIndex: ${treeIndex}`);
        return false;
    }

    do {
        do {
            currentTree = currentTrees[treeIndex];
            console.log(currentTree.commonName, treeIndex);
            addSearchesLogic(currentTree, data.searchTerm);
            
            treeIndex++;
            if (treeIndex === 100) {
                alert(errorAlert);
                console.error('treeindex overload');
                return false;
            }
        }
        while (currentTree.commonName !== data.endingTree && treeIndex < currentTrees.length);

        console.log('\n');

        treeIndex = 0;
        famIndex++;
        currentFamily = treeFams[famIndex];
        currentTrees = treesDict[currentFamily];
        if (famIndex === 100) {
            alert(errorAlert);
            console.error('famindex overload');
            return false;
        }
    }
    while (currentTree.commonName !== data.endingTree);
    return true;
}

function createSearchesFromMultiFamilies() {
    const families = getAllSelectedElements(multiFamily);
    const searchTermVal = searchTermElement.value.trim();
    if (!families) {
        alert('Select at least one family!');
        return false;
    }
    if (!searchTermVal) {
        alert('Enter a search term!');
        return false;
    }
    families.forEach((family)=>{
        const trees = treesDict[family.value];
        trees.forEach((tree)=>{
            addSearchesLogic(tree, searchTermVal);
        });
    })
    return true;
}

function createSearchesFromMultiTrees() {
    const trees = getAllSelectedElements(multiTrees);
    const searchTermVal = searchTermElement.value.trim();

    if (!trees) {
        alert('Select at least one tree!');
        return false;
    }
    if (!searchTermVal) {
        alert('Enter a search term!');
        return false;
    }

    trees.forEach((tree)=>{
        let treeObject = JSON.parse(tree.getAttribute('treeObject'));
        addSearchesLogic(treeObject, searchTermVal);
    });

    return true;
}

function getAllSelectedElements(selectElement) {
    const optionElements = Array.from(selectElement.options);
    let selectedOptions = [];
    optionElements.forEach((optionElement) => {
        if (optionElement.selected) {
            selectedOptions.push(optionElement);
        }
    })

    return selectedOptions;
}

function getAllSelectedElementsValues(selectElement) {
    const optionElements = Array.from(selectElement.options);
    let selectedOptionsValues = [];
    optionElements.forEach((optionElement) => {
        if (optionElement.selected) {
            selectedOptionsValues.push(optionElement.value);
        }
    })

    return selectedOptionsValues;
}

function addSearchesLogic(tree, searchTerm) {    
    const searchTerms = searchTerm.split(',');
    const searchBy = searchByElement.value;
    let treeName = '';
    if (searchBy === 'search by common name') {
        treeName = tree.commonName; 
    }
    else {
        treeName = tree.scientificName; 
    }

    searchTerms.forEach((searchTerm) => {
        addSearch(treeName, tree, searchTerm.trim());
    })

    noSearchesMsgContainer.textContent = '';
    autosaveSearches();
}

function addSearch(treeNameToSearch, tree, searchTerm) {
    activeSearches.push({
        commonName: tree.commonName,
        treeNameToSearch: treeNameToSearch,
        searchTerm: searchTerm,
        resultsType: resultsTypeElement.value
    });
    addSearchToDisplay(treeNameToSearch, searchTerm, resultsTypeElement.value);
}

function addSearchToDisplay(treeNameToSearch, searchTerm, type) {
    const li = document.createElement('li');
    li.textContent = `${treeNameToSearch}: ${searchTerm}`;
    if (type === 'images') {
        li.textContent += ' 📷';
    }
    searchesToOpenList.appendChild(li);
}

function removeSearch() {
    const searches = searchesToOpenList.getElementsByTagName('li');
    searchesToOpenList.removeChild(searches[0]);
    activeSearches.shift();

    autosaveSearches();
}

function clearSearches(){
    const searches = searchesToOpenList.getElementsByTagName('li');
    if (searches.length > 0) {
        Array.from(searches).forEach((search) => {
            searchesToOpenList.removeChild(search);
        })
        activeSearches = [];
        updateSearchesCount();
    }
    autosaveSearches();
}

function openSearchLogic() {
    const openType = openTypeElement.value;
    if (openType === 'open one by one') {
        openSearch();
        updateSearchesCount();
    }
    else if (openType === 'open by tree') { // open all consecutive queries with same tree
        let topmostSearch = activeSearches[0];
        let treeToSearchAll = topmostSearch.commonName;
        let currentTree = treeToSearchAll;

        do {
            openSearch();
            topmostSearch = activeSearches[0];
            currentTree = topmostSearch.commonName;
        }
        while (currentTree === treeToSearchAll);
        updateSearchesCount();
    }
    else if (openType === 'open all at once') {
        do {
            openSearch();
        }
        while (activeSearches.length > 0);
    }
}

function autosaveSearches() { // use when adding, removing, or clearing searches
    if (autosave) {
        localStorage.setItem('savedSearches', JSON.stringify(activeSearches));
    }
}

function autosaveSettings() {
    if (autosave) {
        const savedInputs = {
            selectType: selectTypeElement.value,
            searchTerm: searchTermElement.value.trim(),
            searchBy: searchByElement.value,
            openType: openTypeElement.value,
            resultsType: resultsTypeElement.value,
            startingFamily: startingFamily.value,
            endingFamily: endingFamily.value,
            startingTree: startingTree.value,
            endingTree: endingTree.value/*,
            selectedFamilies: getAllSelectedElementsValues(multiFamily),
            selectedTrees: getAllSelectedElementsValues(multiTrees)*/
        } 

        localStorage.setItem('savedInputs', JSON.stringify(savedInputs));
    }
}

function openSearch() {
    let searchData = activeSearches[0];
    let resultsType = searchData.resultsType;
    let url = null;

    if (resultsType === 'url') {
        let tree = searchData.treeNameToSearch.replace(/ /g, '%20'); // Convert all spaces to url-friendly version, %20
        url = `${searchData.searchTerm}${tree}`;
    }
    else {
        let query = `${searchData.treeNameToSearch}+${searchData.searchTerm}`;
        url =  `https://www.google.com/search?q=${query}`;
        if (resultsType === 'images') {
            url += '&tbm=isch';
        }
    }

    removeSearch();
    if (url) {
        openUrl(url);
    }
    else {
        console.error('url not built correctly');
    }
}

function openUrl(url) {
    window.open(url, "_blank");
}

/*
To process raw list without NODE.JS... (old version)

var treesDict = processTreesData(treesRaw); // Array of families. Each family has array of trees. I should probably use SQL but I'm poor :(
var activeSearches = [];

document.addEventListener('keydown', function(e) {
    if (e.key === ' ' && activeSearches.length > 0) {
        const url = activeSearches[0];
        activeSearches.shift();
        removeSearch();
        openUrl(url);
    }
    else if (e.key === 'Enter') {
        createSearchData();
    }
})

function processTreesData(raw) {
    var dict = {};

    const familyDelimiter = "Family";
    const lines = raw.split("\n");

    let currentFamily = "";

    const treeNameRegex = /^([\w\s]+)\s*\((.+)\)/;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') continue;
        if (lines[i].includes(familyDelimiter)) {
            currentFamily = lines[i].trim();
            dict[currentFamily] = [];

            let fam = document.createElement('option')
            fam.innerText = currentFamily;
            autoFamilies.appendChild(fam);
        }
        else {
            const lineRaw = lines[i].trim();
            const matches = lineRaw.match(treeNameRegex);
            if (matches) { // Only perform if matches Scientific Name (Common Name) format.
                const scientificName = matches[1].trim();
                const commonName = matches[2].trim();
                dict[currentFamily].push({commonName: commonName, scientificName: scientificName});
                
                let tree = document.createElement('option')
                tree.innerText = commonName;
                autoTrees.appendChild(tree);
            }
        }
    }

    return dict;
}

*/