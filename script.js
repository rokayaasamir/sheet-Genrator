let table = document.getElementsByClassName("sheet-body")[0],
rows = document.getElementsByClassName("rows")[0],
columns = document.getElementsByClassName("columns")[0]
tableExists = false

const generateTable = () => {
    let rowsNumber = parseInt(rows.value), columnsNumber = parseInt(columns.value)
    table.innerHTML = ""
    for(let i=0; i<rowsNumber; i++){
        var tableRow = ""
        for(let j=0; j<columnsNumber; j++){
            tableRow += `<td contenteditable></td>`
        }
        table.innerHTML += tableRow
    }
    //****//
    if(rowsNumber>0 && columnsNumber>0){
        tableExists = true
    }
    else if(rows.value.length===0&&columns.value.length===0){
        swalFun("Make sure the fields are not empty to create your sheet")
    }
    else{
        swalFun("Make sure to enter avalid data to create your sheet")

    }
}

const ExportToExcel = (type, fn, dl) => {
    if(!tableExists){
        return swalFun("Make sure that there is actually a table available for you to be able to export")
    }
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })
    return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
        : XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))
}

//for sweet.js

function swalFun(message){

    Swal.fire({
        icon: 'error',
        iconColor:"#7066e0",
        title: 'Oops...',
        text:`${message}`,
        width:400,

      })
}