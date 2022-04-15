import React, {useEffect, useState} from 'react';
import {Button, Col, Input, message, Row} from "antd";
import {messages, SizeProp} from "../../constants";
import {
    calculateCycles,
    calculatePermutationOrder,
    checkValidityOfPermutation,
    clearArr,
    createSetPermutation
} from "../../utils";
import {PermutationComponent} from "../PermutationComponent";

const Power: React.FC<SizeProp> = React.memo(({size}) => {

    const [permutationValues, setPermutationValues] = useState<(number | '')[]>(clearArr(size))
    const setPermutation = createSetPermutation(setPermutationValues)
    useEffect(() => {
        setPermutationValues(clearArr(size))
    }, [size])

    const [power, setPower] = useState<number | ''>('')
    const [cycles, setCycles] = useState<number[][] | null>(null)
    const [newCycles, setNewCycles] = useState<number[][] | null>(null)

    const handleCalculateButtonClick = () => {
        const checkedPermutationValues = checkValidityOfPermutation(permutationValues, size, messages.aErr)

        if (!power)
            return message.error('Не введена степень')

        if (checkedPermutationValues) {
            const cycles = calculateCycles(checkedPermutationValues)
            setCycles(cycles)
            const order = calculatePermutationOrder(cycles)
            const curPower = power % order
            setNewCycles(
                cycles
                    .map(cycle => {
                        const newCycle: number[] = [cycle[0]]
                        for (let i = 0; i < cycle.length; i++) {
                            newCycle[i] = cycle[(i + curPower) % cycle.length]
                        }
                        return newCycle
                    })
                    .reduce<number[][]>((acc, cycle) => [...acc, ...calculateCycles(cycle)], [])
            )
        }
    }

    return (
        <Col>
            <Row justify='center'>
                <PermutationComponent
                    name={'a'}
                    permutationValues={permutationValues}
                    size={size}
                    onPermutationValueChange={setPermutation}
                />
            </Row>
            <Row justify='center' align='middle'>
                Степень:<Input
                style={{
                    width: 40
                }}
                value={power}
                onChange={(e) => {
                    if (e.currentTarget.value && !isNaN(+e.currentTarget.value))
                        setPower(+e.currentTarget.value)
                }}
            />
            </Row>
            <Row justify='center' style={{marginTop: 20}}>
                <Button
                    onClick={handleCalculateButtonClick}
                >
                    Рассчитать
                </Button>
            </Row>
            <Row justify='center'>
                {cycles &&
                    <h2>
                        Циклы: {cycles.map(cycle =>
                        <>
                            (
                            {cycle.map((el, i) =>
                                i === cycle.length - 1
                                    ? <>{el}</>
                                    : <>{el}, </>
                            )}
                            )
                        </>
                    )}
                    </h2>
                }
            </Row>
            <Row justify='center'>
                {newCycles &&
                    <h2>
                        Ответ: {newCycles.map(cycle =>
                        <>
                            (
                            {cycle.map((el, i) =>
                                i === cycle.length - 1
                                    ? <>{el}</>
                                    : <>{el}, </>
                            )}
                            )
                        </>
                    )}
                    </h2>
                }
            </Row>
        </Col>
    );
});

export default Power;