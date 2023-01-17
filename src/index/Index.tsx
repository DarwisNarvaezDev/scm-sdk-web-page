import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ScmProps from "../interfaces/ScmProps";

export default function Index() {

    const centeredDivProps = {justifyContent: 'center', alignItems: 'center'}
    const [scmObjects, setScmObjects] = useState<ScmProps[] | undefined>([])
    const toast = useToast()

    // Listen and await for the SCM data from Backend
    async function getScmData() {
        // Do a fetch to get SCM info and possibly populate the state
        const data = await fetch('http://127.0.0.1:5000');
        const result = await data.json()
        if( result.message ){
            console.log(result.message);
            toast({
                title: 'Incoming Message',
                description: result.message,
                position: 'top-right',
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })
        }else{
            const { yaml } = result;
            const { components } = yaml;
            const { component } = components[0]
            setScmObjects(component)
        }
        
    }

    useEffect(()=>{
        getScmData()
        setInterval(()=>{
            getScmData()
            toast({
                title: 'Info',
                description: 'Page refreshed',
                position: 'top-right',
                status: 'info',
                duration: 3000,
                isClosable: true,
              })
        }, 10000)
    }, [])

    return (
        <>
            <Flex
                id={'AppContainer'}
                key={'AppContainer'}
                as={'section'}
                width={'100%'}
                height={'100vh'}
                flexDir={'column'}
                gap={10}
                {...centeredDivProps}
            >
                <Heading>Below will be displayed the SCM result</Heading>
                <Flex
                    {...centeredDivProps}
                    border={'5px dashed gray'}
                    width={'50%'}
                    height={'auto'}
                    p={10}
                >
                {
                    scmObjects?.length ? (
                        scmObjects?.map( (element, index) => {
                            return (
                                <>
                                    <Flex
                                        id={`ScmDiv_${index}`}
                                        key={`ScmDiv_${index}`}
                                        {...element}
                                        {...centeredDivProps}
                                    >
                                        { element.content && (
                                            <Text
                                                key={`scmText_${index}`}
                                                id={`scmText_${index}`}
                                                size={'2xl'}
                                            >{element.content}</Text>
                                        )}
                                    </Flex>
                                </>
                            )
                        })
                    ) : (<Text
                        fontWeight={'black'}
                        size={'5xl'}
                    >SCM Result here</Text>)
                }
                </Flex>
            </Flex>
        </>
    )
}