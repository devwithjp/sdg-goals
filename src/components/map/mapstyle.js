

export const statesLayer= {
    id: 'states',
    type: 'fill',
    source:'india',
    background:{
        visibility:'none',
        opacity:0
      },
    paint: {
      'fill-outline-color': 'rgba(0,0,0,0.9)',
      'fill-color': 'rgba(0,0,0,0.1)'
    }
  };
//   export const highlightLayer = {
//     id: 'states-highlighted',
//     type: 'fill',
//     source:'india',
//     paint: {
//       'fill-outline-color': '#484896',
//       'fill-color': '#6e599f',
//       'fill-opacity': 0.75
//     }
//   };