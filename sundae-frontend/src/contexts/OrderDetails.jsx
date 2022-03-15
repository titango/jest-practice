import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

// format number as currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      'useOrderDetails mustr be used within an OrderDetailsProvider'
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  console.log('optionType: ', optionType);
  console.log('optionCounts: ', optionCounts);
  for (const count of optionCounts[optionType].value()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  });
  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal)
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    // function updateItemCount(itemName, newItemCount, optionType) {
    //   const newOptionCounts = { ...optionCounts };

    //   // update option count for this item with the new value
    //   const optionCountsMap = optionCounts[optionType];
    //   optionCountsMap.set(itemName, parseInt(newItemCount));

    //   setOptionCounts(newOptionCounts);
    // }
    function updateItemCount(itemName, newItemCount, optionType) {
      // get option Map and make a copy
      const { [optionType]: optionMap } = optionCounts;
      const newOptionMap = new Map(optionMap);

      // update the copied Map
      newOptionMap.set(itemName, parseInt(newItemCount));

      // create new object with the old optionCounts plus new map
      const newOptionCounts = { ...optionCounts };
      newOptionCounts[optionType] = newOptionMap;

      // update state
      setOptionCounts(newOptionCounts);
    }
    // getter: object containing options count for scoops and toppings, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
