
export function formatCurrency(priceCents){             // transforma los centavos a dolares
  return (Math.round(priceCents)/100).toFixed(2);

}