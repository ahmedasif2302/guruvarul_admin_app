export const isValidArray = (data) => {
    return Array.isArray(data) && data.length !== 0
};
export const isValidElement = (data) => {
    return data !== null && data !== undefined;
  };
  export const isValidNumber = (data) => {
    return isValidString(data) && !isNaN(data);
  };
  export const isValidString = (data) => {
    return data !== null && data !== undefined && data !== "";
  };
export const priorityColor = (data) => {
    if(data === 'P1'){
        return "red"
    } else if(data === 'P2'){
        return "orange"
    } else if(data === 'P3'){
        return "green"
    } else {
        return "#000"
    }
}
