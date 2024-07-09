

export const getPrice = (currency, money)=>{

    // console.log(currency);
// return 1
    const formats={
        azn:' AZN',
        usd:' $'
    }

    return money+' '+formats[currency]
}