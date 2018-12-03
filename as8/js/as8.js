/*
91.61 Assignment6: Dynamic Table
Tak Kwan Lo, UMass Lowell Computer Science, Tak_Lo@student.uml.edu
Copyright (c) 2018 by Tak K. Lo. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.
updated by TKL on December 2, 2018
*/

// create sliders
function createSliders() {
    const sliders = [1, 2, 3, 4]
    for (var i = 0; i < sliders.length; i++) { // declare slider variables
        const slider = $('#slider' + sliders[i])
        const input = $('#input' + sliders[i])

        input.on('change', e => { // update slider
            const id = e.target.id
            const input = id.substring(4, id.length)
            const inputValue = Number(e.target.value)
            const config = {
                value: inputValue,
                min: inputValue - 10,
                max: inputValue + 10,
            }
            slider.slider({ ...config
            })
        })
        slider.slider({
            value: 0,
            min: -10,
            max: 10,
            step: 1,
            slide: function(event, ui) {
                input.val(ui.value); // update text field
            }
        })
    }
}

//create tab
function insertTab(tabs, tables, table, values) {
    const tabTitle = `${values['mr-start']}-${values['mr-end']} x
                    ${values['mc-start']}-${values['mc-end']}`
    tables.push(tabTitle)
    const closeSpan = `<span class='ui-icon ui-icon-close' role='presentation'>`
    const list = `<li><a href="#tabs-${tables.length}">${tabTitle}</a>${closeSpan}</li>`
    const tableList = $('#tableList').append(list)
    const tableDiv = document.createElement('div')
    tableDiv.setAttribute('id', `tabs-${tables.length}`)
    tableDiv.setAttribute('class', `tabContent`)
    tableDiv.append(table)
    $('#tabs').append(tableDiv)
    $("#tabs").tabs("refresh")
    $('')
    tabs.on("click", "span.ui-icon-close", function() { // cancel present tab 
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    })
}

//remove all tabs
function removeTabs() {
    const tabs = $("#tabs .tabContent")
    for (var i = 0; i < tabs.length; i++) { // remove tabs' contents
        tabs[i].remove()
    }
    const ul = $('#tableList')
    ul.html('') //remove all li in ul
}

$(() => {
    $('#myForm').validate()
    const tables = []
    const tabs = $("#tabs").tabs()
    $('#myForm').on('submit', function(e) {
        e.preventDefault()
        const inputs = $('#myForm input')

        const values = {}
        let emptyFlag = false
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            values[input.name] = Number(input.value)
            if (emptyFlag = input.value ? false : true) {
                break
            }
        }
        const table = !emptyFlag && mySubmit(values) //if empltyFlag is true, then mySubmit will not trigger
        insertTab(tabs, tables, table, values)
    })

    createSliders()
    $('#removeTabs').on('click', removeTabs)
})

var elements = ["Starting Multiplier", "Ending Multiplier", "Starting Multiplicand", "Ending Multiplicand"];

function mySubmit(values) {

    // cleanTable(); // deletes the table so that the web does not show the previous table generated
    return createTable(values);
}

function createTable(values) {
    // var myTable = document.getElementById("myTable");
    var myTable = document.createElement('table');

    // assigning var with a element value does not assign var with as a number, therefore need global function number()
    var stMultr = values["mr-start"];
    var enMultr = values["mr-end"];
    var stMultc = values["mc-start"];
    var enMultc = values["mc-end"];

    var difMultr;
    var difMultc;
    // determining the number of iterations for the loops
    if (stMultr < enMultr) {
        difMultr = enMultr - stMultr;
    } else {
        difMultr = stMultr - enMultr;
    }

    if (stMultc < enMultc) {
        difMultc = enMultc - stMultc;
    } else {
        difMultc = stMultc - enMultc;
    }


    var i;
    var j;
    var result;
    var cell;

    // have to do this because if not, then the rest of the table implementation won't work
    row = myTable.insertRow(0); // declaring first row of table
    row.insertCell(0); // declaring first cell of first row

    // implementing data of first row,  also implementing background color to them
    if (stMultr < enMultr) {
        for (i = 0; i <= difMultr; i++) {
            cell = myTable.rows[0].insertCell(i + 1);
            cell.innerHTML = stMultr + i;
            cell.classList.add("color");
        }
    } else {
        for (i = 0; i <= difMultr; i++) {
            cell = myTable.rows[0].insertCell(i + 1);
            cell.innerHTML = stMultr - i;
            cell.classList.add("color");
        }
    }

    // implementing data of first column,  also implementing background color to them
    if (stMultc < enMultc) {
        for (i = 0; i <= difMultc; i++) {
            myTable.insertRow(i + 1);
            cell = myTable.rows[i + 1].insertCell(0);
            cell.innerHTML = stMultc + i;
            cell.classList.add("color");
        }
    } else {
        for (i = 0; i <= difMultc; i++) {
            myTable.insertRow(i + 1);
            cell = myTable.rows[i + 1].insertCell(0);
            cell.innerHTML = stMultc - i;
            cell.classList.add("color");
        }
    }

    // implementing rest of the data into Table
    for (j = 1; j <= difMultc + 1; j++) {
        for (i = 1; i <= difMultr + 1; i++) {
            if (stMultr < enMultr && stMultc < enMultc) {
                myTable.rows[j].insertCell(i).innerHTML = (stMultc + j - 1) * (stMultr + i - 1);
            } else if (stMultr >= enMultr && stMultc < enMultc) {
                myTable.rows[j].insertCell(i).innerHTML = (stMultc + j - 1) * (stMultr - i + 1);
            } else if (stMultr < enMultr && stMultc >= enMultc) {
                myTable.rows[j].insertCell(i).innerHTML = (stMultc - j + 1) * (stMultr + i - 1);
            } else {
                myTable.rows[j].insertCell(i).innerHTML = (stMultc - j + 1) * (stMultr - i + 1);
            }
        }
    }
    return myTable
}

function cleanTable() { // deletes the table by deleting rows of the table
    var i;
    var j;
    var myTable = document.getElementById("myTable");

    for (j = myTable.rows.length - 1; j >= 0; j--) {
        myTable.deleteRow(j);
    }

}
