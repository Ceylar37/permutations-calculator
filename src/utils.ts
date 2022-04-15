import {Dispatch, SetStateAction} from "react";
import {message} from "antd";

export const clearArr = (size: number) =>
    (new Array(size).fill(''))

export const createSetPermutation = (setPermutationValuesFunction: Dispatch<SetStateAction<(number | '')[]>>) =>
    (value: number | '', index: number) =>
        setPermutationValuesFunction((permutationValues: (number | '')[]) => permutationValues.map((el, i) =>
            (i === index) ? value : el
        ))

export const checkValidityOfPermutation = (permutation: (number | '')[], size: number, errorText: string) => {

    const dict: { [key: string]: number } = {}

    for (let i = 0; i < permutation.length; i++) {
        if (!permutation[i] || permutation[i] > size || permutation[i] < 0) {
            message.error(errorText)
            return false
        }
        const key1 = permutation[i].toString()
        if (dict[key1]) {
            message.error(errorText)
            return false
        } else {
            dict[key1] = 1
        }
    }

    return permutation as number[]
}

export const calculateCycles = (permutation: number[]) => {
    if (permutation.length === 1 || permutation.length === 2)
        return [permutation]
    const cycles: number[][] = []
    mark1: for (let i = 0; i < permutation.length; i++) {
        for (const cycle of cycles) {
            if (cycle.some(el => el === i + 1)) {
                continue mark1
            }
        }
        let j = permutation[i]
        if (i + 1 === j)
            cycles.push([i + 1])
        else
            cycles.push([i + 1, j])
        while (permutation[j - 1] !== i + 1) {
            cycles[cycles.length - 1].push(permutation[j - 1])
            j = permutation[j - 1]
        }
    }
    return cycles
}

const calculateLCM = (numbers: number[]) => {
    let curNumber = Math.max(...numbers)
    for (; ; curNumber++) {
        if (numbers.every(n => curNumber % n === 0))
            return curNumber
    }
}

export const calculatePermutationOrder = (cycles: number[][]) => {
    const cyclesLengths = cycles.map(cycle => cycle.length)
    return calculateLCM(cyclesLengths)
}