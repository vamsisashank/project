document.getElementById('date').innerHTML = new Date().toDateString();
let tableData; 
const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  row.setAttribute('class', 'data-table-header');
  for (let key of data.slice(1,4)) {
    let th = document.createElement("th");
    let div = document.createElement("div");
    div.setAttribute('class', 'data-table-header-cell');
    let text = document.createTextNode(key);
    div.appendChild(text);
    th.appendChild(div);
    row.appendChild(th);
  }  
};

const generateTable = (table, data) => {
let tbdy = document.createElement('tbody');  
tbdy.setAttribute('class', 'data-table-data-body');
tbdy.setAttribute('id', 'data-table-body');
  for (let element of data) {
    let row = table.insertRow();
    row.setAttribute('class', 'data-table-data-row');
    let newObject;
    const { Type, Children, Subtype, ...rest } = element;
    if (Type === 'Folder') {
        newObject = {
            ...rest,
            Name: '<i class="fa fa-folder"></i> &nbsp' +  rest.Name
        }
    } else if (Type === 'Document') {
        switch(Subtype) {
          case 'Image':         
          newObject = {
            ...rest,
            Name: '<i class="fa fa-file-image-o"></i> &nbsp' + rest.Name
        }
        break;
        case 'Spreadsheet':
            newObject = {
                    ...rest,
                    Name: '<i class="fa fa-file-excel-o"></i> &nbsp' + rest.Name
                }
            break;
        case 'Executable': 
          newObject = {
            ...rest,
            Name: '<i class="fa fa-cloud-download"></i> &nbsp' + rest.Name
        }
        break;
        case 'Package':
                newObject = {
                    ...rest,
                    Name: '<i class="fa fa-file-archive-o"></i> &nbsp' + rest.Name
                }
        break;
        case 'Presentation':  
          newObject = {
            ...rest,
            Name: '<i class="fa fa-file-powerpoint-o"></i> &nbsp' + rest.Name
        }
        break;
        default:  
          newObject = {
            ...rest,
            Name: '<i class="fa fa-file-word-o"></i> &nbsp' + rest.Name
        }
        break;
        }
    }
      for (key in newObject) { 
        let cell = row.insertCell();
        let div = document.createElement("div");
        div.setAttribute('class', 'data-table-cell');
        let text = newObject[key];
        let value = document.createElement('span');
        value.innerHTML = text;
        div.appendChild(value);
        cell.appendChild(div);
    }
  }
};

const addActionsSection = (data) => {
  var tbl = document.getElementById('my-table');
  var mainClosedDiv = document.createElement("div");
  mainClosedDiv.setAttribute('class', 'actions-section');
  mainClosedDiv.setAttribute('id', 'section');
  var closedDiv = document.createElement("div");
  closedDiv.setAttribute('class', 'actions-column');
  closedDiv.setAttribute('id', 'closed-div');
  var openDiv = document.createElement("div");
  openDiv.setAttribute('class', 'actions-column-open');
  openDiv.setAttribute('id', 'open-div');
  for (var i = 0; i < data.length; i++) {
      var innerDiv = document.createElement("div");
      innerDiv.setAttribute('class', 'action');
      innerDiv.innerHTML = getImage(data[i].ImageName);
      var otherDiv = document.createElement("div");
      otherDiv.setAttribute('class', 'action');
      otherDiv.innerHTML = getImage(data[i].ImageName);
      closedDiv.appendChild(otherDiv);
      openDiv.appendChild(innerDiv);
      mainClosedDiv.appendChild(closedDiv);
      mainClosedDiv.appendChild(openDiv);
      tbl.appendChild(mainClosedDiv);
  }
  var newDiv = document.createElement("div");
  newDiv.setAttribute('onclick', 'toggleOpen()');
  newDiv.setAttribute('class', 'action-open');
  newDiv.setAttribute('id', 'action-open');
  newDiv.innerHTML = '<i class="fa fa-arrow-left"></i>';
  var makeDiv = document.createElement("button");
  makeDiv.setAttribute('onclick', 'toggleClose()');
  makeDiv.setAttribute('type', 'button');
  makeDiv.setAttribute('class', 'btn btn-primary action-close');
  makeDiv.setAttribute('id', 'action-close');
  makeDiv.innerHTML = '<i class="fa fa-arrow-right"></i>';
  mainClosedDiv.appendChild(newDiv);
  mainClosedDiv.appendChild(makeDiv);
  tbl.appendChild(mainClosedDiv);
};

const getImage = (ImageName) => { 
  switch (ImageName) {
     case 'upload':
         return '<i class="fa fa-upload"></i>';
     case 'download':
         return '<i class="fa fa-download"></i>';
     case 'create_folder':
         return '<i class="fa fa-folder-open"></i>';
     case 'share':
         return '<i class="fa fa-share-alt"></i>';
     case 'tag':
         return '<i class="fa fa-tag"></i>';
     case 'cut':
         return '<i class="fa fa-scissors"></i>';
     case 'copy':
         return '<i class="fa fa-files-o"></i>';
     case 'paste':
         return '<i class="fa fa-clipboard"></i>';
     case 'delete':
         return '<i class="fa fa-trash-o"></i>';
     case 'search':
         return '<i class="fa fa-search"></i>';
     case 'folder_settings':
         return '<i class="fa fa-file-code-o"></i>';
     case 'send_email':
         return '<i class="fa fa-paper-plane"></i>';
     case 'send_link':
         return '<i class="fa fa-link"></i>';
     case 'history':
         return '<i class="fa fa-history"></i>';
     case 'refresh':    
          return '<i class="fa fa-refresh"></i>';                                                    
     default:
         return '<i class="fa fa-arrow-left"></i>';     
  }
};

const toggleOpen = () => {
  var x1 = document.getElementById("open-div"); 
  var y1 = document.getElementById("action-close"); 
  var x2 = document.getElementById("closed-div");
  var y2 = document.getElementById("action-open");  
    x1.style.display = "inline-flex";
    x1.style.flexFlow = "wrap";
    x1.style.width = "300px";
    y1.style.display = "block";
    x2.style.display = "none";
    y2.style.display = "none";
};

const toggleClose = () => {
var x2 = document.getElementById("closed-div");
var y2 = document.getElementById("action-open"); 
var x1 = document.getElementById("open-div"); 
var y1 = document.getElementById("action-close"); 
    x1.style.display = "none";
    y1.style.display = "none";
    x2.style.display = "block";
    y2.style.display = "block";
};

const sortTable = (table, col, reverse) => {
    var tb = table.tBodies[0], // tbody to actually get data
        tr = Array.prototype.slice.call(tb.rows, 0), // pushing rows into  the array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sorting rows function
        return reverse // `-1 *` if want opposite order
            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append row in order
}

const makeSortable = (table) => {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0) (function (i) {
        var dir = 1;
        th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
    }(i));
}

const makeHeadersSortable = (parent) => {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'), i = t.length;
    while (--i >= 0) makeSortable(t[i]);
};

const highlight = (e) => {
    if (selected[0]) selected[0].className = '';
    e.target.parentNode.className = 'selected';
};

const fnselect = () => {
    var tr = document.getElementsByClassName("selected")[0].innerText;
    alert(tr);
};

let table = document.querySelector('table'),    
selected = table.getElementsByClassName('selected');
table.onclick = highlight;

fetch('/sample.json').then(res => res.json()).then((response) => { 
  tableData = response;
  let data = Object.keys(tableData.GridData[0]);
  generateTable(table, tableData.GridData);
  generateTableHead(table, data); 
  addActionsSection(tableData.Actions);
  makeHeadersSortable();
});
