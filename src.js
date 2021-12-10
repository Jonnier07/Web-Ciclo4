import fetch from "node-fetch";

const calcularPocentajes = async (valorCO, valorCO2, valorHC, valorO2) => { 
    try {
        let response = await fetch('https://misiontic2022upb.vercel.app/api/emission-measurement/limits');
        let limits = await response.json();
       
        let limiteCO = limits['Parametro CO en rango estandar'];
        let limiteCO2 = limits['Parametro CO2 en rango estandar'];
        let limiteHC = limits['Parametro HC en rango estandar'];
        let limiteO2 = limits['Parametro O2 en rango estandar'];  

        let porcentajeCO = limiteCO ?  + (valorCO * 100 / limiteCO).toFixed(2) : 0;
        let porcentajeCO2 = limiteCO2 ? + (valorCO2 * 100 / limiteCO2).toFixed(2) : 0;
        let porcentajeHC = limiteHC ?  + (valorHC * 100 / limiteHC).toFixed(2) : 0;
        let porcentajeO2 = limiteO2 ?  + (valorO2 * 100 / limiteO2).toFixed(2) : 0;
            
        return {porcentajeCO : porcentajeCO , porcentajeCO2 : porcentajeCO2 , porcentajeHC : porcentajeHC , porcentajeO2: porcentajeO2};
    } catch (error) {
        console.log(error);
    }
}   

const registrarCO = async (value) => {
    try {
        let response = await fetch('https://misiontic2022upb.vercel.app/api/emission-measurement/ranges-parameters');
        let rangosCO = await response.json();
       
        let candidate = rangosCO[0];
        let enRango = 'Parametro CO en rango estandar';
        let fueraDeRango = 'Parametro CO fuera de rango';

        let indiceRangosCO = -1;
        rangosCO.forEach((element, indexElement) => {
            if((value >= element.de && value <= element.hasta)&&(element.etiqueta === 'Monoxido de carbono')){
                indiceRangosCO = indexElement;
            }
        });
        
        //return value >= rangosCO[0].de ? value<=rangosCO[0].hasta? rangosCO[0].etiqueta: rangosCO[1].etiqueta : 'fuera_de_rango';
        return indiceRangosCO === 0 ? enRango : fueraDeRango;
    } catch (error) {
        console.log(error);
    }   
}  

const registrarCO2 = async (value) => {
    try { 
        let response = await fetch('https://misiontic2022upb.vercel.app/api/emission-measurement/ranges-parameters');
        let rangosCO2 = await response.json();
       
        let candidate = rangosCO2[1];
        let enRango = 'Parametro CO2 en rango estandar';
        let fueraDeRango = 'Parametro CO2 fuera de rango';

        let indiceRangosCO2 = -1;
        rangosCO2.forEach((element, indexElement) => {
            if((value >= element.de && value <= element.hasta)&&(element.etiqueta === 'Dioxido de carbono')){
                indiceRangosCO2 = indexElement;
            }
        });
        
        //return value >= rangosCO2[0].de ? value<=rangosCO2[0].hasta? rangosCO2[0].etiqueta: rangosCO2[1].etiqueta : 'fuera_de_rango';
        return indiceRangosCO2 === 1 ? enRango : fueraDeRango;
    }  catch (error) {
        console.log(error);
    }                                             
}

const registrarHC= async (value) => {
    try {
        let response = await fetch('https://misiontic2022upb.vercel.app/api/emission-measurement/ranges-parameters');
        let rangosHC = await response.json();
       
        let candidate = rangosHC[2];
        let enRango = 'Parametro HC en rango estandar';
        let fueraDeRango = 'Parametro HC fuera de rango';

        let indiceRangosHC = -1;
        rangosHC.forEach((element, indexElement) => {
            if((value >= element.de && value <= element.hasta)&&(element.etiqueta === 'Hidrocarburos')){
                indiceRangosHC = indexElement;
            };
        });

        //return value >= rangosHC[0].de ? value<=rangosHC[0].hasta? rangosHC[0].etiqueta: rangosHC[1].etiqueta : 'fuera_de_rango';
        return indiceRangosHC === 2 ? enRango : fueraDeRango;
        } catch (error) {
            console.log(error);
        }
}

const registrarO2 = async (value) => {
    try {  
        let response = await fetch('https://misiontic2022upb.vercel.app/api/emission-measurement/ranges-parameters');
        let rangosO2 = await response.json();
       
        let candidate = rangosO2[3];
        let enRango = 'Parametro O2 en rango estandar';
        let fueraDeRango = 'Parametro O2 fuera de rango';

        let indiceRangosO2 = -1;
        rangosO2.forEach((element, indexElement) => {
            if((value >= element.de && value <= element.hasta)&&(element.etiqueta === 'Oxigeno')){
                indiceRangosO2 = indexElement;
            };
        });

        //return value >= rangosO2[0].de ? value<=rangosO2[0].hasta? rangosO2[0].etiqueta: rangosO2[1].etiqueta : 'fuera_de_rango';
        return indiceRangosO2 === 3 ? enRango : fueraDeRango;
        } catch (error) {
            console.log(error);
        }   
}

const nombreGasMin = async () => {   
    try {
        let response = await fetch('https://misiontic2022upb.vercel.app/api/emission-measurement/ranges-parameters');   
        let rangos = await response.json();
        let gasMenorValor = rangos[0].hasta;
        let gasMenorEtiqueta = rangos[0].etiqueta;
        console.log(gasMenorValor);
        console.log(gasMenorEtiqueta);
        rangos.forEach((element, indexElement) => {
            if(gasMenorValor > element.hasta){
                gasMenorValor = element.hasta;
                gasMenorEtiqueta = element.etiqueta;
            }
        });
        return gasMenorEtiqueta;
    } catch (error) {
        console.log(error);
    } 
} 

module.exports.calcularPocentajes = calcularPocentajes;
module.exports.registrarCO = registrarCO;
module.exports.registrarCO2 = registrarCO2;
module.exports.registrarHC = registrarHC;
module.exports.registrarO2 = registrarO2;
module.exports.nombreGasMin = nombreGasMin;

//Language: javascript
calcularPocentajes(0, 15, 9000, 14).then(dataPorcentajes=>{console.log(dataPorcentajes);console.log(' -->lineaEjecución: 1')});
registrarCO(-1).then(dataRegistroCO=>console.log(dataRegistroCO + ' -->lineaEjecución: 2'));
registrarCO(0).then(dataRegistroCO=>console.log(dataRegistroCO + ' -->lineaEjecución: 3'));
registrarCO2(21).then(dataRegistroCO2=>console.log(dataRegistroCO2 + ' -->lineaEjecución: 4'));
registrarHC(10001).then(dataRegistroHC=>console.log(dataRegistroHC + ' -->lineaEjecución: 5'));
registrarO2(23).then(dataRegistroO2=>console.log(dataRegistroO2 + ' -->lineaEjecución: 6'));
registrarHC(-10000).then(dataRegistroHC=>console.log(dataRegistroHC + ' -->lineaEjecución: 7'));
registrarHC(8000).then(dataRegistroHC=>console.log(dataRegistroHC + ' -->lineaEjecución: 8'));
registrarCO(7).then(dataRegistroCO=>console.log(dataRegistroCO  + ' -->lineaEjecución: 9'));
registrarCO2(18).then(dataRegistroCO2=>console.log(dataRegistroCO2 + ' -->lineaEjecución: 10'));
registrarO2(21).then(dataRegistroO2=>console.log(dataRegistroO2 + ' -->lineaEjecución: 11'));
nombreGasMin().then(dataNombreGasMin=>console.log(dataNombreGasMin + ' -->lineaEjecución: 12'));