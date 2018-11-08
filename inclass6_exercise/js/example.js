// ADD NEW ITEM TO END OF LIST
var node = document.createElement("LI");
var textnode = document.createTextNode("cream");
node.appendChild(textnode);
document.getElementById("one").parentNode.appendChild(node);

// ADD NEW ITEM START OF LIST
var newItem = document.createElement("LI");
var textnode = document.createTextNode("kale");
newItem.appendChild(textnode);

var list = document.getElementById("one").parentNode;
list.insertBefore(newItem, list.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var all = document.querySelectorAll("li");
for (var i = 0; i < all.length; i++)
{
  all[i].classList.add("cool");
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var h2 = document.querySelector("h2");
var length = document.createElement("h2");
var node = document.createTextNode(all.length);
length.appendChild(node);
h2.appendChild(length);
