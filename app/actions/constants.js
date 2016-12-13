export function set_constants(){
  return (dispatch,getState) => {
    console.log('set_constants')

    //read file via jquery ajax.
    //  yes hacky but it works for this case.
    $.ajax({
      isLocal: true,
      url: 'config/constants.csv',
      dataType: 'text',
      contentType: 'application/CSV',
    }).done( (data) => {
      console.log('done')
      let allRows = data.split(/\r?\n|\r/);
      console.log(allRows)
      let constants_data = []
      for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
        if(singleRow>0){
          var rowCells = allRows[singleRow].split(',');
          if(rowCells[1]){
            console.log({name:rowCells[0],value:rowCells[1]})
            const row = {name:rowCells[0],value:rowCells[1]}
            constants_data.push(row)
          }
        }
      }
      dispatch(constants('SET_CONSTANTS', constants_data));

    });
  }
}

//
// // }
// //
// export function parse_data(data) {
//   console.log('parse_data1')
//   return (dispatch,getState) => {
//       console.log('parse_data2')
//       let allRows = data.split(/\r?\n|\r/);
//       let constants = []
//       for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
//         if(singleRow>0){
//           var rowCells = allRows[singleRow].split(',');
//           if(rowCells[1]){
//             console.log({name:rowCells[0],value:rowCells[1]})
//             const row = {name:rowCells[0],value:rowCells[1]}
//             constants.push(row)
//           }
//         }
//       }
//       console.log(constants)
//       dispatch(constants('SET_CONSTANTS', constants));
//
//   //parse csv file of links
//
//  }
// }

function constants(type, data){
  return {type: type, constants: data.constants_data, receivedAt: Date.now()}
}
