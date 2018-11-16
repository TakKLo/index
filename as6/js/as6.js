/*
91.61 Assignment6: Dynamic Table
Tak Kwan Lo, UMass Lowell Computer Science, Tak_Lo@student.uml.edu
Copyright (c) 2018 by Tak K. Lo. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.
updated by TKL on November 15, 2018
*/

var elements = ["Starting Multiplier", "Ending Multiplier", "Starting Multiplicand", "Ending Multiplicand"];

function mySubmit()
{

  var i;
  var input = document.getElementById("input");
  document.getElementById("errors").innerHTML="";

  cleanTable(); // deletes the table so that the web does not show the previous table generated

  for (i = 0; i < input.length - 1 ;i++) { // add error message if there is error, else deletes any previous error messages
    input.elements[i].classList.remove("error");
    if (input.elements[i].value == "") {
         document.getElementById("errors").innerHTML="Invalid Input: Please enter a number for " + elements[i];
         input.elements[i].classList.add("error");
         return false;
    }
  }

  createTable();

}

function createTable()
{

  var input = document.getElementById("input");
  var myTable = document.getElementById("myTable");

  // assigning var with a element value does not assign var with as a number, therefore need global function number()
  var stMultr = Number(input.elements[0].value);
  var enMultr = Number(input.elements[1].value);
  var stMultc = Number(input.elements[2].value);
  var enMultc = Number(input.elements[3].value);

  var difMultr;
  var difMultc;
  // determining the number of iterations for the loops
  if (stMultr < enMultr) {
    difMultr = enMultr - stMultr;
  }
  else {
    difMultr = stMultr - enMultr;
  }

  if (stMultc < enMultc) {
    difMultc = enMultc - stMultc;
  }
  else {
    difMultc = stMultc - enMultc;
  }


  var i;
  var j;
  var result;
  var cell;

  // have to do this because if not, then the rest of the table implementation won't work
  row = myTable.insertRow(0); // declaring first row of table
  row.insertCell(0);  // declaring first cell of first row

  // implementing data of first row,  also implementing background color to them
  if (stMultr < enMultr) {
    for (i = 0; i <= difMultr ;i++) {
      cell = myTable.rows[0].insertCell(i+1);
      cell.innerHTML = stMultr + i;
      cell.classList.add("color");
    }
  }
  else {
    for (i = 0; i <= difMultr ;i++) {
      cell = myTable.rows[0].insertCell(i+1);
      cell.innerHTML = stMultr - i;
      cell.classList.add("color");
    }
  }

  // implementing data of first column,  also implementing background color to them
  if (stMultc < enMultc) {
    for (i = 0; i <= difMultc ;i++) {
      myTable.insertRow(i+1);
      cell = myTable.rows[i+1].insertCell(0);
      cell.innerHTML = stMultc + i;
      cell.classList.add("color");
    }
  }
  else {
    for (i = 0; i <= difMultc ;i++) {
      myTable.insertRow(i+1);
      cell = myTable.rows[i+1].insertCell(0);
      cell.innerHTML = stMultc - i;
      cell.classList.add("color");
    }
  }

  // implementing rest of the data into Table
  for (j = 1; j <= difMultc + 1 ; j++){
    for (i = 1; i <= difMultr + 1; i++){
      if (stMultr < enMultr && stMultc < enMultc) {
        myTable.rows[j].insertCell(i).innerHTML = (stMultc+j-1) * (stMultr+i-1);
      }
      else if (stMultr >= enMultr && stMultc < enMultc) {
        myTable.rows[j].insertCell(i).innerHTML = (stMultc+j-1) * (stMultr-i+1);
      }
      else if (stMultr < enMultr && stMultc >= enMultc) {
        myTable.rows[j].insertCell(i).innerHTML = (stMultc-j+1) * (stMultr+i-1);
      }
      else {
        myTable.rows[j].insertCell(i).innerHTML = (stMultc-j+1) * (stMultr-i+1);
      }
    }
  }




}

function cleanTable() { // deletes the table by deleting rows of the table
  var i;
  var j;
  var myTable = document.getElementById("myTable");

  for(j=myTable.rows.length-1;j >= 0;j--){
    myTable.deleteRow(j);
  }

}
