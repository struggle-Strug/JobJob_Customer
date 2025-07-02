import { Municipalities } from './constants/categories/municipalities';


export function assignMunicipalityIds() {
    const result = [];
    let idCounter = 1;
    for (const prefecture in Municipalities) {
      if (Municipalities.hasOwnProperty(prefecture)) {
        const list = Municipalities[prefecture];
        list.forEach((name) => {
          result.push({
            id: `muni${idCounter}`,
            name,
            prefecture,
          });
          idCounter++;
        });
      }
    }
    return result;
  }
  
  // フラットな配列でID付きデータ
  export const municipalitiesWithIds = assignMunicipalityIds(Municipalities);


  export function getMunicipalityById(id) {
    return municipalitiesWithIds.find(item => item.id === id);
  }