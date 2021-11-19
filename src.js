const calcularPorcentajes = (limiteCO, limiteCO2, limiteHC, limiteO2, valorCO, valorCO2, valorHC, valorO2) => { 

    let porcentajeCO = limiteCO ?  + (valorCO * 100 / limiteCO).toFixed(2) : 0;
    let porcentajeCO2 = limiteCO2 ? + (valorCO2 * 100 / limiteCO2).toFixed(2) : 0;
    let porcentajeHC = limiteHC ?  + (valorHC * 100 / limiteHC).toFixed(2) : 0;
    let porcentajeO2 = limiteO2 ?  + (valorO2 * 100 / limiteO2).toFixed(2) : 0;
    
    return {porcentajeCO: porcentajeCO + '%', porcentajeCO2: porcentajeCO2 + '%', porcentajeHC: porcentajeHC + '%', porcentajeO2: porcentajeO2 + '%'};
    //return {porcentajeCO: `${porcentajeCO}%`, porcentajeCO2: `${porcentajeCO2}%`, porcentajeHC: `${porcentajeHC}%`, porcentajeO2: `${porcentajeO2}%`};
}

const registrarCO = (value) => {
    /*let verificacionRangoCO;
    rangosCO.forEach(element => {
        if(value >= element.de && value <= element.hasta){
            verificacionRangoCO = element.etiqueta;
        }
    });*/
    return value >= rangosCO[0].de ? value <= rangosCO[0].hasta ? rangosCO[0].etiqueta : rangosCO[1].etiqueta : 'fuera_de_rango';
}  

const registrarCO2 = (value) => {
    /*let verificacionRangoCO2;
    rangosCO2.forEach(element => {  
        if(value >= element.de && value <= element.hasta){ 
            verificacionRangoCO2 = element.etiqueta;
        }
    });*/
    return value >= rangosCO2[0].de ? value<=rangosCO2[0].hasta? rangosCO2[0].etiqueta: rangosCO2[1].etiqueta : 'fuera_de_rango';                                                         
}

const registrarHC= (value) => {
    /*let verificacionRangoHC;
    rangosHC.forEach(element => {
        if(value >= element.de && value <= element.hasta){
            verificacionRangoHC = element.etiqueta;
        }
    });*/
    return value >= rangosHC[0].de ? value<=rangosHC[0].hasta? rangosHC[0].etiqueta: rangosHC[1].etiqueta : 'fuera_de_rango';
}

const registrarO2 = (value) => { 
    /*let verificacionRangoO2;
    rangosO2.forEach(element => {
        if(value >= element.de && value <= element.hasta){
            verificacionRangoO2 = element.etiqueta;
        }
    });*/
    return value >= rangosO2[0].de ? value<=rangosO2[0].hasta? rangosO2[0].etiqueta: rangosO2[1].etiqueta : 'fuera_de_rango';  
}

global.rangosCO = [
    {etiqueta:'Parametro CO en rango estandar', de: 0, hasta: 10},
    {etiqueta:'Parametro CO fuera de rango', de: 11, hasta: 15},
]

global.rangosCO2 = [
    {etiqueta:'Parametro CO2 en rango estandar', de: 0, hasta: 20},
    {etiqueta:'Parametro CO2 fuera de rango', de: 21, hasta: 30},
]

global.rangosHC = [ 
    {etiqueta:'Parametro HC en rango estandar', de: 0, hasta: 10000},
    {etiqueta:'Parametro HC fuera de rango', de: 10001, hasta: 11000},
]

global.rangosO2 = [ 
    {etiqueta:'Parametro O2 en rango estandar', de: 0, hasta: 22},
    {etiqueta:'Parametro O2 fuera de rango', de: 23, hasta: 30},
]

module.exports.calcularPorcentajes = calcularPorcentajes;
module.exports.registrarCO = registrarCO;
module.exports.registrarCO2 = registrarCO2;
module.exports.registrarHC = registrarHC;
module.exports.registrarO2 = registrarO2;

// Language: javascript
/*console.log(calcularPorcentajes(10, 20, 10000, 22, 0, 15, 9000, 14));
console.log(registrarCO(0));
console.log(registrarCO2(21));
console.log(registrarHC(10001));
console.log(registrarO2(23));
console.log(registrarHC(-10000));*/