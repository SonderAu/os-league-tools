import { useMemo } from 'react';
import CALCULATOR_DATA from '../data/calculatorData.json';

export default function useCalculatorData(
  skill,
  expValues,
  baseMultiplier,
  expMultipliersState,
  inputMultipliersState,
  outputMultipliersState
) {
  const rawData = useMemo(() => CALCULATOR_DATA.calculators[skill.toLowerCase()], [skill]);
  const expRequired = useMemo(() => expValues.target.xp - expValues.start.xp, [expValues]);

  const calculatedData = useMemo(
    () =>
      rawData.actions.map(activity => {
        const totalExp = expMultipliersState.applyMultipliers(activity.exp * baseMultiplier, activity);
        return {
          ...activity,
          exp: totalExp,
          actionsRequired: Math.ceil(expRequired / totalExp),
          inputs: activity.inputs.map(input => ({
            ...input,
            amount: inputMultipliersState.applyMultipliers(input.amount, activity, input),
          })),
          outputs: activity.outputs.map(output => ({
            ...output,
            amount: outputMultipliersState.applyMultipliers(output.amount, activity, output),
          })),
        };
      }),
    [rawData, expRequired, baseMultiplier, expMultipliersState, inputMultipliersState, outputMultipliersState]
  );

  return { data: calculatedData };
}
