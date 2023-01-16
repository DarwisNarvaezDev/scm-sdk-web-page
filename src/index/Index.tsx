import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ScmProps from "../interfaces/ScmProps";

export default function Index() {

    const centeredDivProps = {justifyContent: 'center', alignItems: 'center'}
    const [scmObjects, setScmObjects] = useState<ScmProps[] | undefined>([
        {
            height: '300px',
            width: '300px',
            bg: 'red',
            borderRadius: '5px',
            content: 'Hello world'
        },
    ])

    // Listen and await for the SCM data from Backend
    // const getScmInfo: Promise<ScmProps[]> | Promise<undefined> = async() => {
    //     // Do a fetch to get SCM info and possibly populate the state
    // }

    return (
        <>
            <Flex
                id={'AppContainer'}
                as={'body'}
                width={'100%'}
                height={'100vh'}
                {...centeredDivProps}
            >
                {/* The components render here */}
                {
                    scmObjects?.map( (element, index) => {
                        return (
                            <>
                                <Flex
                                    id={'ScmDiv'}
                                    key={index}
                                    {...element}
                                    {...centeredDivProps}
                                >
                                    { element.content && (
                                        <Text
                                            id={'ScmDivContent'}
                                            size={'2xl'}
                                        >{element.content}</Text>
                                    )}
                                </Flex>
                            </>
                        )
                    })
                }
            </Flex>
        </>
    )
}