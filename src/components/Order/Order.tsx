import React, {useEffect, useState} from 'react';
import {messages, SizeProp} from "../../constants";
import {Button, Col, Row} from "antd";
import {PermutationComponent} from "../PermutationComponent";
import {
    calculateCycles,
    calculatePermutationOrder,
    checkValidityOfPermutation,
    clearArr,
    createSetPermutation
} from "../../utils";

const Order: React.FC<SizeProp> = React.memo(({size}) => {

    const [permutationValues, setPermutationValues] = useState<(number | '')[]>(clearArr(size))
    const [order, setOrder] = useState<number | null>(null)
    const [cycles, setCycles] = useState<number[][] | null>(null)
    useEffect(() => {
        setPermutationValues(clearArr(size))
        setCycles(null)
        setOrder(null)
    }, [size])
    const setValues = createSetPermutation(setPermutationValues)

    const handleCalculateButtonClick = () => {
        const checkedPermutationValues = checkValidityOfPermutation(permutationValues, size, messages.aErr)
        if (checkedPermutationValues) {
            const cycles = calculateCycles(checkedPermutationValues)
            setCycles(cycles)
            setOrder(calculatePermutationOrder(cycles))
        }
    }

    return (
        <Col>
            <Row justify='center'>
                <PermutationComponent
                    name={'a'}
                    permutationValues={permutationValues}
                    size={size}
                    onPermutationValueChange={setValues}
                />
            </Row>
            <Row justify='center'>
                <Button
                    onClick={handleCalculateButtonClick}
                >
                    Рассчитать
                </Button>
            </Row>
            <Row justify='center'>
                {order &&
                    <h2>
                        Порядок: {order}
                    </h2>
                }
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
        </Col>
    );
});

export default Order;