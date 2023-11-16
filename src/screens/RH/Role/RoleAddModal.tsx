import { CardModal } from "../../../components/CardModal";
import { TextInput } from "../../../components/TextInput";

export function RoleAddModal() {
    return (
        <CardModal title="Cadastro de Cargo" action="Adicionar" triggerStyle="fixed w-fit bottom-5 right-8 rounded shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] !text-gray-100">
            <div className="flex flex-col w-full max-md:px-12 md:px-24 mb-12 gap-4">
                <TextInput.Root labelFor="name" labelText="Cargo">
                    <TextInput.Input id="name" type="text" placeholder="Digite o cargo..." />
                </TextInput.Root>
            </div>
        </CardModal>
    );
}