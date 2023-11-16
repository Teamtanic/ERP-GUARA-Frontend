import { CardModal } from "../../components/CardModal";
import { Checkbox } from "../../components/Checkbox";
import { Text } from "../../components/Text";
import { TextInput } from "../../components/TextInput";

export function OfferAddModal() {
    return (
        <CardModal title="Adicionar Oferta" action="Adicionar" triggerStyle="fixed w-fit bottom-5 right-8 rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] !text-gray-100">
            <div className="flex flex-col w-full max-md:px-12 md:px-24 mb-12 gap-4">
                <TextInput.Root labelFor="offer" labelText="Descrição">
                    <TextInput.Input id="offer" type="text" placeholder="Descreva essa oferta..." />
                </TextInput.Root>
                <div>
                    <Text>Tipo de Oferta</Text>
                    <div className="flex w-full gap-12">
                        <label htmlFor="checkServico" className="flex items-center gap-2 my-2">
                            <Checkbox id="checkServico" />
                            <Text size="sm">
                                Serviço
                            </Text>
                        </label>

                        <label htmlFor="checkProduto" className="flex items-center gap-2 my-2 mr-5">
                            <Checkbox id="checkProduto" />
                            <Text size="sm">
                                Produto
                            </Text>
                        </label>
                    </div>
                </div>
            </div>
        </CardModal>
    );
}