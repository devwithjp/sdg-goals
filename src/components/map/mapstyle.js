

export const statesLayer= (year,goal) =>{ 
  return {
    id: 'states',
    type: 'fill',
    source:'india',
    background:{
        visibility:'none',
        opacity:0
      },
    paint: {
      'fill-outline-color': 'rgba(0,0,0,0.9)',
      'fill-color':  [ "step",['get', goal , ['get', year, ['get' , 'sdgData', ['properties']]]],"#DD1E47",50,"#FFC40C",65,"#00A084",99,'#00AEEF']
    }
  }};