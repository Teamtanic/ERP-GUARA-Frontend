import { Card } from "../../../components/Card";
import { Container } from "../../../components/Container";
import { Heading } from "../../../components/Heading";
import { Navbar } from "../../../components/Navbar";
import { Text } from "../../../components/Text";
import { formatPhoneNumber } from "../../../utils";
import * as Tabs from '@radix-ui/react-tabs';

import { TableListProject } from "../../Project/TableListProject";


export function DetailsUser() {
    var user =
    {
        id: "d5d6be6e-d332-41be-b601-8bd2ae4e6935", name: 'Paulo Galvao', prontuary: 'CB3046874', department: "Financeiro",
        telephone: "1334684219", cell_phone: "13997854230", email: "paulo@gmail.com",
        role: "Chefe", course: "Análise e Desenvolvimento de Sistemas",
        project: [
            { id: "75b6a6f8-88fb-4642-bd79-60cd4865691c", description: "Análise e Desenvolvimento de Sistemas" },
            { id: "ad24ccc1-efe2-4b17-8bbe-05a4e730b12a", description: "Turismo" },
            { id: "f5537fec-16f2-452b-a6e4-4e60d36f5686", description: "Letras" },
        ]
    };

    return (
        <Container>
            <Navbar />
            <div className="w-full flex py-6 p-24 max-md:p-6 flex-col">
                <Heading size="lg">Detalhes Usuário</Heading>
                <Card className="w-full !p-0">
                    <div className="flex h-36 max-sm:flex-col max-sm:h-fit">
                        <div className="flex flex-col md:w-4/5 p-4 justify-evenly">
                            <div className="w-full flex items-center justify-between">
                                <Text className="!text-gray-900 font-semibold">{user.name}</Text>
                                <Card className={` w-fit flex items-center justify-center md:hidden`}>
                                    <Text className="" size="xm">{user.prontuary}</Text>
                                </Card>
                            </div>
                            <Text className="!text-gray-500 font-semibold">{user.role}, {user.department}</Text>
                            <Text className="!text-gray-500 font-semibold">Curso: {user.course}</Text>
                            <Text className="!text-gray-500 font-semibold">Prontuário: {user.prontuary}</Text>
                        </div>
                        <div className="bg-gray-300 w-full flex flex-col justify-evenly p-4">
                            <div>
                                <Text className="!text-gray-900 font-semibold">Telefone: </Text>
                                <Text className="!text-gray-900">{formatPhoneNumber(user.telephone)}</Text>
                            </div>
                            <div>
                                <Text className="!text-gray-900 font-semibold">Celular: </Text>
                                <Text className="!text-gray-900">{formatPhoneNumber(user.cell_phone)}</Text>
                            </div>
                            <div>
                                <Text className="!text-gray-900 font-semibold">Email: </Text>
                                <Text className="!text-gray-900">{user.email}</Text>
                            </div>
                        </div>
                    </div>
                </Card>

                <Tabs.Root
                    className="flex flex-col w-full mt-6"
                    defaultValue="tab1"
                >
                    <Tabs.List className="shrink-0 flex border-b" aria-label="Dados da empresa">
                        <Tabs.Trigger
                            className="bg-gray-100 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=inactive]:bg-gray-200 outline-none cursor-default"
                            value="tab1"
                        >
                            Documentos
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            className="bg-gray-100 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=inactive]:bg-gray-200 outline-none cursor-default"
                            value="tab2"
                        >
                            Projetos
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content
                        className="grow p-5 bg-gray-100 rounded-b-md outline-none "
                        value="tab1"
                    >
                        <div className="">
                        </div>
                    </Tabs.Content>
                    <Tabs.Content
                        className="grow p-5 bg-gray-100 rounded-b-md outline-none "
                        value="tab2"
                    >
                        <TableListProject data={user.project} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </Container>
    )
}