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

const addActionsSection = (data) => {
  var tbl = document.getElementById('my-table');
  var mainClosedDiv = document.createElement("div");
  mainClosedDiv.setAttribute('class', 'actions-section');
  mainClosedDiv.setAttribute('id', 'section-closed');
  var div = document.createElement("div");
  div.setAttribute('class', 'actions-column');
  div.setAttribute('id', 'my-div');
  for (var i = 0; i < data.length; i++) {
      var innerDiv = document.createElement("div");
      innerDiv.setAttribute('class', 'action');
      innerDiv.innerHTML = getImage(data[i].ImageName);
      div.appendChild(innerDiv);
      mainClosedDiv.appendChild(div);
      tbl.appendChild(mainClosedDiv);
  }
  var newDiv = document.createElement("div");
  newDiv.setAttribute('onClick', 'toggleActions');
  newDiv.setAttribute('class', 'action');
  newDiv.innerHTML = '<i class="fa fa-arrow-left"></i>';
  mainClosedDiv.appendChild(newDiv);
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

const toggleActions = () => {

};

let table = document.querySelector('table');
fetch('/sample.json').then(res => res.json()).then((response) => { 
  tableData = response;
  let data = Object.keys(tableData.GridData[0]);
  generateTable(table, tableData.GridData);
  generateTableHead(table, data); 
  addActionsSection(tableData.Actions);
});
