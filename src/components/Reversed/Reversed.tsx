import React, {useEffect, useState} from 'react';
import {messages, SizeProp} from "../../constants";
import {Button, Col, Row} from "antd";
import {checkValidityOfPermutation, clearArr, createSetPermutation} from "../../utils";
import {PermutationComponent} from "../PermutationComponent";

const Reversed: React.FC<SizeProp> = React.memo(({size}) => {

    const [permutationValues, setPermutationValues] = useState<(number | '')[]>(clearArr(size))
    const [reversedPermutationValues, setReversedPermutationValues] = useState<number[] | null>(null)
    const setPermutation = createSetPermutation(setPermutationValues)
    useEffect(() => {
        setPermutationValues(clearArr(size))
    }, [size])

    const handleCalculateButtonClick = () => {
        const checkedPermutationValues = checkValidityOfPermutation(permutationValues, size, messages.aErr)

        if (checkedPermutationValues) {
            const reversedPermutation: number[] = new Array(size).fill(0)
            for (let i = 0; i < checkedPermutationValues.length; i++) {
                reversedPermutation[checkedPermutationValues[i] - 1] = i + 1
            }
            setReversedPermutationValues(reversedPermutation)
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
            <Row justify='center'>
                <Button onClick={handleCalculateButtonClick}>
                    Рассчитать
                </Button>
            </Row>
            {reversedPermutationValues &&
                <Row justify='center'>
                    <PermutationComponent
                        name={<>a<sup>-1</sup></>}
                        permutationValues={reversedPermutationValues}
                        size={size}
                        readonly={true}
                    />
                </Row>}
        </Col>
    );
});

export default Reversed;