const oddsContainer = document.getElementById('oddsContainer')
tableHeader = "<th>Win Market</th><th>William Hill</th><th>Betfair</th><th>Coral</th>"

window.onload = async function (e) {
    e.preventDefault();
    const config = { params: { apiKey: '067670bae3eba3ab9ac4437862b5a52f', regions: 'uk' } }
    const res = await axios.get(`https://api.the-odds-api.com/v4/sports/soccer_epl/odds/`, config)
    const games = res.data
    console.log(games)
    fetchOdds(games)
}

function createTable() {
    let table = document.createElement('table');
        for (let i = 0; i < 4; i++) {
            table.append(document.createElement('tr'));
        }
    table.classList.add('table')
    return table;
}

function makeRow(count, currentRow) {
    const cells = [];
    for (let i = 0; i < count; i++) {
        let cell = document.createElement('td');
        cells.push(cell);
        currentRow.append(cell)
    }
    return cells;
}

function findObject(array, searchKey) {
    let output = {};
    for (let object of array) {
        if (object.key === searchKey) {
            output = object
        }
    }
    return output

}


function fetchOdds(latestGames) {
    for (let game of latestGames) {
            gameTitle = document.createElement('h2')
            gameTitle.innerHTML = `${game.away_team} - ${game.home_team} (${game.commence_time})`;
            oddsContainer.append(gameTitle);
            oddsContainer.append(createTable());
            let williamHill = findObject(game.bookmakers, 'williamhill');
            let coral = findObject(game.bookmakers, 'coral');
            let betfair = findObject(game.bookmakers, 'betfair')
            var tables =  oddsContainer.querySelectorAll('table');
            var currentTable = tables[latestGames.indexOf(game)];
            currentRows = currentTable.childNodes;
            currentTable.firstChild.innerHTML = tableHeader;
            const row2Cells = makeRow(4, currentRows[1]);
            const row3Cells = makeRow(4, currentRows[2]);
            const row4Cells = makeRow(4, currentRows[3]);
        
        
            //row2
            row2Cells[0].innerHTML = game.away_team;
            try {
                row2Cells[1].innerHTML = `<a href="https://www.williamhill.com" target="_blank">${williamHill.markets[0].outcomes[0].price}</a>`;
            }
            catch (e) {
                row2Cells[1].innerHTML = 'N/A';
            }
            try {
            row2Cells[2].innerHTML = `<a href="https://www.betfair.com" target="_blank">${betfair.markets[0].outcomes[0].price}</a>`;
             }
             catch (e) {
            row2Cells[2].innerHTML = 'N/A';
             }
            try {
            row2Cells[3].innerHTML = `<a href="https://www.coral.co.uk" target="_blank">${coral.markets[0].outcomes[0].price}</a>`;
            }
            catch (e) {
            row2Cells[3].innerHTML = 'N/A';
            }
        
            //row3
            row3Cells[0].innerHTML = game.home_team;
            try {
                row3Cells[1].innerHTML = `<a href="https://www.williamhill.com" target="_blank">${williamHill.markets[0].outcomes[1].price}</a>`;
            }
            catch (e) {
                row3Cells[1].innerHTML = 'N/A';
            }
            try {
            row3Cells[2].innerHTML = `<a href="https://www.betfair.com" target="_blank">${betfair.markets[0].outcomes[1].price}</a>`;
             }
             catch (e) {
            row3Cells[2].innerHTML = 'N/A';
             }
            try {
            row3Cells[3].innerHTML = `<a href="https://www.coral.co.uk" target="_blank">${coral.markets[0].outcomes[1].price}</a>`;
            }
            catch (e) {
            row3Cells[3].innerHTML = 'N/A';
            }

            //row4
            row4Cells[0].innerHTML = 'Draw';
            try {
                row4Cells[1].innerHTML = `<a href="https://www.williamhill.com" target="_blank">${williamHill.markets[0].outcomes[2].price}</a>`;
            }
            catch (e) {
                row4Cells[1].innerHTML = 'N/A';
            }
            try {
            row4Cells[2].innerHTML = `<a href="https://www.betfair.com" target="_blank">${betfair.markets[0].outcomes[2].price}</a>`;
             }
             catch (e) {
            row4Cells[2].innerHTML = 'N/A';
             }
            try {
            row4Cells[3].innerHTML = `<a href="https://www.coral.co.uk" target="_blank">${coral.markets[0].outcomes[2].price}</a>`;
            }
            catch (e) {
            row4Cells[3].innerHTML = 'N/A';
            }

    }
}