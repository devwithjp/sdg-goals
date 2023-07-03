

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
      'fill-color': {property: 'area',
      stops: [
        [0, '#3288bd'],
        [1, '#66c2a5'],
        [2, '#abdda4'],
        [3, '#e6f598'],
        [4, '#ffffbf'],
        [5, '#fee08b'],
        [6, '#fdae61'],
        [7, '#f46d43'],
        [8, '#d53e4f']
      ]}
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