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

const addColumn = () => {
  var tbl = document.getElementById('my-table').getElementsByTagName('tbody');
  console.log(tbl);
};

let table = document.querySelector('table');
fetch('/sample.json').then(res => res.json()).then((response) => { 
  tableData = response;
  let data = Object.keys(tableData.GridData[0]);
  generateTable(table, tableData.GridData);
  generateTableHead(table, data); 
  console.log(tableData.Actions); 
  addColumn();
});
